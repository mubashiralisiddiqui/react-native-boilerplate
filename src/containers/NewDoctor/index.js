/**
 * @file Container component that creates the request for new doctor.
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
import React, { Component } from 'react';
import { CallPlanHeader } from '../../components/Headers';
import { NewDoctorForm, ImageBackgroundWrapper } from '../../components';
import { View, Animated, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { navigationOption, brandColors, stringify, validate } from '../../constants';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getDoctorRequestLoader } from '../../reducers/doctorReducer';
import { getUser } from '../../reducers/authReducer';
import { NetworkContext } from '../../components/NetworkProvider'
import { createDoctorRequest } from '../../services/doctor';
import { newDoctor } from '../../defaults'

/**
 * @class NewDoctor
 * @classdesc This is a container class that handles the new doctor request
 * @extends {Component}
 * 
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
class NewDoctor extends Component {

    /**
     * @name contextType
     * @static
     * @memberof NewDoctor
     */
    static contextType = NetworkContext
    /**
     * @name navigationOptions
     * @static
     * @memberof NewDoctor
     */
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Add New Doctor'))
    state = {
        ...newDoctor,
        CityId: '',
        CityName: '',
        CreatedBy: 0,
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


    /**
     * @name onSubmit
     * @function
     * @async
     * @description It is responsible for validating the data, composing the page load and submit API request
     * @this Component
     * @returns { void }
     * @memberof NewDoctor
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
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
                    ...newDoctor
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

    /**
     * @name setField
     * @function
     * @description generalize method that sets the component state with dynamic key and value pair
     * @param { string } field - key that needs to be set in state object
     * @param { string } value - value that needs to be set agains the provided field
     * @returns { void }
     * @this Component
     * @memberof NewDoctor
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    setField = (field, value) => {
        let errors = this.state.errors;
        errors[field] = value != '' ? '' : `${field} is required`
        this.setState({
            [field]: value,
            errors: errors,
        })
    }

    /**
     * @name styles
     * @function
     * @description it returns the styling object for the component
     * @returns { Object }
     * @memberof NewDoctor
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
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

    /**
     * @name componentDidMount
     * @description This method will be called as soon as the component gets mounted
     * @returns {void}
     * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
     * @memberof NewDoctor
     */
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
        this.context.hideRefresh()

    }

    /**
     * @name render
     * @description renders the layout of the screen for New Doctor
     * @this NewDoctor
     * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
     * @returns { void }
     * @memberof NewDoctor
     */
    render() {
        const { styles } = this.styles();
        return (
            <Animated.View style={{...styles.container, opacity: this.state.fadeAnim}}>
                <ImageBackgroundWrapper>
                    <ScrollView
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <CallPlanHeader />
                        <View style={{width: '85%', display: 'flex', alignSelf: 'center'}}>
                            <NewDoctorForm
                                data={this.state}
                                setField={this.setField}
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
                    </ScrollView>
                </ImageBackgroundWrapper>
            </Animated.View>
        )
    }
}

/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof NewDoctor
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        loading: getDoctorRequestLoader(state),
        user: getUser(state)
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof NewDoctor
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    createDoctor: createDoctorRequest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewDoctor)
