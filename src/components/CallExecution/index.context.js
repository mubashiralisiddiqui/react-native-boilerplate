// import React, { Component, createContext } from 'react'
// import { View } from 'react'
// import { ImageBackgroundWrapper, Collapse, CallExecutionButton, ScreenLoader } from '..'
// import { Tab } from '../../containers'
// import { FontAwesomeIcon } from '../Icons'
// import { CallPlanHeader } from '../Headers'
// import { ScrollView } from 'react-native-gesture-handler'
// import { brandColors, RFValue } from '../../constants'
// import Location from '../../classes/Location'
// import { getTodayCalls, submitCallSingle, submitOfflineCall, getTodayUnplannedCalls } from '../../services/callServices'
// import { getDocHistory } from '../../services/historyService'
// import { getProductsWithSamples } from '../../services/productService'
// import { updateDoctorRequest } from '../../services/doctor'
// import { getProducts, getSamples } from '../../reducers/productsReducer'
// import { getGifts } from '../../reducers/giftsReducer'
// import { getUser } from '../../reducers/authReducer'
// import { getSubmitData, getSubmitLoader } from '../../reducers/callsReducers'
// import { getHistorys } from '../../reducers/historyReducer'
// import { isFetching, getLat, getLong } from '../../reducers/locationReducer'

// const CallExecutionContext = createContext({
//     overlay: false,
//     giftsOverlay: false,
//     overlayError: '',
//     selectedProductId: 0, // This will be only set while opening the overlay, and unset while closing the overlay
//     reminderPosition: 0, // This will be only set while opening the overlay, and unset while closing the overlay
//     // This key will me merged with JsonCallDetails key of API call
//     selectedProducts: [
//         // This will be the structure of each object in this array
//         // {
//         //     ProductId: 0, // This is ProductTemplateId in database and API calls
//         //     name: '',
//         //     DetailingSeconds: 0, 
//         // },
//     ],
//     // This key will be merged with JsonSamplesDetails key of API call
//     selectedSamples: [
//         // This will be the structure of each object in this array
//         // {
//         //     0: 0,
//         //     name: '',
//         //     ProductId: 0,  // This is ProductId in database and API calls and represent Samples
//         //     IsReminder: false,
//         //     ProductTemplateId: 0
//         // },
//     ],
//     eDetailing: [
//         // this will be added in the final call param
//         // {
//         //     DetailingFileId: 1,
//         //     Duration: 0 // in seconds
//         // }
//     ],
//     form_data: parse(stringify(callExecution)),
//     position: 0,
//     samplesOverlay: false,
//     isReminder: false,
//     selectedFiles: [],
//     askDocInfo: false,
//     showDocInfoPanel: false,
// })
// export default class CallExecutionContext extends Component {

//     state = {
//         overlay: false,
//         giftsOverlay: false,
//         overlayError: '',
//         selectedProductId: 0, // This will be only set while opening the overlay, and unset while closing the overlay
//         reminderPosition: 0, // This will be only set while opening the overlay, and unset while closing the overlay
//         // This key will me merged with JsonCallDetails key of API call
//         selectedProducts: [
//             // This will be the structure of each object in this array
//             // {
//             //     ProductId: 0, // This is ProductTemplateId in database and API calls
//             //     name: '',
//             //     DetailingSeconds: 0, 
//             // },
//         ],
//         // This key will be merged with JsonSamplesDetails key of API call
//         selectedSamples: [
//             // This will be the structure of each object in this array
//             // {
//             //     0: 0,
//             //     name: '',
//             //     ProductId: 0,  // This is ProductId in database and API calls and represent Samples
//             //     IsReminder: false,
//             //     ProductTemplateId: 0
//             // },
//         ],
//         eDetailing: [
//             // this will be added in the final call param
//             // {
//             //     DetailingFileId: 1,
//             //     Duration: 0 // in seconds
//             // }
//         ],
//         form_data: parse(stringify(callExecution)),
//         position: 0,
//         samplesOverlay: false,
//         isReminder: false,
//         selectedFiles: [],
//         askDocInfo: false,
//         showDocInfoPanel: false,
//     }

//     onClickProduct = (productTemplateId) => {
//         let { selectedProducts, position, isReminder, selectedSamples, selectedFiles } = this.state
//         let oldSelected = _.findIndex(selectedProducts, {position, IsReminder: isReminder})
//         if(oldSelected > 0) {
//             delete selectedProducts[oldSelected]
//             delete selectedSamples[oldSelected]
//             selectedFiles = _.dropWhile(selectedFiles, ['ProductId', oldSelected])
//         }

