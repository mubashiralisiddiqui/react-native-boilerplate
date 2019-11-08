import React from 'react';
import { View, ScrollView, Alert } from 'react-native'
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, parse, stringify, getToken, RFValue, validate, getDistance } from '../../constants'
import { FontAwesomeIcon } from '../../components/Icons';
import {
    Collapse,
    AdditionalInfo,
    DoctorHistory,
    ImageBackgroundWrapper,
    InternetConnectivityStatus,
    LocationStatus,
    ScreenLoader,
    CallExecutionButton,
    DoctorInfoPanel,
} from '../../components';
import { getDocHistory } from '../../services/historyService';
import { submitCallSingle, getTodayCalls, submitOfflineCall, getTodayUnplannedCalls } from '../../services/callServices';
import { Tab } from '..';
import { callExecution } from '../../defaults';
import { connect } from 'react-redux';
import { getProducts, getSamples, getFiles } from '../../reducers/productsReducer';
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { getGifts } from '../../reducers/giftsReducer';
import { getUser } from '../../reducers/authReducer';
import { getSubmitData, getSubmitLoader } from '../../reducers/callsReducers';
import { NetworkContext } from '../../components/NetworkProvider'
import { ProductsModal, SamplesModal, GiftsModal } from '../../components';
import { getDoctorByEmployeeId, updateDoctorRequest } from '../../services/doctor';
import { getDoctors, getDoctorRequestLoader } from '../../reducers/doctorReducer';
import { getEmployees } from '../../services/auth';
import { getProductsWithSamples } from '../../services/productService';
import DropDownHolder from '../../classes/Dropdown';
import { isFetching, getLat, getLong } from '../../reducers/locationReducer';
import Location from '../../classes/Location';
import { alertData } from '../../constants/messages';
import { getHistorys } from '../../reducers/historyReducer';
import BaseCallExecution from '../CallExecution/BaseCallExecution';

class CallExecutionUnplanned extends BaseCallExecution {
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (
        navigationOption(navigation, 'Unplanned Call Details')
    )
    state = {
        history_loaded: false,
        overlay: false,
        giftsOverlay: false,
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
        selectedFiles: [],
        validations: {
            DoctorCode: {
                required: true,
            }
        },
        errors: {
            DoctorCode: '',
        },
        position: 0,
        samplesOverlay: false,
        isReminder: false,
        showDocInfoPanel: false,
    }
    
    componentDidMount() {
        this.props.location()
        let dailyCall = parse(stringify(callExecution));
        dailyCall.jsonDailyCall.DeviceDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
        dailyCall.EmployeeId = this.props.user.EmployeeId

        this.setState({
            form_data: dailyCall,
        })
    }

    componentWillUnmount = () => {
        Location.stopLocating();
     }

