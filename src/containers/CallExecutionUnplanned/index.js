import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native'
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, parse, stringify, getToken, RSM_ROLE_ID, SPO_ROLE_ID, getFilesFromProducts, validate } from '../../constants'
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
import { getDoctorByEmployeeId } from '../../services/doctor';
import { getDoctors } from '../../reducers/doctorReducer';
import { getEmployees } from '../../services/auth';
import { getProductsWithSamples } from '../../services/productService';

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
    }

    onClickProduct = (productTemplateId) => {
        if(this.state.selectedProductId == null || this.state.selectedProductId == 0) {
            // console.log(this.state.selectedProductId, this.state.selectedProducts, this.state.selectedProducts[productTemplateId], 'dimagh out')
            const samples = this.props.products.filter(product => product.ProductTemplateId == productTemplateId)[0]
            return this.setState({
                samples: samples.Products,
            })
        }
        this.setState({
            overlayError: 'You can not select another product.'
        })
        setTimeout(() => {
            this.setState({
                overlayError: ''
            })
        }, 5000)
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
        let {selectedProducts, selectedSamples, eDetailing, reminderPosition} = this.state
        let alreadySelectedProductAtThisPosition = selectedProducts
        .filter(product => (product.reminderPosition && product.reminderPosition == reminderPosition))
        if(alreadySelectedProductAtThisPosition.length > 0) {
            delete selectedProducts[alreadySelectedProductAtThisPosition[0].ProductId];
            delete selectedSamples[alreadySelectedProductAtThisPosition[0].ProductId];
        }
        let files = [];
        if(selectedProducts[productTemplate.ProductTemplateId] == undefined) {
            selectedProducts[productTemplate.ProductTemplateId] = {
                ProductId: productTemplate.ProductTemplateId,
                name: productTemplate.ProductTemplateName,
                DetailingSeconds: 0,
                isReminder: false,
                reminderPosition: reminderPosition,
            }
            files = getFilesFromProducts(this.props.products, productTemplate.ProductTemplateId);
            files
            .map(file => {
                eDetailing[file.DetailingFileId] = {
                    DetailingFileId: file.DetailingFileId,
                    Duration: 0,
                }
                return file;
            })
        }

        selectedSamples[productTemplate.ProductTemplateId] = {
            IsReminder: (selectedProducts[productTemplate.ProductTemplateId] && selectedProducts[productTemplate.ProductTemplateId].IsReminder || false),
            ProductId: productId,
            name: selectedProduct.ProductName,
            SampleQty: 0,
            ProductTemplateId: productTemplate.ProductTemplateId
        }
        this.setState({
            selectedProducts,
            selectedSamples,
            eDetailing,
            selectedFiles: files
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
        , () => console.log(this.state.selectedProducts, this.state.selectedFiles, this.state.selectedSamples)
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
 
    async componentDidMount() {
        this.context.hideRefresh();
        this.requestLocationPermission()
        let dailyCall = parse(stringify(callExecution));
        dailyCall.jsonDailyCall.DeviceDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
        dailyCall.EmployeeId = this.props.user.EmployeeId

        this.setState({
            form_data: dailyCall,
        })
    }

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
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
        this.context.showRefresh();
     }

    submitCall = async () => {
        if(this.state.selectedProducts.length == 0) {
            alert('Please select at least one product');
            return;
        }
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
        const [errors, shouldSubmit] = validate(this.state.validations, dailyCall.jsonDailyCall);
        if(shouldSubmit) {
            if(this.context.state.isConnected) {
                this.props.submitCallSingle(dailyCall).then(response => {
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
        form_data.jsonDailyCall.SelectedDoctorAddress = doctor.DoctorAddress
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
                                HeaderIcon={<FontAwesomeIcon name="info-circle" size={40} color={brandColors.green} />} />
                            <Collapse
                                isCollapsed={isAdditionalInfoCollapsed}
                                toggler={() => this.onToggle('isAdditionalInfoCollapsed')}
                                title="Additional Information"
                                HeaderIcon={<FontAwesomeIcon name="plus-square" size={40} color={brandColors.green} />}
                                Body={
                                    <AdditionalInfo
                                        existingCall={false}
                                        showGifts={this.showGifts}
                                        onChangeAdditionalNotes={this.onChangeAdditionalInfoAttributes}
                                        onChangeCallRemarks={this.onChangeAdditionalInfoAttributes}
                                        selectedProducts={this.state.selectedProducts}
                                        selectedSamples={this.state.selectedSamples}
                                        showProducts={this.showProductsOverlay}
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
        submitLoader: getSubmitLoader(state),
        doctors: getDoctors(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayCalls: getTodayCalls,
    submitCallSingle: submitCallSingle,
    getDocHistory: getDocHistory,
    submitOfflineCall: submitOfflineCall,
    getDoctorsByEmployee: getDoctorByEmployeeId,
    getReportingEmployees: getEmployees,
    getUnplannedCalls: getTodayUnplannedCalls,
    getAllProducts: getProductsWithSamples,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CallExecutionUnplanned)

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    }
}