//         const product = _.find(this.props.products, ['ProductTemplateId', productTemplateId])
//         selectedProducts[productTemplateId] = {
//             ProductId: product.ProductTemplateId,
//             name: product.ProductTemplateName,
//             DetailingSeconds: 0,
//             IsReminder: this.state.isReminder,
//             position
//         }
//         selectedFiles = _.concat(selectedFiles, product.Files)
//         this.setState({
//             selectedFiles,
//             selectedProducts,
//             selectedProductId: productTemplateId,
//             overlay: false,
//         })
//     }

//     onClickSample = (productId) => {
//         const selectedProduct = _.find(this.props.samples, ['ProductId', productId]);
//         const productTemplate = _.find(this.props.products, ['ProductTemplateId', selectedProduct.ProductTemplateId]);

//         let { selectedSamples } = this.state;

//         selectedSamples[productTemplate.ProductTemplateId] = {
//             IsReminder: this.state.isReminder,
//             ProductId: productId,
//             name: selectedProduct.ProductName,
//             SampleQty: 0,
//             ProductTemplateId: productTemplate.ProductTemplateId
//         }
//         this.setState({
//             selectedSamples
//         }
//         // , () => console.log(this.state.selectedSamples)
//         )
//     }

//     handleOverlayClose = (unselect = false) => {
//         if(unselect) {
//             let selectedSamples = this.state.selectedSamples;
//             const {selectedProductId, reminderPosition} = this.state
//             if(selectedProductId != 0) {
//                 delete selectedSamples[selectedProductId];
//             }
//             this.setState({
//                 selectedSamples,
//                 overlay: false,
//                 selectedProductId: 0,
//             })
//             return;
//         }
//         this.setState({
//             overlay: false,
//             selectedProductId: 0,
//         }
//         // , () => console.log(this.state.selectedProducts, this.state.selectedFiles, this.state.selectedSamples)
//         )
//     }

//     componentWillUnmount() {
//         // this will reside here
//     }

//     setSampleCount = (number, type, productTemplateId) => {
//         let allSamples = this.state.selectedSamples;
//         let sample = allSamples[productTemplateId];
//         sample.SampleQty = number;
//         allSamples[productTemplateId] = sample;
//         this.setState({
//             selectedSamples: allSamples,
//         })
//     }

//     showSamplesOverlay = (selectedProduct, position) => {
//         this.setState({
//             samplesOverlay: true,
//             position,
//             selectedProductId: selectedProduct
//         })
//     }

//     showProductsOverlay = (selectedProduct, position, type = 'planned') => {
//         this.setState({
//             overlay: true,
//             position: position,
//             selectedProductId: selectedProduct,
//             isReminder: type != 'planned'
//         })
//     }

//     hideProductsOverlay = (unselect = false) => {
//         if(unselect) {
//             let { selectedProducts, selectedSamples, selectedProductId, eDetailing, selectedFiles } = this.state
//             const fileIds = _.map(_.filter(this.props.files, file => file.ProductId == selectedProductId), 'DetailingFileId')
//             eDetailing = eDetailing.filter(detail => !fileIds.includes(detail.DetailingFileId))
//             selectedFiles = selectedFiles.filter(file => file.ProductId != selectedProductId)
//             delete selectedProducts[selectedProductId];
//             delete selectedSamples[selectedProductId];
//             return this.setState({
//                 selectedProducts,
//                 selectedSamples,
//                 eDetailing,
//                 selectedFiles,
//                 overlay: false,
//                 position: 0,
//                 selectedProductId: 0,
//                 isReminder: false
//             })
//         }
//         this.setState({
//             overlay: false,
//             position: 0,
//             selectedProductId: 0,
//             isReminder: false
//         })
//     }

//     handleSampleOverlayClose = (unselect = false) => {
//         if(unselect) {
//             let { selectedSamples, selectedProductId } = this.state
//             delete selectedSamples[selectedProductId];
//             this.setState({
//                 selectedSamples,
//                 samplesOverlay: false,
//                 position: 0,
//                 selectedProductId: 0,
//             });
//         }
//         this.setState({
//             samplesOverlay: false,
//             position: 0,
//             selectedProductId: 0,
//         })
//     }

//     onChangeAdditionalInfoAttributes = (field, value) => {
//         let dailyCall = this.state.form_data
//         dailyCall.jsonDailyCall[field] = value
//         this.setState({
//             form_data: dailyCall
//         })
//     }

//     onClickGift = (giftId, number = 0) => {
//         let dailyCall = this.state.form_data
//         const selected = dailyCall.jsonGiftDetail
//         selected[0] = {
//             GiftId: giftId, 
//             GiftQty: number
//         }
//         dailyCall.jsonGiftDetail = selected
//         this.setState({
//             form_data: dailyCall
//         })
//     }

//     showGifts = () => {
//         this.setState({
//             giftsOverlay: true
//         })
//     }

