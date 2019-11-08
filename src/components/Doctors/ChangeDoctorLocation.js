/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { CallPlanHeader } from '../Headers'
import { navigationOption, brandColors, getToken, styles, validate } from '../../constants'
import { ImageBackgroundWrapper, SearchDoctor, LocationStatus } from '..';
import { NetworkContext } from '../NetworkProvider';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/authReducer';
import { bindActionCreators } from 'redux';
import { changeDoctorLocation, getDoctorByEmployeeId } from '../../services/doctor';
import { getDoctorRequestLoader } from '../../reducers/doctorReducer';
import Location from '../../classes/Location';
import { isFetching, getLat, getLong } from '../../reducers/locationReducer';
import LinearGradient from 'react-native-linear-gradient';

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
        validations: {
            DoctorCode: {
                required: true,
            },
            Reason: {
                required: true,
                length: {
                    min: 3,
                    max: 150,
                }
            }
        },
        errors: {
            DoctorCode: '',
            Reason: ''
        }
    }

    setStateVal = (key, value) => {
        let { form_data, errors } = this.state
        form_data[key] = value
        errors[key] = ''
        this.setState({ form_data, errors })
    }

    setDoctor = (doctor) => {
        let { form_data, errors } = this.state;
        form_data.DoctorCode = doctor.DoctorCode,
        form_data.DoctorName = doctor.DoctorName
        errors.DoctorCode = ''
        this.setState({ form_data, errors })
    }

    componentDidMount() {
        this.props.location();

        this.props.getDoctors({
            EmployeeId: this.props.user.EmployeeId
        })
    }
    async componentWillUnmount() {
        Location.stopLocating();
    }

    onSubmit = () => {
        const [errors, shouldSubmit] = validate(this.state.validations, this.state.form_data);
        if(! this.props.isFetching && shouldSubmit) {
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
            this.setState({errors})
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
                    <ScrollView contentContainerStyle={{ marginVertical: 15, width: '60%', justifyContent: 'center', alignSelf: 'center'}}>
                        <SearchDoctor errors={this.state.errors} location={true} setDoctor={this.setDoctor} name={ this.state.form_data.DoctorName }/>
                        <Input errorMessage={this.state.errors.Reason && this.state.errors.Reason } labelStyle={styles.labelStyle} label="Reason" value={this.state.form_data.Reason} onChangeText={(text) => this.setStateVal('Reason', text) } placeholder="Why do you wish to change location?" numberOfLines={2}/>
                        <Button
                            ViewComponent={LinearGradient}
                            linearGradientProps={(this.props.loading || this.props.isFetching) ? brandColors.linearGradientDisabledSettings : brandColors.linearGradientSettings}
                            loading={this.props.loading}
                            disabled={this.props.loading || this.props.isFetching}
                            onPress={this.onSubmit}
                            buttonStyle={{backgroundColor: brandColors.lightGreen,
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