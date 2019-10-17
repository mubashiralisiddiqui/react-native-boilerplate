/**
 * @file Container component that manages the online execution of daily call.
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
import React, { Component } from 'react';
import { View, PermissionsAndroid, ScrollView, Alert } from 'react-native'
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, getToken, parse, stringify, getDistance, RFValue } from '../../constants'
import { FontAwesomeIcon } from '../../components/Icons';
import { 
    Collapse,
    AdditionalInfo,
    DoctorHistory,
    ImageBackgroundWrapper,
    ConnectivityStatus,
    LocationStatus,
    ScreenLoader,
    CallExecutionButton,
} from '../../components';
import { getDocHistory } from '../../services/historyService';
import { submitCallSingle, getTodayCalls, submitOfflineCall, getTodayUnplannedCalls } from '../../services/callServices';
import { Tab } from '..';
import { callExecution } from '../../defaults';
import { connect } from 'react-redux';
import { getProducts } from '../../reducers/productsReducer';
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { getGifts } from '../../reducers/giftsReducer';
import { getUser } from '../../reducers/authReducer';
import { getSubmitData, getSubmitLoader } from '../../reducers/callsReducers';
import { getHistory } from '../../actions/history';
import { NetworkContext } from '../../components/NetworkProvider'
import GiftsModal from '../../components/GiftsModal';
import ProductsSamplesModal from '../../components/ProductsSamplesModal';
import { getProductsWithSamples } from '../../services/productService';

/**
 * @class CallExecution
 * @classdesc This is a container class that handles that manages the centeralised state for
 *            call execution screen
 * @extends {Component}
 * 
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
class CallExecution extends Component {
    /**
     * @static
     * @memberof CallExecution
     */
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Call Details'))
    state = {
        isKeyInfoCollapsed: true,
        isAdditionalInfoCollapsed: false,
        isDocHistoryCollapsed: false,
        existingCall: false,
        doctor_history: [],
        samples: [],
        overlay: false,
        giftsOverlay: false,
        overlayError: '',
        lat: '',
        long: '',
        fetchingLocation: true,
        selectedProductId: 0, // This will be only set while opening the overlay, and unset while closing the overlay
        reminderPosition: 0, // This will be only set while opening the overlay, and unset while closing the overlay
        // This key will me merged with JsonCallDetails key of API call
        selectedProducts: [
            // This will be the structure of each object in this array
            // {
            //     ProductId: 0, // This is ProductTemplateId in database and API calls
            //     name: '',
            //     DetailingSeconds: 0, 
            // },
        ],
        // This key will be merged with JsonSamplesDetails key of API call
        selectedSamples: [
            // This will be the structure of each object in this array
            // {
            //     0: 0,
            //     name: '',
            //     ProductId: 0,  // This is ProductId in database and API calls and represent Samples
            //     IsReminder: false,
            //     ProductTemplateId: 0
            // },
        ],
        eDetailing: [
            // this will be added in the final call param
            // {
            //     DetailingFileId: 1,
            //     Duration: 0 // in seconds
            // }
        ],
        form_data: parse(stringify(callExecution)),
    }

    /**
     * @name onClickProduct
     * @function
     * @memberof CallExecution
     * @description Manages the state changes when user click to select a product
     * @param { number } productTemplateId - Selected product's ID
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    onClickProduct = (productTemplateId) => {
        if(this.state.selectedProductId == null || this.state.selectedProductId == 0) {
            const samples = this.props.products.filter(product => product.ProductTemplateId == productTemplateId)[0]
            this.setState({
                selectedProductId: productTemplateId,
                samples: samples.Products,
            })
            return;
        }
        this.setState({
            overlayError: 'You can not select another product.'
        }, () => setTimeout(() => {
            this.setState({
                overlayError: ''
            })
        }, 5000))
    }

    /**
     * @name onClickSample
     * @function
     * @description Manages the state changes when user click to select a sample, remember Product => Sample
     * @param {number} productId - ID of the clicked sample
     * @param {Boolean} IsReminder - Distinguish in between a reminder or regular product.
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     * @todo Refactor this long shit
     */
    onClickSample = (productId, IsReminder) => {
        var selectedProduct = null;
        var productTemplate = null;
        this.props.products.map(product => {
            product.Products.map(sample => {
                if(sample.ProductId === productId) {
                    selectedProduct = sample;
                    productTemplate = product;
                }
            })
        })
        const { reminderPosition } = this.state;
        let selectedProducts = this.state.selectedProducts
        let selectedSamples = this.state.selectedSamples;
        let alreadySelectedProductAtThisPosition = selectedProducts
        .filter(product => (product.reminderPosition && product.reminderPosition == reminderPosition))
        if(alreadySelectedProductAtThisPosition.length > 0) {
            delete selectedProducts[alreadySelectedProductAtThisPosition[0].ProductId];
            delete selectedSamples[alreadySelectedProductAtThisPosition[0].ProductId];
        }
        if(selectedProducts[productTemplate.ProductTemplateId] == undefined) {
            selectedProducts[productTemplate.ProductTemplateId] = {
                ProductId: productTemplate.ProductTemplateId,
                name: productTemplate.ProductTemplateName,
                DetailingSeconds: 0,
                isReminder: false,
                reminderPosition: reminderPosition,
            }
        }

        selectedSamples[productTemplate.ProductTemplateId] = {
            IsReminder: (selectedProducts[productTemplate.ProductTemplateId].IsReminder || false),
            ProductId: productId,
            name: selectedProduct.ProductName,
            SampleQty: 0,
            ProductTemplateId: productTemplate.ProductTemplateId
        }
        this.setState({
            selectedProducts: selectedProducts,
            selectedSamples: selectedSamples,
        })
    }

    /**
     * @name handleOverlayClose
     * @function
     * @description Manages the state when the user closes the Product and Sample selection Modal
     * @memberof CallExecution
     * @param { Boolean } unselect - Whther the sample needs to get unselected or not
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    handleOverlayClose = (unselect = false) => {
        if(unselect) {
            let selectedSamples = this.state.selectedSamples;
            const {selectedProductId, reminderPosition} = this.state
            if(selectedProductId != 0) {
                delete selectedSamples[selectedProductId];
            }
            this.setState({
                selectedSamples,
                overlay: false,
                selectedProductId: 0,
            })
            return;
        }
        this.setState({
            overlay: false,
            selectedProductId: 0,
        }
        // , () => console.log(this.state.selectedProducts, 'asd', this.state.selectedSamples)
        )
    }

    /**
     * @name setSampleCount
     * @function
     * @description Manages the state when user tries to add sample count
     * @this Component
     * @memberof CallExecution
     */
    setSampleCount = (number, type, productTemplateId) => {
        let allSamples = this.state.selectedSamples;
        let sample = allSamples[productTemplateId];
        sample.SampleQty = number;
        allSamples[productTemplateId] = sample;
        this.setState({
            selectedSamples: allSamples,
        })
    }

    /**
     * @name onToggleCollapsedElement
     * @function
     * @description Manages the state when user tries to select section
     * @this Component
     * @param {string} section - section name that needs to be toggled
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    onToggleCollapsedElement = (section) => {
        this.setState({[section]: !this.state[section]})
    }
    
    /**
     * @name showProductsOverlay
     * @function
     * @description Manages the state that show/hide the product and sample selection overlays
     * @this Component
     * @param {number} selectedProduct - ID of the selected product (in case of Daily Call Product)
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    showProductsOverlay = (selectedProduct, reminderPosition = 0) => {
        this.setState({
            overlay: true,
            reminderPosition: reminderPosition,
            selectedProductId: selectedProduct,
            samples: selectedProduct !== null
                ? this.props.products.filter(product => product.ProductTemplateId == selectedProduct)[0].Products
                : [] 
        })
    }
    
    /**
     * @name requestLocationPermission
     * @async
     * @function
     * @description Gather the Latitude and Longitude of the current position of user and sets the value to state accordingly
     * @this CallExecution
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
            )

            granted === PermissionsAndroid.RESULTS.GRANTED
            ? this.callLocation()
            : alert('You must allow this app to access your location. Would you like to')

        } catch (err) {
            alert("err",err);
            console.warn(err)
        }
    }
 
    /**
     * @inheritdoc
     */
    async componentDidMount() {
        let dailyCall = parse(stringify(callExecution));
        const callData = this.props.navigation.getParam('call_info')
        let selectedProducts = [];
        let eDetailings = [];
        callData.Products.map(product => {
            product.Files.map(file => {
                eDetailings[file.DetailingFileId] = {
                    DetailingFileId: file.DetailingFileId,
                    Duration: 0,
                }
                return file;
            })
            selectedProducts[product.ProductId] = {
                ProductId: product.ProductId,
                name: product.ProductName,
                DetailingSeconds: 0,
                IsReminder: false,
            }
            return product;
        })
        dailyCall.jsonDailyCall.CallStartTime = moment(callData.VisitStart).format('YYYY-MM-DD hh:mm:ss')
        dailyCall.jsonDailyCall.CallEndTime = moment(callData.VisitEnd).format('YYYY-MM-DD hh:mm:ss')
        dailyCall.jsonDailyCall.DoctorCode = callData.Doctor.DoctorCode
        dailyCall.jsonDailyCall.PlanDetailId = callData.PlanDetailId
        dailyCall.jsonDailyCall.DeviceDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
        dailyCall.jsonDailyCall.DoctorLat = callData.Doctor.Latitude;
        dailyCall.jsonDailyCall.DoctorLong = callData.Doctor.Longitude;
        // dailyCall.jsonDailyCall.EmployeeId = moment().format('YYYY-MM-DD hh:mm:ss')
        dailyCall.EmployeeId = this.props.user.EmployeeId
        dailyCall.DailyCallId = callData.PlanDetailId

        this.props.getDocHistory({
            Token: getToken,
            DoctorCode: callData.Doctor.DoctorCode,
            EmployeeId: this.props.user.EmployeeId,
        });
        this.setState({
            form_data: dailyCall,
            selectedProducts: selectedProducts,
            eDetailing: eDetailings,
        }
        // , () => {console.log('checking all the values set', this.state, this.context)}
        )
        this.requestLocationPermission()
        
    }

    /**
     * @name onChangeAdditionalInfoAttributes
     * @function
     * @description Manages the state changes of three different fields, Call Reason, Call Remarks and Additional Notes
     * @this Component
     * @param { string } field - field key for state change
     * @param { string } value - value that needs to be set for the provided key (as field)
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    onChangeAdditionalInfoAttributes = (field, value) => {
        let dailyCall = this.state.form_data
        dailyCall.jsonDailyCall[field] = value
        this.setState({
            form_data: dailyCall
        })
    }

    callLocation(){
        navigator.geolocation.getCurrentPosition(
        //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                let dailyCall = this.state.form_data
                dailyCall.jsonDailyCall.Lattitude = currentLatitude;
                dailyCall.jsonDailyCall.Longitude = currentLongitude;
                this.setState({ form_data: dailyCall, fetchingLocation: false });
                },
                (error) => console.log(error, this.state.form_data.jsonDailyCall.Lattitude, this.state.form_data.jsonDailyCall.Longitude),
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            let dailyCall = this.state.form_data
            dailyCall.jsonDailyCall.Lattitude = currentLatitude;
            dailyCall.jsonDailyCall.Longitude = currentLongitude;
            this.setState({ form_data: dailyCall, fetchingLocation: false });
        });
    }


    /**
     * @inheritdoc
     */
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
     }

    /**
     * @name submitCall
     * @async
     * @function
     * @description Handler that will be called when user clicks on the call execution button
     *              It compose the request payload necessary for the API call
     * @this CallExecution
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    submitCall = async () => {
        await this.requestLocationPermission()
        let dailyCall = this.state.form_data;
        dailyCall.Epoch = new Date().getTime();
        dailyCall.jsonSampleDetail = this.state.selectedSamples.filter(sample => sample !== undefined);
        dailyCall.jsonDailyCallDetail = this.state.selectedProducts.filter(product => product !== undefined)
        dailyCall.jsonDailyCallEDetailing = this.state.eDetailing.filter(file => file !== undefined)
        if(dailyCall.jsonDailyCall.Lattitude == '0.0' || dailyCall.jsonDailyCall.Longitude == '0.0'){
            alert('Unable to capture your location, please try to move, refresh the application or open your location service if it is not.');
            return;
        }
        if(dailyCall.jsonDailyCall.DoctorLat != 0 && dailyCall.jsonDailyCall.DoctorLong != 0) {
            const distance = getDistance(
                dailyCall.jsonDailyCall.DoctorLat,
                dailyCall.jsonDailyCall.DoctorLong,
                dailyCall.jsonDailyCall.Lattitude,
                dailyCall.jsonDailyCall.Longitude,
            )
            dailyCall.jsonDailyCall.Distance = distance;
            dailyCall.jsonDailyCall.IsInRange = Number(distance) < 200
        }
        // dailyCall.jsonDailyCall.Distance = getDistance(this.state.latitude, this.state.longitude);

        if(this.context.state.isConnected) {
            const response = await this.props.submitCallSingle(dailyCall)
            if(response == 1) {
                this.props.getUnplannedCalls({
                    EmployeeId: this.props.user.EmployeeId,
                    Token: getToken,
                }, true)
                this.props.getAllProducts({
                    EmployeeId: this.props.user.EmployeeId,
                    Token: getToken,
                }, true)
                this.props.navigation.goBack();
            }
            return;
        }
        this.submitOffline(dailyCall)
    }

    /**
     * @name submitOffline
     * @async
     * @function
     * @description Handler that will be called if the user does not have the internet connection
     * @this Component
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    submitOffline = async (params) => {
        const response = await this.props.submitOfflineCall(params)
        this.props.navigation.goBack()        
    }

    /**
     * @name onClickGift
     * @function
     * @description Manages the state changes that appears when the user select the gift item
     * @this Component
     * @param { number } giftId - ID of the clicked gift item
     * @param { number } number - quanity number of the clicked gift item
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    onClickGift = (giftId, number = 0) => {
        let dailyCall = this.state.form_data
        const selected = dailyCall.jsonGiftDetail
        selected[0] = {
            GiftId: giftId, 
            GiftQty: number
        }
        dailyCall.jsonGiftDetail = selected
        this.setState({
            form_data: dailyCall
        })
    }
    
    /**
     * @name showGifts
     * @function
     * @description Handler to make gift selection modal appear on the screen
     * @this Component
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    showGifts = () => {
        this.setState({
            giftsOverlay: true
        })
    }

    /**
     * @name hideGifts
     * @function
     * @description It will be called when the user closes the gift selection modal
     * @param { Boolean } unselect - Decide whether to unselect the selected gift item while closing
     * @this Component
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    hideGifts = (unselect = false) => {
        if(unselect) {
            let dailyCall = this.state.form_data;
            let giftDetail = dailyCall.jsonGiftDetail;
            giftDetail[0] = {
                GiftId: 0,
                GiftQty: 0
            }
            dailyCall.jsonGiftDetail = giftDetail
            this.setState({
                form_data: dailyCall
            })
        }
        this.setState({
            giftsOverlay: false
        })
    }

    /**
     * @name updateDetailingSeconds
     * @function
     * @description It will update the time duration E-detailing has been displayed
     * @param { Number } fileId - File ID of the selected file
     * @param { Number } seconds - Duration in seconds
     * @this Component
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    updateDetailingSeconds = (fileId, seconds) => {
        const { eDetailing } = this.state
        if(eDetailing[fileId] == undefined) {
            eDetailing[fileId] = {
                DetailingFileId: fileId,
                Duration: seconds
            }
        } else {
            eDetailing[fileId].Duration = eDetailing[fileId].Duration == 0
            ? seconds
            : eDetailing[fileId].Duration + seconds;
        }
        this.setState({
            eDetailing
        }
        // , () => console.log('detailing seconds updated', this.state.eDetailing[fileId])
        );
    }

    confirmSubmit = () => {
        Alert.alert(
            'Call Execution',
            'Are you sure you wan to execute this call?',
            [
            {
                text: 'No',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => this.submitCall()
            },
            ],
        );
    }

    /**
     * @inheritdoc
     */
    render() {
        const {
            isKeyInfoCollapsed,
            isAdditionalInfoCollapsed,
            isDocHistoryCollapsed,
            existingCall,
        } = this.state;
        return (        
            <ImageBackgroundWrapper>
                <CallExecutionButton disabled={this.props.submitLoader} onPress={this.confirmSubmit}/>
                {this.props.submitLoader == true ? <ScreenLoader /> : null}
                <View style={styles.InputContainer}>
                    <ScrollView
                        contentContainerStyle={{justifyContent: 'center', display: 'flex' }}>
                        <CallPlanHeader />
                        <View style={{ flex: 1}}>
                            <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <ConnectivityStatus />
                                <LocationStatus isFetching={this.state.fetchingLocation} />
                            </View>
                            <Collapse
                                section="isKeyInfoCollapsed"
                                isCollapsed={isKeyInfoCollapsed}
                                toggler={this.onToggleCollapsedElement}
                                title="Key Call Information"
                                Body={<Tab
                                        updateDetailingSeconds={this.updateDetailingSeconds}
                                        existingCall={true}
                                        onCallReasonChange={this.onChangeAdditionalInfoAttributes}
                                        navigate={this.props.navigation}
                                    />}  
                                HeaderIcon={<FontAwesomeIcon name="info-circle" size={RFValue(40)} color={brandColors.lightGreen} />} />
                            <Collapse
                                isCollapsed={isAdditionalInfoCollapsed}
                                section="isAdditionalInfoCollapsed"
                                toggler={this.onToggleCollapsedElement}
                                title="Additional Information"
                                HeaderIcon={<FontAwesomeIcon name="plus-square" size={ RFValue(40) } color={brandColors.lightGreen} />}
                                Body={
                                    <AdditionalInfo
                                        existingCall={true}
                                        showGifts={this.showGifts}
                                        onChangeAdditionalNotes={this.onChangeAdditionalInfoAttributes}
                                        onChangeCallRemarks={this.onChangeAdditionalInfoAttributes}
                                        selectedProducts={this.state.selectedProducts}
                                        selectedSamples={this.state.selectedSamples}
                                        showProducts={this.showProductsOverlay}
                                        selectedProduct={this.state.selectedProduct }
                                        selectedSample={this.state.selectedProduct}
                                        navigate={this.props.navigation}
                                        selectedGift={this.state.form_data.jsonGiftDetail}
                                        allGifts={this.props.gifts}
                                    />
                                }
                            />
                                {
                                    existingCall && !!this.props.history.history ?
                                    <Collapse
                                        section="isDocHistoryCollapsed"
                                        isCollapsed={isDocHistoryCollapsed}
                                        toggler={this.onToggleCollapsedElement}
                                        title="Doctor Visit History"
                                        Body={ <DoctorHistory /> }
                                        HeaderIcon={<FontAwesomeIcon name="history" size={40} color={brandColors.lightGreen} />}/>
                                        : null
                                }
                        </View>
                    </ScrollView>
                    <ProductsSamplesModal
                        samples={this.state.samples}
                        productSelectionError={this.state.overlayError}
                        selectedProducts={this.state.selectedProducts}
                        selectedProductId={this.state.selectedProductId}
                        reminderPosition={this.state.reminderPosition}
                        selectedSamples={this.state.selectedSamples}
                        isVisible={this.state.overlay}
                        onPressProductHandler={this.onClickProduct}
                        onPressSampleHanlder={this.onClickSample}
                        setSamplesCountHandler={this.setSampleCount}
                        onCloseHandler={this.handleOverlayClose}
                    />
                    <GiftsModal
                        isVisible={this.state.giftsOverlay}
                        gifts={this.props.gifts}
                        onCloseHandler={this.hideGifts}
                        selectedGift={this.state.form_data.jsonGiftDetail}
                        onPressGiftHandler={this.onClickGift}
                    />
                </View >
            </ImageBackgroundWrapper>
        )
    }
}

/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof CallExecution
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        products: getProducts(state),
        gifts: getGifts(state),
        user: getUser(state),
        submit_data: getSubmitData(state),
        history: getHistory(state),
        submitLoader: getSubmitLoader(state)
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof CallExecution
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayCalls: getTodayCalls,
    submitCallSingle: submitCallSingle,
    getDocHistory: getDocHistory,
    submitOfflineCall: submitOfflineCall,
    getUnplannedCalls: getTodayUnplannedCalls,
    getAllProducts: getProductsWithSamples,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(CallExecution)

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    }
}