import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, parse, stringify, getToken, RFValue, validate, ONLINE_CALLEXECUTION_SUCCESS, OFFLINE_CALL_EXECUTION_SUCCESS, getDistance, getFilesFromProducts } from '../../constants'
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
import { getProducts, getSamples, getFiles } from '../../reducers/productsReducer';
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { getGifts } from '../../reducers/giftsReducer';
import { getUser } from '../../reducers/authReducer';
import { getSubmitData, getSubmitLoader } from '../../reducers/callsReducers';
import { getHistory } from '../../actions/history';
import { NetworkContext } from '../../components/NetworkProvider'
import GiftsModal from '../../components/GiftsModal';
import { ProductsModal, SamplesModal } from '../../components/ProductsSamplesModal';
import { getDoctorByEmployeeId } from '../../services/doctor';
import { getDoctors, getDoctorRequestLoader } from '../../reducers/doctorReducer';
import { getEmployees } from '../../services/auth';
import { getProductsWithSamples } from '../../services/productService';
import DropDownHolder from '../../classes/Dropdown';
import { isFetching, getLat, getLong } from '../../reducers/locationReducer';
import Location from '../../classes/Location';
import { alertData } from '../../constants/messages';

class CallExecutionUnplanned extends Component {
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (
        navigationOption(navigation, 'Unplanned Call Details')
    )
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
    }

    onClickProduct = (productTemplateId) => {
        let { selectedProducts, position, isReminder, selectedSamples, selectedFiles } = this.state
        let oldSelected = _.findIndex(selectedProducts, {position, IsReminder: isReminder})
        if(oldSelected > 0) {
            delete selectedProducts[oldSelected]
            delete selectedSamples[oldSelected]
            selectedFiles = _.dropWhile(selectedFiles, ['ProductId', oldSelected])
        }

        const product = _.find(this.props.products, ['ProductTemplateId', productTemplateId])
        selectedProducts[productTemplateId] = {
            ProductId: product.ProductTemplateId,
            name: product.ProductTemplateName,
            DetailingSeconds: 0,
            IsReminder: this.state.isReminder,
            position
        }
        selectedFiles = _.concat(selectedFiles, product.Files)
        this.setState({
            selectedFiles,
            selectedProducts,
            selectedProductId: productTemplateId,
            overlay: false,
        })
    }
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
        }, () => console.log(this.state.selectedSamples)
        )
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
        // , () => console.log(this.state.selectedProducts, this.state.selectedFiles, this.state.selectedSamples)
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
    onToggleCollapsedElement = (section) => {
        this.setState({[section]: !this.state[section]})
    }
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
            let { selectedProducts, selectedSamples, selectedProductId, eDetailing, selectedFiles } = this.state
            const fileIds = _.map(_.filter(this.props.files, file => file.ProductId == selectedProductId), 'DetailingFileId')
            eDetailing = eDetailing.filter(detail => !fileIds.includes(detail.DetailingFileId))
            selectedFiles = selectedFiles.filter(file => file.ProductId != selectedProductId)
            delete selectedProducts[selectedProductId];
            delete selectedSamples[selectedProductId];
            return this.setState({
                selectedProducts,
                selectedSamples,
                eDetailing,
                selectedFiles,
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
    
 
    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
            this.context.hideRefresh();
            this.props.location()
            let dailyCall = parse(stringify(callExecution));
            dailyCall.jsonDailyCall.DeviceDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
            dailyCall.EmployeeId = this.props.user.EmployeeId
    
            this.setState({
                form_data: dailyCall,
            })
        // })
    }

    onChangeAdditionalInfoAttributes = (field, value) => {
        let dailyCall = this.state.form_data
        dailyCall.jsonDailyCall[field] = value
        this.setState({
            form_data: dailyCall
        })
    }

    componentWillUnmount = () => {
        Location.stopLocating();
        this.context.showRefresh();
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
                this.props.submitCallSingle(parse(stringify(dailyCall))).then(response => {
                    if(response == 1) {
                        this.props.getUnplannedCalls({
                            EmployeeId: this.props.user.EmployeeId,
                            Token: getToken,
                        }, true)
                        this.props.getAllProducts({
                            EmployeeId: this.props.user.EmployeeId,
                            Token: getToken,
                        }, true)
                        DropDownHolder.show(alertData.call.onlineUnplannedSuccess)
                        this.props.navigation.goBack();
                    }
                }).catch(error => {
                    this.submitOffline(dailyCall)
                    console.log(error)
                })
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
        form_data.jsonDailyCall.DoctorLat = doctor.Latitude
        form_data.jsonDailyCall.DoctorLong = doctor.Longitude
        this.setState({
            form_data
        }, () => console.log(this.state.form_data))
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
                {(this.props.submitLoader == true || this.props.doctor_loading == true) && <ScreenLoader /> }
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
                                    />}  
                                HeaderIcon={<FontAwesomeIcon name="info-circle" size={RFValue(40)} color={brandColors.lightGreen} />} />
                            <Collapse
                                isCollapsed={isAdditionalInfoCollapsed}
                                section="isAdditionalInfoCollapsed"
                                toggler={this.onToggleCollapsedElement}
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
                                    />
                                }
                            />
                                {
                                    existingCall && !!this.props.history.history &&
                                    <Collapse
                                        section="isDocHistoryCollapsed"
                                        isCollapsed={isDocHistoryCollapsed}
                                        toggler={this.onToggleCollapsedElement}
                                        title="Doctor Visit History"
                                        Body={ <DoctorHistory /> }
                                        HeaderIcon={<FontAwesomeIcon name="history" size={40} color="#fff" />}/>
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
        history: getHistory(state),
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