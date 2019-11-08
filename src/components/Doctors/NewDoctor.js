/**
 * @file Container component that creates the request for new doctor.
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
import React, { Component } from 'react';
import { NewDoctorForm } from '..';
import { View, Animated, ScrollView, Easing, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { navigationOption, brandColors, stringify, validate } from '../../constants';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getDoctorRequestLoader } from '../../reducers/doctorReducer';
import { getUser } from '../../reducers/authReducer';
import { NetworkContext } from '../../components/NetworkProvider'
import { createDoctorRequest } from './services';
import { newDoctor } from '../../defaults'
import LinearGradient from 'react-native-linear-gradient';

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
    animated = new Animated.Value(0);
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
                length: {
                    min: 11,
                    max: 11,
                },
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
                    // borderWidth: 2,
                    borderRadius: 33,
                    borderColor: brandColors.lightGreen,
                    width: '75%'
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
        setTimeout(() => {
            Animated.timing(                  // Animate over time
                this.animated,            // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: 800,
                    easing: Easing.inOut(Easing.ease)
                }
            ).start();
        }, 500)
        this.setState({
            CreatedBy: this.props.user.EmployeeId
        })

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

        const { height } = Dimensions.get('window')

        const translateY = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        })

        return (
            <View style={styles.container}>
                {/* <ImageBackgroundWrapper> */}
                    <ScrollView
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <Animated.View style={{width: '85%', display: 'flex', alignSelf: 'center', transform: [{ translateY }] }}>
                            <NewDoctorForm
                                data={this.state}
                                setField={this.setField}
                            />
                            <View style={{width: '100%', display: 'flex', flex:1, justifyContent:'flex-end' }}>
                                <Button
                                    ViewComponent={LinearGradient}
                                    linearGradientProps={this.props.loading ? brandColors.linearGradientDisabledSettings : brandColors.linearGradientSettings}
                                    loading={this.props.loading}
                                    disabled={this.props.loading}
                                    onPress={this.onSubmit}
                                    buttonStyle={styles.button}
                                    containerStyle={styles.buttonContainer}
                                    titleStyle={styles.buttonTitle}
                                    title="Add" />
                            </View>
                        </Animated.View>
                    </ScrollView>
                {/* </ImageBackgroundWrapper> */}
            </View>
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
