import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CallPlanHeader } from '../../components/Headers';
import { NewDoctorForm, ImageBackgroundWrapper } from '../../components';
import { View, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { navigationOption, brandColors } from '../../constants';

export default class NewDoctor extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Add New Doctor'))
    state = {
        name: '',
        gender: 'male',
        address: '',
        address2: '',
        city: '',
        country: '',
        mobile_number: '',
        mobile_number2: '',
        designation: '',
        speciality: '',
        qualification: '',
        class: '',
        frequency: '',
        fadeAnim: new Animated.Value(0)
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
                    width: '90%',
                    maxHeight: 550,
                },
                buttonContainer: {
                    width: '100%'
                },
                button: {
                    backgroundColor: brandColors.lightGreen,
                    borderWidth: 2,
                    borderRadius: 33,
                    borderColor: brandColors.lightGreen,
                },
                buttonContainer: {
                    padding: 15,
                },
                buttonTitle: {
                    color: '#fff',
                }
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Animated.timing(                  // Animate over time
                this.state.fadeAnim,            // The animated value to drive
                {
                  toValue: 1,                   // Animate to opacity: 1 (opaque)
                  duration: 2000,              // Make it take a while
                }
              ).start();
        }, 500)
    }
    render() {
        const { styles } = this.styles();
        return (
            <ImageBackgroundWrapper>
                <Animated.View style={{...styles.container, opacity: this.state.fadeAnim}}>
                    <CallPlanHeader />
                    <KeyboardAwareScrollView
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <NewDoctorForm />
                    </KeyboardAwareScrollView>
                    <View style={{width: '90%' }}>
                        <Button
                            buttonStyle={styles.button}
                            containerStyle={styles.buttonContainer}
                            titleStyle={styles.buttonTitle}
                            title="Add" />
                    </View>
                </Animated.View>
            </ImageBackgroundWrapper>
        )
    }
}

