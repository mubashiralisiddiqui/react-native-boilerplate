/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView, PermissionsAndroid } from 'react-native'
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

class DoctorLocation extends Component {
    state = {
        isModalVisible: false,
        form_data: {
            DoctorCode: '',
            DoctorName: '',
            Reason: '',
            Latitude: '',
            Longitude: '',
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
    /**
     * @name requestLocationPermission
     * @async
     * @function
     * @description Gather the Latitude and Longitude of the current position of user and sets the value to state accordingly
     * @this CallExecution
     * @memberof CallExecution
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
            )

            granted === PermissionsAndroid.RESULTS.GRANTED
            ? this.callLocation()
            : alert('You must allow this app to access your location. Would you like to')

        } catch (err) {
            alert("err",err);
            console.warn(err)
        }
    }
    callLocation(){
        navigator.geolocation.getCurrentPosition(
        //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                let { form_data } = this.state
                form_data.Latitude = currentLatitude
                form_data.Longitude = currentLongitude
                this.setState({ form_data }, () => console.log(this.state));
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
            );
            this.watchID = navigator.geolocation.watchPosition((position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                let { form_data } = this.state
                form_data.Latitude = currentLatitude
                form_data.Longitude = currentLongitude
                this.setState({ form_data }, () => console.log(this.state));
        });
    }
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Change Doctor Location'))

    componentDidMount() {
        this.requestLocationPermission();
        this.props.getDoctors({
            EmployeeId: this.props.user.EmployeeId
        })
        this.context.hideRefresh()
    }
    async componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        this.context.showRefresh();
    }

    onSubmit = () => {
        if(this.state.form_data.Latitude != '' && this.state.form_data.Longitude != '') {
            this.props.changeLocation({ Token: getToken, ...this.state.form_data}).then(response => {
                if(response == 1) {
                    this.setStateVal('Reason', '')
                    this.setStateVal('DoctorName', '')
                }
            })
        }
        else {
            DropDownHolder.show('warning', 'Location Fetching', 'We are currently fetching the location, please make sure your device location service is on.')
        }
    }

    render() {
        return (
            <ImageBackgroundWrapper>
            <View style={style.InputContainer}>
                <CallPlanHeader />
                <View style={{width: '100%', height: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <LocationStatus isFetching={(this.state.form_data.Latitude == '' && this.state.form_data.Longitude == '')} />
                </View>
                    <ScrollView contentContainerStyle={{ marginVertical: 15, width: '50%', justifyContent: 'center', alignSelf: 'center'}}>
                        <SearchDoctor setDoctor={this.setDoctor} name={ this.state.form_data.DoctorName }/>
                        {
                            this.state.form_data.DoctorName !== ''
                            ? <Input labelStyle={styles.labelStyle} label="Reason" value={this.state.form_data.Reason} onChangeText={(text) => this.setStateVal('Reason', text) } placeholder="Why do you wish to change location?" numberOfLines={2}/>
                            : null
                        }
                        {
                            this.state.form_data.Reason !== ''
                            ? <Button
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
                                title="Submit" />
                            : null
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
        loading: getDoctorRequestLoader(state)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeLocation: changeDoctorLocation,
    getDoctors: getDoctorByEmployeeId,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DoctorLocation)

const style = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        width: '100%',

    }
}