import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native'
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, getToken, parse, stringify } from '../../constants'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDocHistory } from '../../services/historyService';
import { submitCallSingle, getTodayCalls, submitOfflineCall } from '../../services/callServices';
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

class CallExecution extends Component {
    static contextType = NetworkContext
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

    onClickProduct = (productTemplateId) => {
        if(this.state.selectedProductId == null || this.state.selectedProductId == 0) {
            // console.log(this.state.selectedProductId, this.state.selectedProducts, this.state.selectedProducts[productTemplateId], 'dimagh out')
            const samples = this.props.products.filter(product => product.ProductTemplateId == productTemplateId)[0]
            this.setState({
                selectedProductId: productTemplateId,
                samples: samples.Products,
            })
        } else {
            this.setState({
                overlayError: 'You can not select another product.'
            })
            setTimeout(() => {
                this.setState({
                    overlayError: ''
                })
            }, 5000)
        }
    }
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
        // if(selectedProducts[productTemplate.ProductTemplateId] == undefined) {
        //     selectedProducts[productTemplate.ProductTemplateId] = {
        //         ProductId: productTemplate.ProductTemplateId,
        //         name: productTemplate.ProductTemplateName,
        //         DetailingSeconds: 0,
        //         isReminder: true,
        //         reminderPosition: reminderPosition,
        //     }
        // }

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

    setSampleCount = (number, type, productTemplateId) => {
        let allSamples = this.state.selectedSamples;
        let sample = allSamples[productTemplateId];
        sample.SampleQty = number;
        allSamples[productTemplateId] = sample;
        this.setState({
            selectedSamples: allSamples,
        })
    }
    onToggle = (section) => {
        this.setState({[section]: !this.state[section]})
    }
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
    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                })
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.callLocation();
            } else {
                alert("Permission Denied");
            }
        } catch (err) {
            alert("err",err);
            console.warn(err)
        }
    }
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Call Details'))
 
    async componentDidMount() {
        this.context.hideRefresh();
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

    onChangeCallRemarks = (remarks) => {
        let dailyCall = this.state.form_data
        dailyCall.jsonDailyCall.Remarks = remarks;
        this.setState({
            form_data: dailyCall,
        })
        console.log(this.state, 'Call Remarks changed')
    }

    onChangeAdditionalNotes = (text) => {
        let dailyCall = this.state.form_data
        dailyCall.jsonDailyCall.FeedBack = text;
        this.setState({
            form_data: dailyCall,
        })
        console.log(this.state, 'additional notes changed')
    }

    onCallReasonChange = (reason) => {
        let dailyCall = this.state.form_data;
        dailyCall.jsonDailyCall.CallReason = reason
        this.setState({
            form_data: dailyCall,
        })
        console.log(this.state, 'call reason changed')
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
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
        this.context.showRefresh();
     }

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

        if(this.context.state.isConnected) {
            this.props.submitCallSingle(dailyCall).then(response => {
                if(response == 1) this.props.navigation.goBack();
            }).catch(console.warn)
        } else {
            this.submitOffline(dailyCall).then(response => {
                console.log(response)
            })
        }

    }

    submitOffline = (params) => {
        this.props.submitOfflineCall(params).then(response => {
            this.props.navigation.goBack()
        })
    }

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

    showGifts = () => {
        this.setState({
            giftsOverlay: true
        })
    }

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

    render() {
        const {
            isKeyInfoCollapsed,
            isAdditionalInfoCollapsed,
            isDocHistoryCollapsed,
            existingCall,
        } = this.state;
        return (        
            <ImageBackgroundWrapper>
                <CallExecutionButton disabled={this.props.submitLoader} onPress={this.submitCall}/>
                {this.props.submitLoader == true ? <ScreenLoader /> : null}
                <View style={styles.InputContainer}>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{justifyContent: 'center', display: 'flex' }}>
                        <CallPlanHeader />
                        <View style={{ flex: 1}}>
                            <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <ConnectivityStatus />
                                <LocationStatus isFetching={this.state.fetchingLocation} />
                            </View>
                            <Collapse
                                isCollapsed={isKeyInfoCollapsed}
                                toggler={() => this.onToggle('isKeyInfoCollapsed')}
                                title="Key Call Information"
                                Body={<Tab
                                        updateDetailingSeconds={this.updateDetailingSeconds}
                                        existingCall={true}
                                        onCallReasonChange={this.onCallReasonChange}
                                        navigate={this.props.navigation}
                                    />}  
                                HeaderIcon={<FontAwesomeIcon name="info-circle" size={40} color={brandColors.green} />} />
                            <Collapse
                                isCollapsed={isAdditionalInfoCollapsed}
                                toggler={() => this.onToggle('isAdditionalInfoCollapsed')}
                                title="Additional Information"
                                HeaderIcon={<FontAwesomeIcon name="plus-square" size={40} color={brandColors.green} />}
                                Body={
                                    <AdditionalInfo
                                        existingCall={true}
                                        showGifts={this.showGifts}
                                        onChangeAdditionalNotes={this.onChangeAdditionalNotes}
                                        onChangeCallRemarks={this.onChangeCallRemarks}
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
                                        isCollapsed={isDocHistoryCollapsed}
                                        toggler={() => this.onToggle('isDocHistoryCollapsed')}
                                        title="Doctor Visit History"
                                        Body={ <DoctorHistory /> }
                                        HeaderIcon={<FontAwesomeIcon name="history" size={40} color="#fff" />}/>
                                        : null
                                }
                        </View>
                    </KeyboardAwareScrollView>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayCalls: getTodayCalls,
    submitCallSingle: submitCallSingle,
    getDocHistory: getDocHistory,
    submitOfflineCall: submitOfflineCall,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CallExecution)

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    }
}