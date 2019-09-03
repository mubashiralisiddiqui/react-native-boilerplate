/**
 * @file Container component that manages the online execution of daily call.
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native'
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, getToken, parse, stringify, getDistance, RFValue, ONLINE_CALLEXECUTION_SUCCESS, OFFLINE_CALL_EXECUTION_SUCCESS } from '../../constants'
import {FontAwesomeIcon} from '../../components/Icons';
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
import { getProducts, getSamples } from '../../reducers/productsReducer';
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { getGifts } from '../../reducers/giftsReducer';
import { getUser } from '../../reducers/authReducer';
import { getSubmitData, getSubmitLoader } from '../../reducers/callsReducers';
import { getHistory } from '../../actions/history';
import { NetworkContext } from '../../components/NetworkProvider'
import GiftsModal from '../../components/GiftsModal';
import { ProductsModal, SamplesModal } from '../../components/ProductsSamplesModal';
import { getProductsWithSamples } from '../../services/productService';
import Permission from '../../classes/Permission'
import DropDownHolder from '../../classes/Dropdown';
import { alertData } from '../../constants/messages';
import Location from '../../classes/Location';
import { isFetching, getLat, getLong } from '../../reducers/locationReducer';

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
        position: 0,
        samplesOverlay: false,
        isReminder: false,
        selectedFiles: [],
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
        let { selectedProducts, position, isReminder, selectedSamples, selectedFiles } = this.state
        let oldSelected = _.findIndex(selectedProducts, {position, IsReminder: isReminder})
        if(oldSelected > 0) {
            delete selectedProducts[oldSelected]
            delete selectedSamples[oldSelected]
            selectedFiles = _.dropWhile(selectedFiles, ['ProductTemplateId', oldSelected])
        }
        console.log(selectedFiles, 'deleted')
        const product = _.find(this.props.products, ['ProductTemplateId', productTemplateId])
        selectedProducts[productTemplateId] = {
            ProductId: product.ProductTemplateId,
            name: product.ProductTemplateName,
            DetailingSeconds: 0,
            IsReminder: this.state.isReminder,
            position
        }
        selectedFiles = _.concat(selectedFiles, product.Files)
        console.log(selectedFiles, 'set')
        // let filesNotIncluded = _.differenceWith(selectedFiles, product.Files, _.isEqual)
        // if(! _.isEmpty(filesNotIncluded)) selectedFiles = [ ...selectedFiles, ...filesNotIncluded ];
        this.setState({
            selectedProducts,
            selectedProductId: productTemplateId,
            overlay: false,
            selectedFiles,
        })
    }

    /**
     * @name onClickSample
     * @function
     * @description Manages the state changes when user click to select a sample, remember Product => Sample
     * @param {number} productId - ID of the clicked sample
     * @param {Boolean} IsReminder - Distinguish in between a reminder or regular product.
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    onClickSample = (productId) => {
        const selectedProduct = _.find(this.props.samples, ['ProductId', productId]);
        const productTemplate = _.find(this.props.products, ['ProductTemplateId', selectedProduct.ProductTemplateId]);

        let { selectedSamples } = this.state;

        selectedSamples[productTemplate.ProductTemplateId] = {
            IsReminder: this.state.isReminder,
            ProductId: productId,
            name: selectedProduct.ProductName,
            SampleQty: 0,
            ProductTemplateId: productTemplate.ProductTemplateId
        }
        this.setState({
            selectedSamples
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
    showProductsOverlay = (selectedProduct, position, type = 'planned') => {
        this.setState({
            overlay: true,
            position: position,
            selectedProductId: selectedProduct,
            isReminder: type != 'planned'
        }, () => console.log(this.state))
    }

    hideProductsOverlay = (unselect = false) => {
        if(unselect) {
            let { selectedProducts, selectedSamples, selectedProductId } = this.state
            delete selectedProducts[selectedProductId];
            delete selectedSamples[selectedProductId];
            return this.setState({
                selectedProducts,
                selectedSamples,
                overlay: false,
                position: 0,
                selectedProductId: 0,
                isReminder: false
            })
        }
        this.setState({
            overlay: false,
            position: 0,
            selectedProductId: 0,
            isReminder: false
        })
    }

    showSamplesOverlay = (selectedProduct, position) => {
        this.setState({
            samplesOverlay: true,
            position,
            selectedProductId: selectedProduct
        })
    }

    handleSampleOverlayClose = (unselect = false) => {
        if(unselect) {
            let { selectedSamples, selectedProductId } = this.state
            delete selectedSamples[selectedProductId];
            this.setState({
                selectedSamples,
                samplesOverlay: false,
                position: 0,
                selectedProductId: 0,
            });
        }
        this.setState({
            samplesOverlay: false,
            position: 0,
            selectedProductId: 0,
        })
    }
 
    /**
     * @inheritdoc
     */
    async componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
            this.context.hideRefresh();
            let dailyCall = parse(stringify(callExecution));
            const callData = this.props.navigation.getParam('call_info')
            let selectedProducts = [];
            let eDetailings = [];
            let files = [];
            callData.Products.map((product, index) => {
                product.Files.map(file => {
                    eDetailings[file.DetailingFileId] = {
                        DetailingFileId: file.DetailingFileId,
                        Duration: 0,
                    }
                    return file;
                })
                files.push(product.Files)
                selectedProducts[product.ProductId] = {
                    ProductId: product.ProductId,
                    name: product.ProductName,
                    DetailingSeconds: 0,
                    IsReminder: false,
                    position: index + 1
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
                selectedFiles: _.concat(...files)
            }
            // , () => {console.log('checking all the values set', this.state, this.context)}
            )
            this.props.location()
        // })
        
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

    /**
     * @inheritdoc
     */
    componentWillUnmount = () => {
        Location.stopLocating();
        this.context.showRefresh();
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
        let dailyCall = this.state.form_data;
        dailyCall.Epoch = new Date().getTime();
        dailyCall.jsonSampleDetail = this.state.selectedSamples.filter(sample => sample !== undefined);
        dailyCall.jsonDailyCallDetail = this.state.selectedProducts.filter(product => product !== undefined)
        dailyCall.jsonDailyCallEDetailing = this.state.eDetailing.filter(file => file !== undefined)
        if(this.props.isFetching){
            alert('Unable to capture your location, please try to move, refresh the application or open your location service if it is not.');
            return;
        }
        dailyCall.jsonDailyCall.Lattitude = this.props.lat;
        dailyCall.jsonDailyCall.Longitude = this.props.long;
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

        if(this.context.state.isInternetReachable) {
            const response = await this.props.submitCallSingle(dailyCall)
            if(response == 1) {
                DropDownHolder.show(alertData.call.onlineSuccess)
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
        DropDownHolder.show(alertData.call.offlineSuccess)
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
            dailyCall.jsonGiftDetail = []
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
                                <LocationStatus isFetching={this.props.isFetching} />
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
                                        files={this.state.selectedFiles}
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
                                        showSamples={this.showSamplesOverlay}
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
                    {
                        this.state.overlay
                        ? <ProductsModal
                            selectedProducts={this.state.selectedProducts}
                            selectedProductId={this.state.selectedProductId}
                            reminderPosition={this.state.reminderPosition}
                            isVisible={this.state.overlay}
                            onPressProductHandler={this.onClickProduct}
                            onCloseHandler={this.hideProductsOverlay}
                            existingCall={false}
                        />
                        : null
                    }
                    {
                        this.state.samplesOverlay
                        ? <SamplesModal
                            selectedProductId={this.state.selectedProductId}
                            reminderPosition={this.state.reminderPosition}
                            selectedSamples={this.state.selectedSamples}
                            isVisible={this.state.samplesOverlay}
                            onPressSampleHanlder={this.onClickSample}
                            setSamplesCountHandler={this.setSampleCount}
                            onCloseHandler={this.handleSampleOverlayClose}
                        />
                        : null
                    }
                    {
                        this.state.giftsOverlay
                        ? <GiftsModal
                            isVisible={this.state.giftsOverlay}
                            gifts={this.props.gifts}
                            onCloseHandler={this.hideGifts}
                            selectedGift={this.state.form_data.jsonGiftDetail}
                            onPressGiftHandler={this.onClickGift}
                        />
                        : null
                    }
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
        samples: getSamples(state),
        gifts: getGifts(state),
        user: getUser(state),
        submit_data: getSubmitData(state),
        history: getHistory(state),
        submitLoader: getSubmitLoader(state),
        isFetching: isFetching(state),
        lat: getLat(state),
        long: getLong(state),
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
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
      {
        getTodayCalls: getTodayCalls,
        submitCallSingle: submitCallSingle,
        getDocHistory: getDocHistory,
        submitOfflineCall: submitOfflineCall,
        getUnplannedCalls: getTodayUnplannedCalls,
        getAllProducts: getProductsWithSamples,
      },
      dispatch,
    ),
    location: () => Location.requestLocation(dispatch), // this is not to be wrapped into dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(CallExecution)

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    }
}