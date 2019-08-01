/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, PermissionsAndroid, } from 'react-native'
import { Overlay, Text, ListItem, Button, Badge } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, RandomInteger, getToken } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Collapse, AdditionalInfo, DoctorHistory, ImageBackgroundWrapper, Blink } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDocHistory } from '../../services/historyService';
import { submitCallSingle, getTodayCalls } from '../../services/callServices';
import { Tab } from '..';
import { FlatList } from 'react-native-gesture-handler';
import { callExecution } from '../../defaults';
import { connect } from 'react-redux';
import { getProducts } from '../../reducers/productsReducer';
import { bindActionCreators } from 'redux'
import Counter from "react-native-counters";
import moment from 'moment';
import { getGifts } from '../../reducers/giftsReducer';
import { getUser } from '../../reducers/authReducer';
import { getSubmitData } from '../../reducers/callsReducers';
import { getHistory } from '../../actions/history';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { NetworkContext } from '../../components/NetworkProvider'

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
        form_data: callExecution,
        submitLoader: false,
    }

    onClickProduct = (productTemplateId) => {
        console.log(this.state.selectedProductId)
        if(this.state.selectedProductId === 0) {
            let selectedProducts = this.state.selectedProducts
            const selectedProduct = this.props.products.products.filter(product => product.ProductTemplateId === productTemplateId)[0]
            selectedProducts[productTemplateId] = {
                ProductId: selectedProduct.ProductTemplateId,
                DetailingSeconds: 0
            }
            const samples = this.props.products.products.filter(product => product.ProductTemplateId == productTemplateId)[0]
            this.setState({
                selectedProducts: selectedProducts,
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
        const productTemplate = this.props.products
        .products
        .filter(product => product
            .Products
            .filter(sample => sample.ProductId == productId).length > 0)
        [0];

        var selectedProduct = null;
        this.props.products.products.map(product => {
            product.Products.map(sample => {
                if(sample.ProductId === productId) {
                    selectedProduct = sample;
                }
            })
        })
        let selectedSamples = this.state.selectedSamples;
        selectedSamples[productTemplate.ProductTemplateId] = {
            IsReminder: false,
            ProductId: productId,
            name: selectedProduct.ProductName,
            SampleQty: 0,
            ProductTemplateId: productTemplate.ProductTemplateId
        }
        this.setState((state) =>{
            return {
                selectedSamples: selectedSamples,
            }
        })
    }

    renderProductsRow = ({item}) => {
        if(this.state.selectedProducts.length === 0) {
            
        }
        const {selectedProductId} = this.state
        let style = styles.listItems;
        style = selectedProductId === item.ProductTemplateId
        ? {...style, ...styles.selectedItems}
        : {...style, ...styles.unSelectedItem}
        let titleStyle = selectedProductId === item.ProductTemplateId
        ? styles.selectedTitle
        : styles.unSelectedTitle
        return (<ListItem
            containerStyle={style}
            titleStyle={titleStyle}
            key={item.ProductTemplateId}
            bottomDivider
            topDivider
            onPress={() => this.onClickProduct(item.ProductTemplateId)}
            title={item.ProductTemplateName} />)
    }

    handleOverlayClose = (unselect = false) => {
        if(unselect) {
            let selectedSamples = this.state.selectedSamples;
            selectedSamples.splice(this.state.selectedProductId, 1)
            this.setState({
                selectedSamples,
                overlay: false,
                selectedProductId: 0,
            })
            return;
        }
        this.setState({
            overlay: false,
            selectedProductId: 0
        })
    }

    renderSamplesRow = ({item}) => {
        const { selectedSamples } = this.state

        let selected = selectedSamples.filter(sample => sample.ProductId === item.ProductId)

        let style = selected[0] === undefined
        ? {...styles.listItems, ...styles.unSelectedItem}
        : {...styles.selectedItem, ...styles.listItems}
        let titleStyle = selected[0] === undefined
        ? styles.unSelectedTitle
        : styles.selectedTitle
        return (<ListItem
            key={RandomInteger()}
            containerStyle={style}
            titleStyle={titleStyle}
            bottomDivider
            topDivider
            onPress={() => this.onClickSample(item.ProductId)}
            rightElement={selected[0] !== undefined ? <Counter start={selected[0].SampleQty} max={10} onChange={(number, type) => this.setSampleCount(number, type, item.ProductTemplateId)} /> : null}
            title={item.ProductName} />)
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
    showProductsOverlay = (selectedProduct) => {
        this.setState({
            overlay: true,
            selectedProductId: selectedProduct,
            samples: selectedProduct !== null
                ? this.props.products.products.filter(product => product.ProductTemplateId == selectedProduct)[0].Products
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
        let dailyCall = this.state.form_data;
        const callData = this.props.navigation.getParam('call_info')
        console.log(callData)
        let selectedProducts = [];
        callData.Products.map(product => {
            selectedProducts[product.ProductId] = {
                ProductId: product.ProductId,
                name: product.ProductName,
                DetailingSeconds: 0
            }
            return product;
        })
        dailyCall.jsonDailyCall.CallStartTime = moment(callData.VisitStart).format('YYYY-MM-DD hh:mm:ss')
        dailyCall.jsonDailyCall.CallEndTime = moment(callData.VisitEnd).format('YYYY-MM-DD hh:mm:ss')
        dailyCall.jsonDailyCall.DoctorCode = callData.Doctor.DoctorCode
        dailyCall.jsonDailyCall.PlanDetailId = callData.PlanDetailId
        dailyCall.jsonDailyCall.DeviceDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
        dailyCall.EmployeeId = this.props.user.EmployeeId
        dailyCall.DailyCallId = callData.PlanDetailId

        this.props.getDocHistory({
            Token: getToken,
            DoctorCode: callData.Doctor.DoctorCode,
            EmployeeId: this.props.user.EmployeeId,
        });
        this.setState({
            form_data: dailyCall,
            selectedProducts: selectedProducts
        })
        this.requestLocationPermission()
        console.log('checking all the values set', this.state, this.context)
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
                (error) => console.log(this.state.form_data.jsonDailyCall.Lattitude, this.state.form_data.jsonDailyCall.Longitude),
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
     }

    submitCall = async () => {
        await this.requestLocationPermission()
        let dailyCall = this.state.form_data;
        dailyCall.jsonSampleDetail = this.state.selectedSamples.filter(sample => sample !== undefined);
        dailyCall.jsonDailyCallDetail = this.state.selectedProducts.filter(product => product !== undefined)
        console.log('checking the whole data', dailyCall);
        if(dailyCall.jsonDailyCall.Lattitude == '0.0' || dailyCall.jsonDailyCall.Longitude == '0.0'){
            alert('Unable to capture your location, please try to move, refresh the application or open your location service if it is not.');
            return;
        }
        // return

        this.props.submitCallSingle(dailyCall).then(response => {
            if(response === 1) {
                this.props.getTodayCalls({
                    Token: getToken,
                    EmployeeId: this.props.user.EmployeeId,
                });
            }
        }).catch(console.warn)
    } 

    renderGiftsRow = ({ item }) => {
        const dailyCall = this.state.form_data
        const selected = dailyCall.jsonGiftDetail
        return (<ListItem
            key={RandomInteger()}
            containerStyle={styles.listItems}
            titleStyle={styles.unSelectedTitle}
            bottomDivider
            onPress={() => this.onClickGift(item.GiftId)}
            containerStyle={styles.listItems}
            rightElement={(selected[0] !== undefined && selected[0].GiftId === item.GiftId) ? <Counter start={selected[0].GiftQty} max={5} onChange={(number, type) => this.onClickGift(item.GiftId, number)} /> : null}
            title={item.GiftName} />)
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
        console.log(32234)
        this.setState({
            giftsOverlay: true
        })
    }
    hideGifts = (unselect = false) => {
        // console.log(unselect, 'checking');return;
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

    render() {
        const {
            isKeyInfoCollapsed,
            isAdditionalInfoCollapsed,
            isDocHistoryCollapsed,
            existingCall,
            doctor_history,
        } = this.state;
        return (        
            <ImageBackgroundWrapper>
                <View style={styles.InputContainer}>
                    <KeyboardAwareScrollView
                    contentContainerStyle={{justifyContent: 'center', display: 'flex' }}>
                        <CallPlanHeader />
                        <View style={{ flex: 1}}>
                            <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <View style={{width: '15%'}}>
                                    {
                                        this.context.isConnected === true ?
                                        <Button
                                            type="clear"
                                            title="connected"
                                            titleStyle={{fontSize: 12}}
                                            icon={<MaterialCommunityIcon name={'signal-4g'} />}
                                        />
                                        : <Button
                                            type="clear"
                                            title="Unavailable"
                                            titleStyle={{fontSize: 11, color: 'red'}}
                                            icon={<MaterialCommunityIcon name={'wifi-off'} color="red" />}
                                        />
                                    }
                                </View>

                                <View style={{width: '10%'}}>

                                    <Blink blinking={this.state.fetchingLocation} delay={300}>
                                        <Button
                                            type="clear"
                                            title={this.state.fetchingLocation === true ? `Fetching` : `Fetched`}
                                            disabled={this.state.fetchingLocation}
                                            titleStyle={{fontSize: 12}}
                                            buttonStyle={{width: '100%'}}
                                            containerStyle={{width: '100%',}}
                                            icon={<Icon2
                                                name={this.state.fetchingLocation === true ? "location-searching" : 'location-on'}
                                                size={15} 
                                                color={this.state.fetchingLocation === true ? 'red' : 'green'} />}
                                        />
                                    </Blink>
                                </View>

                            </View>
                            <Collapse
                                isCollapsed={isKeyInfoCollapsed}
                                toggler={() => this.onToggle('isKeyInfoCollapsed')}
                                title="Key Call Information"
                                Body={<Tab onCallReasonChange={this.onCallReasonChange} navigate={this.props.navigation}/>}  
                                HeaderIcon={<Icon name="info-circle" size={40} color="#fff" />} />
                            <Collapse
                                isCollapsed={isAdditionalInfoCollapsed}
                                toggler={() => this.onToggle('isAdditionalInfoCollapsed')}
                                title="Additional Information"
                                Body={<AdditionalInfo
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
                                        allGifts={this.props.gifts.gifts}
                                    />}
                                HeaderIcon={<Icon name="plus-square" size={40} color="#fff" />} />
                                {
                                    existingCall && !!this.props.history.history ?
                                    <Collapse
                                        isCollapsed={isDocHistoryCollapsed}
                                        toggler={() => this.onToggle('isDocHistoryCollapsed')}
                                        title="Doctor Visit History"
                                        Body={ <DoctorHistory /> }
                                        HeaderIcon={<Icon name="history" size={40} color="#fff" />}/>
                                        : null
                                }
                        </View>
                    </KeyboardAwareScrollView>
                    <Overlay
                    borderRadius={15}
                    width={'90%'}
                    onBackdropPress={() => this.setState({overlay: false})}
                    isVisible={this.state.overlay}
                    >
                        <View style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row'}}>
                            <View style={styles.flatList}>
                                <Text h3 h3Style={styles.listTitle}>Select Product</Text>
                                <FlatList
                                keyExtractor={RandomInteger}
                                data={this.props.products.products}
                                renderItem={this.renderProductsRow}
                                />
                            </View>
                            <View style={styles.flatList}>
                                <Text h3 h3Style={styles.listTitle}>Select Sample (Select Product First)</Text>
                                <FlatList
                                    contentContainerStyle={{height: 220}}
                                    keyExtractor={RandomInteger}
                                    data={this.state.samples}
                                    renderItem={this.renderSamplesRow}
                                />
                                <View  style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <View style={{width: '100%'}}>
                                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>{this.state.overlayError}</Text>
                                    </View>
                                </View>
                                <View style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    
                                    <View style={{width: '60%',marginHorizontal: 3,}}>
                                        <Button
                                            buttonStyle={styles.button}
                                            onPress={() => this.handleOverlayClose(true)}
                                            title="No need to select Sample"
                                        />
                                    </View>
                                    <View style={{width: '35%', marginHorizontal: 3,}}>
                                        <Button buttonStyle={styles.button} onPress={() => this.handleOverlayClose(false)} title="Done" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Overlay>
                    <Overlay
                        borderRadius={15}
                        width={'75%'}
                        onBackdropPress={() => this.hideGifts(true)}
                        isVisible={this.state.giftsOverlay}
                    >
                        <View style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ width: '98%', marginHorizontal: 5}}>
                                <Text h3 h3Style={styles.listTitle}>Select Gift</Text>
                                <FlatList
                                    contentContainerStyle={{height: 400}}
                                    keyExtractor={RandomInteger}
                                    data={this.props.gifts.gifts}
                                    renderItem={this.renderGiftsRow}
                                />
                            </View>
                        </View>
                        <View style={{width:'98%', display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <View style={{flexDirection: 'row'}}>

                            <View style={styles.flatList}>
                                <Button
                                    buttonStyle={styles.button}
                                    onPress={() => this.hideGifts(true)}
                                    title="No need to select Gift"
                                />
                            </View>
                            <View style={styles.flatList}>
                                <Button
                                    buttonStyle={styles.button}
                                    onPress={() => this.hideGifts(false)}
                                    title="Done" />
                            </View>
                            </View>
                        </View>
                    </Overlay>
                </View >
                <Button buttonStyle={{
                    width: 60,
                    height: 60,
                    borderRadius: 35,
                    backgroundColor: brandColors.green,
                    zIndex: 10000
                }} containerStyle={{
                            width: 60,
                            height: 60,
                            borderRadius: 35,
                            backgroundColor: brandColors.green,
                            position: 'absolute',
                            right: 50,
                            bottom:50,
                            }}
                            icon={<Icon2
                                    name="grain" color={brandColors.darkBrown} size={50}
                                    onPress={this.submitCall}
                                />}
                        disabled={this.state.submitLoader}
                        />
                
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
        netInfo: getNetInfo(state)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayCalls: getTodayCalls,
    submitCallSingle: submitCallSingle,
    getDocHistory: getDocHistory
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CallExecution)

const styles = {
    button: {
        marginVertical: 5,
        width: '100%',
        backgroundColor: brandColors.lightGreen,
        position: 'relative'
    },
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    },
    flatList: {
        width: '48%',
        marginHorizontal: 5,
    },
    listTitle: {
        backgroundColor: '#e3ded5',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 5,
        width: '99.8%'
    },
    listItems: {
        width: '99%',
        height: 40,
    },
    selectedItem: {
        // backgroundColor: 'black',
        // backgroundColor: brandColors.lightGreen,
    },
    selectedItems: {
        backgroundColor: brandColors.green,
    },
    unSelectedItem: {
        backgroundColor: 'white',
    },
    selectedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    unSelectedTitle: {
        fontSize: 16,
    }
}