/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, Dimensions, PermissionsAndroid, } from 'react-native'
import { Divider, Overlay, Text, ListItem, Button } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, authUser, RandomInteger } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Collapse, AdditionalInfo, DoctorHistory, ImageBackgroundWrapper } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDocHistory, submitCall } from '../../services';
import { Tab } from '..';
import { FlatList } from 'react-native-gesture-handler';
import { callExecution } from '../../defaults';
import { connect } from 'react-redux';
import { getProducts } from '../../reducers/productsReducer';
import { bindActionCreators } from 'redux'

class CallExecution extends Component {
    // constructor(props) {
    //     super(props)
    //     console.log(props)
        state = {
            isKeyInfoCollapsed: true,
            isAdditionalInfoCollapsed: false,
            isDocHistoryCollapsed: false,
            existingCall: false,
            doctor_history: [],
            samples: [],
            overlay: false,
            overlayError: '',
            lat: '',
            long: '',
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
                // },
            ],
            form_data: callExecution
        }

    // }

    onClickProduct = (productTemplateId) => {
        console.log(this.state)
        if(this.state.selectedProductId == 0) {

            const samples = this.props.products.products.filter(product => product.ProductTemplateId == productTemplateId)[0]
            this.setState({
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
            IsReminder,
            ProductId: productId,
            name: selectedProduct.ProductName,
            SampleQty: 0,
        }
        let selectedProducts = this.state.selectedProducts;
        selectedProducts[productTemplate.ProductTemplateId] = {
            ProductId: productTemplate.ProductTemplateId,
            DetailingSeconds: 0,
            name: productTemplate.ProductTemplateName
        };
        this.setState((state) =>{
            return {
                selectedSamples: selectedSamples,
                selectedProducts: selectedProducts
            }
        })
        // console.log(this.state.selectedProducts, this.state.selectedSamples)
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
            // badge={{ value: item.Products.length, status: 'success', badgeStyle: {backgroundColor: brandColors.darkBrown}, textStyle: { color: 'orange' } }}
            titleStyle={titleStyle}
            key={item.ProductTemplateId}
            bottomDivider
            onPress={() => this.onClickProduct(item.ProductTemplateId)}
            title={item.ProductTemplateName} />)
    }

    handleOverlayClose = () => {
        this.setState({
            overlay: false,
            selectedProductId: 0
        })
    }

    renderSamplesRow = ({item}) => {
        const {selectedSample} = this.state

        // let style = selectedSample.id === item.ProductId
        // ? {...styles.selectedItem, ...styles.listItems}
        // : {...styles.listItems, ...styles.selectedItem}
        // let titleStyle = selectedSample.id === item.ProductId
        // ? styles.selectedTitle
        // : styles.unSelectedTitle
        let style = styles.unSelectedItem
        let titleStyle = styles.selectedTitle
        console.log('random', RandomInteger())
        return (<ListItem
            key={RandomInteger()}
            containerStyle={style}
            titleStyle={titleStyle}
            bottomDivider
            onPress={() => this.onClickSample(item.ProductId)}
            containerStyle={styles.listItems}
            title={item.ProductName} />)
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
        console.log(this.state)
        const history = await getDocHistory({
            DoctorCode: 24081,
            EmployeeId: 1,
        })
        this.setState({
            doctor_history: history,
        })
        await this.requestLocationPermission()
    }
    callLocation(){
        navigator.geolocation.getCurrentPosition(
        //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                this.setState({ lat: currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                this.setState({ long: currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
        //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ long:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            this.setState({ lat: currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
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
                                Body={<AdditionalInfo selectedProducts={this.state.selectedProducts} selectedSamples={this.state.selectedSamples} showProducts={this.showProductsOverlay} selectedProduct={this.state.selectedProduct } selectedSample={this.state.selectedProduct} navigate={this.props.navigation} />}
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
                                    contentContainerStyle={{height: 400}}
                                    keyExtractor={RandomInteger}
                                    data={this.state.samples}
                                    renderItem={this.renderSamplesRow}
                                />
                                <View  style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '100%'}}>
                                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>{this.state.overlayError}</Text>
                                    </View>
                                </View>
                                <View style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    
                                    <View style={styles.flatList}>
                                        <Button buttonStyle={styles.button} onPress={this.handleOverlayClose} title="No need to select Sample" />
                                    </View>
                                    <View style={styles.flatList}>
                                        <Button buttonStyle={styles.button} onPress={this.handleOverlayClose} title="Close" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Overlay>
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
            </ImageBackgroundWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        products: getProducts(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    // getProductsWithSamples: getProductsWithSamples,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CallExecution)

// end of Login container
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
    },
    selectedItem: {
        backgroundColor: 'black',
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