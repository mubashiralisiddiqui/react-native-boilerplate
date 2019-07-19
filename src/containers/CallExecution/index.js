/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native'
import { Divider, Overlay, Text, ListItem } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, authUser, getProducts } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Collapse, AdditionalInfo, DoctorHistory, ImageBackgroundWrapper } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDocHistory, submitCall } from '../../services';
import { Tab } from '..';
import { FlatList } from 'react-native-gesture-handler';

export default class CallExecution extends Component {
    constructor(props) {
        super(props)
        let height = Dimensions.get('screen').height;
        this.state = {
            isKeyInfoCollapsed: true,
            isAdditionalInfoCollapsed: false,
            isDocHistoryCollapsed: false,
            buttonPositionFromTop: height,
            existingCall: false,
            doctor_history: [],
            products: [],
            samples: [],
            overlay: true,
            selectedProduct: 0,
            selectedSample: 0,
            form_data: {
                jsonDailyCall: {
                    DoctorCode: 256348,
                    EmployeeId: 1,
                    Lattitude: 24.65842,
                    Longitude: 67.515258,
                    PlanDetailId: 164462,
                    DeviceDateTime: '2019-06-06 13:42:50',
                    FeedBack: 'This is feedback',
                    JVEmployeeId: 0,
                    CallStartTime: '2019-06-06 13:26:50',
                    CallEndTime: '2019-06-06 13:41:50',
                    Remarks: 'Neutral',
                },
                jsonDailyCallDetail: [{
                    ProductId: 4,
                    DetailingSeconds: 10,
                    
                  },
                  {
                    ProductId: 7,
                    DetailingSeconds: 6,
                    
                  }],
                  jsonSampleDetail: [{
                    ProductId: 4,
                    SampleQty: 1,
                    IsReminder: true
                  },
                  {
                    ProductId: 7,
                    SampleQty: 1,
                    IsReminder: false
                  }],
                  jsonGiftDetail: [],
                  EmployeeId: 1,
                  Token: 'Fahad'
            }
        }

    }

    onClickProduct = (productTemplateId) => {
        const samples = this.state.products.filter(product => product.ProductTemplateId == productTemplateId)[0]
        this.setState({
            samples: samples.Products,
            selectedProduct: productTemplateId
        })
    }
    onClickSample = (productId) => {
        this.setState({
            selectedSample: productId
        })
    }

    renderProductsRow = ({item}) => {
        const {selectedProduct} = this.state
        let style = styles.listItems;
        style = selectedProduct === item.ProductTemplateId
        ? {...style, ...styles.selectedItems}
        : {...style, ...styles.unSelectedItem}
        let titleStyle = selectedProduct === item.ProductTemplateId
        ? styles.selectedTitle
        : styles.unSelectedTitle
        return (<ListItem
            containerStyle={style}
            titleStyle={titleStyle}
            key={item.ProductTemplateId}
            bottomDivider
            onPress={() => this.onClickProduct(item.ProductTemplateId)}
            title={item.ProductTemplateName} />)

    }

    renderSamplesRow = ({item}) => {
        const {selectedSample} = this.state
        let style = styles.listItems;
        console.log(selectedSample, item.ProductId)
        const style1 = selectedSample === item.ProductId
        ? {...styles.selectedItem, ...style}
        : {...style, ...styles.selectedItem}
        console.log(style, item.ProductName)
        let titleStyle = selectedSample === item.ProductId
        ? styles.selectedTitle
        : styles.unSelectedTitle
        return (<ListItem
            key={item.ProductId}
            containerStyle={style1}
            titleStyle={titleStyle}
            bottomDivider
            onPress={() => this.onClickSample(item.ProductId)}
            containerStyle={styles.listItems}
            title={item.ProductName} />)
    }
    onToggle = (section) => {
        Object.keys(this.state).map((value, key) => {
            if(value !== section) this.setState({ [value]: false })
        })
        this.setState({[section]: !this.state[section]})
    }
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Call Details'))
 
    async componentDidMount() {
        const history = await getDocHistory({
            DoctorCode: 24081,
            EmployeeId: 1,
        })
        this.setState({
            doctor_history: history,
            existing_call: this.props.navigation.getParam('existing_call', false),
            products: this.props.navigation.getParam('products', []),
        })
        console.log(this.state.products)
        // submitCall(this.state.form_data)
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
                        <Divider/>
                        <View style={{ flex: 1 }}>
                            <Collapse
                                isCollapsed={isKeyInfoCollapsed}
                                toggler={() => this.onToggle('isKeyInfoCollapsed')}
                                title="Key Call Information"
                                Body={<Tab navigate={this.props.navigation}/>}  
                                // Body={<KeyCallInfo navigate={this.props.navigation}  />}  
                                HeaderIcon={<Icon name="info-circle" size={40} color="#fff" />} />
                            <Collapse
                                isCollapsed={isAdditionalInfoCollapsed}
                                toggler={() => this.onToggle('isAdditionalInfoCollapsed')}
                                title="Additional Information"
                                Body={<AdditionalInfo navigate={this.props.navigation} />}
                                HeaderIcon={<Icon name="plus-square" size={40} color="#fff" />} />
                                {
                                    existingCall && !!doctor_history ?
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
                </View >
                <Icon2 style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: brandColors.green,
                            position: 'absolute',
                            right: 50,
                            bottom:50,
                            zIndex: 1000
                            }}
                        name="grain" color={brandColors.darkBrown} size={50}
                    ></Icon2>
                    <Overlay
                    borderRadius={15}
                    onBackdropPress={() => this.setState({overlay: false})}
                    isVisible={this.state.overlay}
                    >
                        <View style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row'}}>
                            <View style={styles.flatList}>
                                <Text h3 h3Style={styles.listTitle}>Select Product</Text>
                                <FlatList
                                data={this.state.products}
                                renderItem={this.renderProductsRow}
                                />
                            </View>
                            <View style={styles.flatList}>
                                <Text h3 h3Style={styles.listTitle}>Select Sample (Select Product First)</Text>
                                <FlatList
                                    extraData={this.state.products}
                                    data={this.state.samples}
                                    renderItem={this.renderSamplesRow}
                                />
                            </View>
                        </View>
                    </Overlay>
            </ImageBackgroundWrapper>
        )
    }
}

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        height: 'auto'
    },
    flatList: {
        width: '48%',
        marginHorizontal: 5,
        // borderWidth: 1,
        // borderRadius: 15,
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
    },
    selectedItem: {
        backgroundColor: brandColors.lightGreen,
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