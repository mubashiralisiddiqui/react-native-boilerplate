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
        DoctorName: '',
        DoctorAddress: '',
        DoctorEmail: '',
        DoctorPhone: '',
        DoctorDesignation: '',
        DoctorSpeciality: '',
        fadeAnim: new Animated.Value(0)
    }

    setField = (field, value) => {
        this.setState({
            [field]: value
        }, () => console.log(this.state))
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

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 2000,              // Make it take a while
            }
        ).start();
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
                            />
                            <View style={{width: '100%', display: 'flex', flex:1, justifyContent:'flex-end' }}>
                                <Button
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

