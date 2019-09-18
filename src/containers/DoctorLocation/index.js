/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors, getToken, styles } from '../../constants'
import { ImageBackgroundWrapper, SearchDoctor, LocationStatus } from '../../components';
import { NetworkContext } from '../../components/NetworkProvider';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/authReducer';
import { bindActionCreators } from 'redux';
import { changeDoctorLocation, getDoctorByEmployeeId } from '../../services/doctor';
import { getDoctorRequestLoader } from '../../reducers/doctorReducer';
import DropDownHolder from '../../classes/Dropdown';
import Location from '../../classes/Location';
import { isFetching, getLat, getLong } from '../../reducers/locationReducer';

class DoctorLocation extends Component {
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Change Doctor Location'))
    
    state = {
        isModalVisible: false,
        form_data: {
            DoctorCode: '',
            DoctorName: '',
            Reason: '',
            CreatedBy: this.props.user.EmployeeId
        },
    }

    setStateVal = (key, value) => {
        let { form_data } = this.state
        form_data[key] = value
        this.setState({ form_data })
    }

    setDoctor = (doctor) => {
        let { form_data } = this.state;
        form_data.DoctorCode = doctor.DoctorCode,
        form_data.DoctorName = doctor.DoctorName

        this.setState({ form_data })
    }

    componentDidMount() {
        // Location.requestLocation();
        console.log(this.props.dispatch)
        this.props.location();

        this.props.getDoctors({
            EmployeeId: this.props.user.EmployeeId
        })

        this.context.hideRefresh()
    }
    async componentWillUnmount() {
        Location.stopLocating();
        this.context.showRefresh();
    }

    onSubmit = () => {
        if(! this.props.isFetching) {
            this.props.changeLocation({ 
                Token: getToken,
                ...this.state.form_data,
                Latitude: this.props.lat,
                Longitude: this.props.long,
            }).then(response => {
                if(response == 1) {
                    this.setStateVal('Reason', '')
                    this.setStateVal('DoctorName', '')
                }
            })
        }
        else {
            DropDownHolder.show('warn', 'Location Fetching', 'We are currently fetching the location, please make sure your device location service is on.')
        }
    }

    render() {
        return (
            <ImageBackgroundWrapper>
            <View style={style.InputContainer}>
                <CallPlanHeader />
                <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <LocationStatus isFetching={this.props.isFetching} />
                </View>
                    <ScrollView contentContainerStyle={{ marginVertical: 15, width: '50%', justifyContent: 'center', alignSelf: 'center'}}>
                        <SearchDoctor location={true} setDoctor={this.setDoctor} name={ this.state.form_data.DoctorName }/>
                        {
                            this.state.form_data.DoctorName !== '' &&
                            <Input labelStyle={styles.labelStyle} label="Reason" value={this.state.form_data.Reason} onChangeText={(text) => this.setStateVal('Reason', text) } placeholder="Why do you wish to change location?" numberOfLines={2}/>
                        }
                        {
                            this.state.form_data.Reason !== '' &&
                            <Button
                                loading={this.props.loading}
                                disabled={this.props.loading}
                                onPress={this.onSubmit}
                                buttonStyle={{backgroundColor: brandColors.lightGreen,
                                    borderWidth: 2,
                                    borderRadius: 33,
                                    borderColor: brandColors.lightGreen,
                                    width: '100%'}}
                                containerStyle={{flex: 1,
                                    marginVertical: 15,
                                    alignItems: 'center',
                                    width: '100%'}}
                                titleStyle={{
                                    color: '#fff',
                                    fontFamily: 'Lato-HeavyItalic'
                                }}
                                title="Submit"
                            />
                        }
                    </ScrollView>

            </View>
            </ImageBackgroundWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: getUser(state),
        loading: getDoctorRequestLoader(state),
        isFetching: isFetching(state),
        lat: getLat(state),
        long: getLong(state),
    }
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
      {
        changeLocation: changeDoctorLocation,
        getDoctors: getDoctorByEmployeeId,
      },
      dispatch,
    ),
    location: () => Location.requestLocation(dispatch), // this is not to be wrapped into dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorLocation)

const style = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        width: '100%',
    }
}