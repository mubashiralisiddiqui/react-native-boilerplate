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
    LocationStatus,
    ScreenLoader,
    CallExecutionButton,
    DoctorInfoPanel,
    InternetConnectivityStatus,
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
import { NetworkContext } from '../../components/NetworkProvider'
import { ProductsModal, SamplesModal, GiftsModal } from '../../components';
import { getProductsWithSamples } from '../../services/productService';
import DropDownHolder from '../../classes/Dropdown';
import { alertData } from '../../constants/messages';
import Location from '../../classes/Location';
import { isFetching, getLat, getLong } from '../../reducers/locationReducer';
import { getHistorys } from '../../reducers/historyReducer';
import BaseCallExecution from './BaseCallExecution';
import { updateDoctorRequest } from '../../services/doctor';

/**
 * @class CallExecution
 * @classdesc This is a container class that handles that manages the centeralised state for
 *            call execution screen
 * @extends {Component}
 * 
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
class CallExecution extends BaseCallExecution {
    /**
     * @static
     * @memberof CallExecution
     */
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Call Details'))
    // static whyDidYouRender = true

    state = {
        overlay: false,
        giftsOverlay: false,
        overlayError: '',
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
        askDocInfo: false,
        showDocInfoPanel: false,
    }

 
    /**
     * @inheritdoc
     */
    async componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
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
            dailyCall.isUpdateRequired = callData.Doctor.IsUpdateRequired
            dailyCall.jsonDailyCall.CallStartTime = moment(callData.VisitStart).format('YYYY-MM-DD hh:mm:ss')
            dailyCall.jsonDailyCall.CallEndTime = moment(callData.VisitEnd).format('YYYY-MM-DD hh:mm:ss')
            dailyCall.jsonDailyCall.DoctorCode = callData.Doctor.DoctorCode
            dailyCall.jsonDailyCall.PlanDetailId = callData.PlanDetailId
            dailyCall.jsonDailyCall.DeviceDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
            dailyCall.jsonDailyCall.DoctorLat = callData.Doctor.Latitude;
            dailyCall.jsonDailyCall.DoctorLong = callData.Doctor.Longitude;
            dailyCall.jsonDailyCall.Email = callData.Doctor.Email;
            dailyCall.jsonDailyCall.PhoneNumber = callData.Doctor.PhoneNumber;
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
                selectedFiles: _.concat(...files),
            }
            // , () => {console.log('checking all the values set', this.state, this.context)}
            )
            this.props.location()
        // })
        
    }

    /**
     * @inheritdoc
     */
    componentWillUnmount = () => {
        Location.stopLocating();
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
    submitCall = () => {
        let dailyCall = this.state.form_data;
        dailyCall.Epoch = new Date().getTime();
        dailyCall.jsonSampleDetail = this.state.selectedSamples.filter(sample => sample !== undefined);
        dailyCall.jsonDailyCallDetail = this.state.selectedProducts.filter(product => product !== undefined)
        dailyCall.jsonDailyCallEDetailing = this.state.eDetailing.filter(file => file !== undefined)
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
            this.props.submitCallSingle(dailyCall, () => {
                DropDownHolder.show(alertData.call.onlineSuccess)
                this.props.getAllProducts({
                    EmployeeId: this.props.user.EmployeeId,
                    Token: getToken,
                }, true)
                this.props.navigation.goBack()
            })
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

    updateDoctor = (payload, onSuccess, onFailure) => {
        this.props.updateDoctor(payload, onSuccess, onFailure)
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
                onPress: () => this.initiateCallExecution()
            },
            ],
        );
    }

    /**
     * @inheritdoc
     */
    render() {
        return (        
            <ImageBackgroundWrapper>
                <CallExecutionButton disabled={this.props.submitLoader} onPress={this.confirmSubmit}/>
                {this.props.submitLoader == true && <ScreenLoader /> }
                <View style={styles.InputContainer}>
                    <ScrollView
                        contentContainerStyle={{justifyContent: 'center', display: 'flex' }}>
                        <CallPlanHeader />
                        <View style={{ flex: 1}}>
                            <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <InternetConnectivityStatus />
                                <LocationStatus isFetching={this.props.isFetching} />
                            </View>
                            <Collapse
                                shouldBeCollapsed={true}
                                title="Key Call Information"
                                Body={<Tab
                                        updateDetailingSeconds={this.updateDetailingSeconds}
                                        existingCall={true}
                                        onCallReasonChange={this.onChangeAdditionalInfoAttributes}
                                        selectedReason={this.state.form_data.jsonDailyCall.CallReason}
                                        navigate={this.props.navigation}
                                        files={this.state.selectedFiles}
                                    />}  
                                HeaderIcon={<FontAwesomeIcon name="info-circle" size={RFValue(40)} color={brandColors.lightGreen} />} />
                            <Collapse
                                shouldBeCollapsed={false}
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
                                        callRemarks={this.state.form_data.jsonDailyCall.Remarks}
                                        allGifts={this.props.gifts}
                                    />
                                }
                            />
                                {
                                    this.props.history.length > 0 &&
                                    <Collapse
                                        shouldBeCollapsed={false}
                                        title="Doctor Visit History"
                                        Body={ <DoctorHistory /> }
                                        HeaderIcon={<FontAwesomeIcon name="history" size={RFValue(40)} color={brandColors.lightGreen} />}
                                    />
                                }
                        </View>
                    </ScrollView>
                    {
                        this.state.overlay &&
                        <ProductsModal
                            selectedProducts={this.state.selectedProducts}
                            selectedProductId={this.state.selectedProductId}
                            reminderPosition={this.state.reminderPosition}
                            isVisible={this.state.overlay}
                            onPressProductHandler={this.onClickProduct}
                            onCloseHandler={this.hideProductsOverlay}
                            existingCall={false}
                        />
                    }
                    {
                        this.state.samplesOverlay &&
                        <SamplesModal
                            selectedProductId={this.state.selectedProductId}
                            reminderPosition={this.state.reminderPosition}
                            selectedSamples={this.state.selectedSamples}
                            isVisible={this.state.samplesOverlay}
                            onPressSampleHanlder={this.onClickSample}
                            setSamplesCountHandler={this.setSampleCount}
                            onCloseHandler={this.handleSampleOverlayClose}
                        />
                    }
                    {
                        this.state.giftsOverlay &&
                        <GiftsModal
                            isVisible={this.state.giftsOverlay}
                            gifts={this.props.gifts}
                            onCloseHandler={this.hideGifts}
                            selectedGift={this.state.form_data.jsonGiftDetail}
                            onPressGiftHandler={this.onClickGift}
                        />
                    }
                    <DoctorInfoPanel
                        submitHandler={this.updateDoctorInfo}
                        visible={this.state.showDocInfoPanel}
                        Email={this.state.form_data.jsonDailyCall.Email}
                        Phone={this.state.form_data.jsonDailyCall.PhoneNumber}
                        toggleVisiblity={this.hideDocInfoPanel}
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
        samples: getSamples(state),
        gifts: getGifts(state),
        user: getUser(state),
        submit_data: getSubmitData(state),
        history: getHistorys(state),
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
        updateDoctor: updateDoctorRequest,
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