//     hideGifts = (unselect = false) => {
//         if(unselect) {
//             let dailyCall = this.state.form_data;
//             let giftDetail = dailyCall.jsonGiftDetail;
//             giftDetail[0] = {
//                 GiftId: 0,
//                 GiftQty: 0
//             }
//             dailyCall.jsonGiftDetail = giftDetail
//             this.setState({
//                 form_data: dailyCall
//             })
//         }
//         this.setState({
//             giftsOverlay: false
//         })
//     }

//     hideDocInfoPanel = () => {
//         this.setState({
//             showDocInfoPanel: false
//         })
//     }

//     updateDetailingSeconds = (fileId, seconds) => {
//         const { eDetailing } = this.state
//         if(eDetailing[fileId] == undefined) {
//             eDetailing[fileId] = {
//                 DetailingFileId: fileId,
//                 Duration: seconds
//             }
//         } else {
//             eDetailing[fileId].Duration = eDetailing[fileId].Duration == 0
//             ? seconds
//             : eDetailing[fileId].Duration + seconds;
//         }
//         this.setState({
//             eDetailing
//         }
//         // , () => console.log('detailing seconds updated', this.state.eDetailing[fileId])
//         );
//     }


//     initiateCallExecution = () => {
//         if(this.props.isFetching){
//             alert('Unable to capture your location, please try to move, refresh the application or open your location service if it is not.');
//             return;
//         }
//         const { 
//             state: { form_data: { isUpdateRequired } }, 
//             context: { state: { isInternetReachable } }
//          } = this;

//         if(isUpdateRequired === true && isInternetReachable) {
//             this.setState({
//                 showDocInfoPanel: true,
//             })
//             return;
//         }
//         this.submitCall();
//     }

    

//     updateDoctorInfo = (payload, onSuccess, onFailure) => {
//         const { form_data: { jsonDailyCall: { DoctorCode } } } = this.state
//         this.props.updateDoctor({DoctorCode, ...payload}, () => {
//             onSuccess()
//             this.submitCall();
//         }, onFailure)
//     }

//     render() {
//         <CallExecutionContext.Provider value={{ 
//                 state: this.state,
//                 updateDetailingSeconds: this.updateDetailingSeconds,
//                 onChangeAdditionalInfoAttributes: this.onChangeAdditionalInfoAttributes,
//                 setMio: this.setMio,
//                 setDoctor: this.setDoctor,
//                 handleDatePicked: this.handleDatePicked,
//             }}>
//             <ImageBackgroundWrapper>
//                 <CallExecutionButton disabled={this.props.submitLoader} onPress={this.confirmSubmit}/>
//                 {this.props.submitLoader == true && <ScreenLoader /> }
//                 <View style={styles.InputContainer}>
//                     <ScrollView
//                         contentContainerStyle={{justifyContent: 'center', display: 'flex' }}>
//                         <CallPlanHeader />
//                         <View style={{ flex: 1}}>
//                             <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
//                                 <InternetConnectivityStatus />
//                                 <LocationStatus isFetching={this.props.isFetching} />
//                             </View>
//                             <Collapse
//                                 shouldBeCollapsed={true}
//                                 title="Key Call Information"
//                                 Body={<Tab
//                                         navigate={this.props.navigation}
//                                     />}
//                                 HeaderIcon={<FontAwesomeIcon name="info-circle" size={RFValue(40)} color={brandColors.lightGreen} />}
//                             />
//                         </View>

//                     </ScrollView>
//                 </View>
//             </ImageBackgroundWrapper>
//         </CallExecutionContext.Provider>
//     }
// }

// /**
//  * @const function mapStateToProps
//  * @description It will map the redux state to this component
//  * @param {*} state
//  * @returns Object
//  * @memberof CallExecution
//  * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
//  */
// const mapStateToProps = state => {
//     return {
//         products: getProducts(state),
//         samples: getSamples(state),
//         gifts: getGifts(state),
//         user: getUser(state),
//         submit_data: getSubmitData(state),
//         history: getHistorys(state),
//         submitLoader: getSubmitLoader(state),
//         isFetching: isFetching(state),
//         lat: getLat(state),
//         long: getLong(state),
//     }
// }

// /**
//  * @const function mapDispatchToProps
//  * @description It will actionable redux methods to this component
//  * @param {*} dispatch
//  * @returns Object
//  * @memberof CallExecution
//  * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
//  */
// const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(
//       {
//         getTodayCalls: getTodayCalls,
//         submitCallSingle: submitCallSingle,
//         getDocHistory: getDocHistory,
//         submitOfflineCall: submitOfflineCall,
//         getUnplannedCalls: getTodayUnplannedCalls,
//         getAllProducts: getProductsWithSamples,
//         updateDoctor: updateDoctorRequest,
//       },
//       dispatch,
//     ),
//     location: () => Location.requestLocation(dispatch), // this is not to be wrapped into dispatch
// })

// export default connect(mapStateToProps, mapDispatchToProps)(CallExecutionContext)