    submitCall = async () => {
        if(this.state.selectedProducts.length == 0) {
            alert('Please select at least one product');
            return;
        }
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
        const [errors, shouldSubmit] = validate(this.state.validations, dailyCall.jsonDailyCall);
        if(shouldSubmit) {
            if(this.context.state.isInternetReachable) {
                this.props.submitCallSingle(
                    parse(stringify(dailyCall)),
                    () => {
                        DropDownHolder.show(alertData.call.onlineUnplannedSuccess)
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
                    )
            } else {
                this.submitOffline(dailyCall).then(response => {
                    console.log(response)
                })
            }
        } else {
            this.setState({
                errors
            })
        }
        
    }
    
    submitOffline = (params) => {
        return this.props.submitOfflineCall(params).then(response => {
            DropDownHolder.show(alertData.call.offlineUnplannedSuccess)
            this.props.navigation.goBack()
            return response
        })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date, field, callback) => {
    let callDetails = this.state.form_data
    callDetails.jsonDailyCall[field] = moment(date).format('YYYY-MM-DD hh:mm:ss')
    if(field === 'CallStartTime') {
        callDetails.jsonDailyCall.CallEndTime = moment(date).add(15, 'minute').format('YYYY-MM-DD hh:mm:ss')
    }
    this.setState({
        form_data: callDetails
    })
    callback();
    };

    setMio = (employee) => {
        let { form_data } = this.state
        form_data.jsonDailyCall.JVEmployeeId = employee.Id
        form_data.jsonDailyCall.SelectedEmployeeName = employee.Value
        if(this.props.user.EmployeeId != employee.Id) {
            form_data.jsonDailyCall.JVEmployeeId = employee.Id
        }
        this.setState({
            form_data
        })
        this.props.getDoctorsByEmployee({
            EmployeeId: employee.Id
        })
    }

    setDoctor = (doctor) => {
        let { form_data } = this.state;
        form_data.jsonDailyCall.DoctorCode = doctor.DoctorCode;
        form_data.jsonDailyCall.SelectedDoctorName = doctor.DoctorName;
        form_data.jsonDailyCall.SelectedDoctorAddress = doctor.DoctorAddress;
        form_data.jsonDailyCall.DoctorLat = doctor.Latitude;
        form_data.jsonDailyCall.DoctorLong = doctor.Longitude;
        form_data.jsonDailyCall.Email = doctor.Email;
        form_data.jsonDailyCall.PhoneNumber = doctor.PhoneNumber;
        form_data.isUpdateRequired = doctor.IsUpdateRequired;
        this.props.getDocHistory({
            Token: getToken,
            DoctorCode: doctor.DoctorCode,
            EmployeeId: this.props.user.EmployeeId,
        });
        this.setState({
            form_data,
            history_loaded: true,
        })
    }

    confirmSubmit = () => {
        Alert.alert(
            'Unplanned Call Execution',
            'Are you sure you wan to execute this unplanned call?',
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

    render() {
        return (
            <ImageBackgroundWrapper>
                <CallExecutionButton disabled={this.props.submitLoader} onPress={this.initiateCallExecution}/>
                {(this.props.submitLoader == true || this.props.doctor_loading == true) && <ScreenLoader /> }
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
                                        doctors={this.props.doctors}
                                        setDoctor={this.setDoctor}
                                        setMio={this.setMio}
                                        handleDatePicked={this.handleDatePicked}
                                        updateDetailingSeconds={this.updateDetailingSeconds}
                                        existingCall={false}
                                        onCallReasonChange={this.onChangeAdditionalInfoAttributes}
                                        navigate={this.props.navigation}
                                        files={this.state.selectedFiles}
                                        data={this.state.form_data.jsonDailyCall}
                                        errors={this.state.errors}
                                        selectedReason={this.state.form_data.jsonDailyCall.CallReason}
                                    />}  
                                HeaderIcon={<FontAwesomeIcon name="info-circle" size={RFValue(40)} color={brandColors.lightGreen} />} />
                            <Collapse
                                shouldBeCollapsed={false}
                                title="Additional Information"
                                HeaderIcon={<FontAwesomeIcon name="plus-square" size={RFValue(40)} color={brandColors.lightGreen} />}
                                Body={
                                    <AdditionalInfo
                                        existingCall={false}
                                        showGifts={this.showGifts}
                                        onChangeAdditionalNotes={this.onChangeAdditionalInfoAttributes}
                                        onChangeCallRemarks={this.onChangeAdditionalInfoAttributes}
                                        selectedProducts={this.state.selectedProducts}
                                        selectedSamples={this.state.selectedSamples}
                                        showProducts={this.showProductsOverlay}
                                        showSamples={this.showSamplesOverlay}
                                        navigate={this.props.navigation}
                                        selectedGift={this.state.form_data.jsonGiftDetail}
                                        allGifts={this.props.gifts}
                                        callRemarks={this.state.form_data.jsonDailyCall.Remarks}
                                    />
                                }
                            />
                                {
                                    this.state.history_loaded && this.props.history.length > 0 &&
                                    <Collapse
                                        shouldBeCollapsed={false}
                                        title="Doctor Visit History"
                                        Body={ <DoctorHistory /> }
                                        HeaderIcon={<FontAwesomeIcon name="history" size={RFValue(40)} color={brandColors.lightGreen} />}/>
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
const mapStateToProps = state => {
    return {
        products: getProducts(state),
        samples: getSamples(state),
        gifts: getGifts(state),
        user: getUser(state),
        submit_data: getSubmitData(state),
        history: getHistorys(state),
        submitLoader: getSubmitLoader(state),
        doctors: getDoctors(state),
        isFetching: isFetching(state),
        lat: getLat(state),
        long: getLong(state),
        doctor_loading: getDoctorRequestLoader(state),
        files: getFiles(state)
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
      {
        getTodayCalls: getTodayCalls,
        submitCallSingle: submitCallSingle,
        getDocHistory: getDocHistory,
        submitOfflineCall: submitOfflineCall,
        getDoctorsByEmployee: getDoctorByEmployeeId,
        getReportingEmployees: getEmployees,
        getUnplannedCalls: getTodayUnplannedCalls,
        getAllProducts: getProductsWithSamples,
        updateDoctor: updateDoctorRequest,
      },
      dispatch,
    ),
    location: () => Location.requestLocation(dispatch), // this is not to be wrapped into dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(CallExecutionUnplanned)

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    }
}