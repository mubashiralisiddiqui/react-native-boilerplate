import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CallPlanHeader } from '../../components/Headers';
import { NewDoctorForm, ImageBackgroundWrapper } from '../../components';
import { View, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { navigationOption, brandColors, stringify, validate } from '../../constants';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getDoctorRequestLoader, getDesignations, getSpecialities } from '../../reducers/doctorReducer';
import { getCities } from '../../reducers/cityReducer';
import { getUser } from '../../reducers/authReducer';
import { NetworkContext } from '../../components/NetworkProvider'
import { createDoctorRequest } from '../../services/doctor';
import { newDoctor } from '../../defaults'

class NewDoctor extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Add New Doctor'))
    state = {
        ...newDoctor,
        createdBy: 0,
        validations: {
            DoctorName: {
                required: true,
            },
            Designation: {
                required: true,
            },
            Speciality: {
                required: true,
            },
            CityId: {
                required: true,
            },
            Email: {
                required_if: [ 'Phone', '' ],
                email: true,
            },
            Phone: {
                required_if: ['Email', ''],
            }
        },
        errors: {
            DoctorName: '',
            Designation: '',
            Speciality: '',
            CityId: '',
            Email: '',
            Phone: '',
        },
        fadeAnim: new Animated.Value(0)
    }

    static contextType = NetworkContext

    onSubmit = async () => {
        const payload = _.omit(this.state, ['errors', 'fadeAnim', 'validations']);
        const [errors, shouldSubmit] = validate(this.state.validations, payload);
        this.setState({
            errors,
        })
        if(shouldSubmit) {
            const response = await this.props.createDoctor({DoctorRequest: stringify(payload)});
            if(response == 1) {
                this.setState({
                    ...newDoctor,
                })
            }
            if(response == -1) {
                let errors = this.state.errors;
                errors.Phone = 'This phone number already exists'
                this.setState({
                    errors,
                })
            }
        }
    }

    setField = (field, value) => {
        let errors = this.state.errors;
        errors[field] = value != '' ? '' : `${field} is required`
        this.setState({
            [field]: value,
            errors: errors,
        })
    }
    styles = ()  => {
        return {
            styles: {
                container: {
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                },
                scrollContainer: {
                    width: '100%',
                    // maxHeight: 550,
                },
                buttonContainer: {
                    width: '100%'
                },
                button: {
                    backgroundColor: brandColors.lightGreen,
                    borderWidth: 2,
                    borderRadius: 33,
                    borderColor: brandColors.lightGreen,
                    width: '100%'
                },
                buttonContainer: {
                    flex: 1,
                    marginVertical: 15,
                    alignItems: 'center',
                    width: '100%'
                },
                buttonTitle: {
                    color: '#fff',
                }
            }
        }
    }

    onPressSelection = (type, Id) => {
        this.setState({
            [type]: Id
        })
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 2000,              // Make it take a while
            }
        ).start();
        this.setState({
            CreatedBy: this.props.user.EmployeeId
        })

    }
    render() {
        const { styles } = this.styles();
        return (
            <Animated.View style={{...styles.container, opacity: this.state.fadeAnim}}>
                <ImageBackgroundWrapper>
                    <KeyboardAwareScrollView
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <CallPlanHeader />
                        <View style={{width: '85%', display: 'flex', alignSelf: 'center'}}>
                            <NewDoctorForm
                                data={this.state}
                                setField={this.setField}
                                designations={this.props.desgnations}
                                specialities={this.props.specialities}
                                onPressSelection={this.onPressSelection}
                                cities={this.props.cities}
                            />
                            <View style={{width: '100%', display: 'flex', flex:1, justifyContent:'flex-end' }}>
                                <Button
                                    loading={this.props.loading}
                                    disabled={this.props.loading}
                                    onPress={this.onSubmit}
                                    buttonStyle={styles.button}
                                    containerStyle={styles.buttonContainer}
                                    titleStyle={styles.buttonTitle}
                                    title="Add" />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackgroundWrapper>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: getDoctorRequestLoader(state),
        desgnations: getDesignations(state),
        specialities: getSpecialities(state),        
        cities: getCities(state),
        user: getUser(state)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createDoctor: createDoctorRequest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewDoctor)
