/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView, PermissionsAndroid } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption, brandColors } from '../../constants'
import { ImageBackgroundWrapper, SearchDoctor } from '../../components';
import { NetworkContext } from '../../components/NetworkProvider';

export default class DoctorLocation extends Component {
    state = {
        isModalVisible: false,
        DoctorCode: '',
        DoctorName: '',
        Reason: '',
        lat: '',
        loong: '',
    }

    setStateVal = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    setDoctor = (doctor) => {
        this.setState({
            DoctorCode: doctor.DoctorCode,
            DoctorName: doctor.DoctorName
        })
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
                this.setState({ lat: currentLatitude, long: currentLongitude });
                },
                (error) => console.log(error),
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ lat: currentLatitude, long: currentLongitude });
        });
    }
    static contextType = NetworkContext
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Change Doctor Location'))

    componentDidMount() {

        // this.permision();
    }
    async componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        this.context.showRefresh();
    }

    render() {
        return (
            <ImageBackgroundWrapper>
            <View style={styles.InputContainer}>
                <CallPlanHeader />
                    <ScrollView contentContainerStyle={{ marginVertical: 15, width: '50%', justifyContent: 'center', alignSelf: 'center'}}>
                        <SearchDoctor setDoctor={this.setDoctor} name={ this.state.DoctorName }/>
                        {
                            this.state.DoctorName !== ''
                            ? <Input label="Reason" value={this.state.Reason} onChangeText={(text) => this.setStateVal('Reason', text) } placeholder="Why do you wish to change location?" numberOfLines={2}/>
                            : null
                        }
                        {
                            this.state.Reason !== ''
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

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        width: '100%',

    }
}