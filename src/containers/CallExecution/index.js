/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native'
import { Divider } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, log } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Collapse, KeyCallInfo, AdditionalInfo, DoctorHistory, ImageBackgroundWrapper } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDocHistory } from '../../services';

export default class CallExecution extends Component {
    constructor(props) {
        super(props)
        let height = Dimensions.get('screen').height;
        this.state = {
            isKeyInfoCollapsed: false,
            isAdditionalInfoCollapsed: false,
            isDocHistoryCollapsed: false,
            buttonPositionFromTop: height,
            existingCall: false,
            doctor_history: [],
        }

    }

    onToggle = (section) => {
        Object.keys(this.state).map((value, key) => {
            if(value !== section) this.setState({ [value]: false })
        })
        this.setState({[section]: !this.state[section]})
    }
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Call Details'))
    getOrientation = () => {
        const { width, height } = Dimensions.get('window');
        if(width < height) {
            this.setState({
                buttonPositionFromTop: parseInt(height / 1.2)
            })
            return;
        }
        this.setState({
            buttonPositionFromTop: parseInt(height / 1.4)
        })
    }
 
    async componentDidMount() {
        console.log(123);
        const history = await getDocHistory({
            DoctorCode: 24081,
            EmployeeId: 1,
        })
        this.setState({
            doctor_history: history,
            existing_call: this.props.navigation.getParam('existing_call', false)
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
                    <Icon2 style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: brandColors.green,
                            position: 'absolute',
                            top: 900,
                            right: 80,
                            zIndex: 1000
                            }}
                        name="grain" color={brandColors.darkBrown} size={50}
                    ></Icon2>
                    <KeyboardAwareScrollView
                    contentContainerStyle={{justifyContent: 'center', display: 'flex' }}>
                        <CallPlanHeader />
                        <Divider/>
                        <View style={{ flex: 1 }}>
                            <Collapse
                                isCollapsed={isKeyInfoCollapsed}
                                toggler={() => this.onToggle('isKeyInfoCollapsed')}
                                title="Key Call Information"
                                Body={<KeyCallInfo navigate={this.props.navigation}  />}  
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
}