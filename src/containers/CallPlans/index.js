/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper } from '../../components';
import { navigationOption, brandColors, RandomInteger, todayDate } from '../../constants'
import ItemCard from '../../components/Itemcard';
import { getCalls, serviceWrapper } from '../../services';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    state = {
        loading: true,
        fadeAnim: new Animated.Value(0),
        loadingButton: false,
        data: []
    }
    animate = (duration, easeDuration = 2000) => {
        setTimeout(() => {
            this.setState({ loading: false})
            Animated.timing(                  // Animate over time
                this.state.fadeAnim,            // The animated value to drive
                {
                  toValue: 1,                   // Animate to opacity: 1 (opaque)
                  duration: easeDuration,              // Make it take a while
                }
              ).start();
        }, duration)
    }
    async componentDidMount() {
        const service = {
            cache_key: todayDate(),
            call: () => getCalls(),
        }
        const data  = await serviceWrapper(service)
        this.setState({ data: data })
        this.animate(200);    
    }

    onPress = (data) => this.props.navigation.navigate('CallExecution', {
        call_info: data,
        existing_call: true,
    })

    render() {
        const { data } = this.state;
        return (
            <View style={styles.InputContainer}>
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    {
                        this.state.loading
                            ? <ActivityIndicator size={45} color={brandColors.lightGreen} />
                            : null
                    }
                    <Animated.ScrollView showsVerticalScrollIndicator={false} style={{ width: '99%', opacity: this.state.fadeAnim }}>
                        {
                            data.map((call, i) => {
                                return (<ItemCard
                                    key={i}
                                    name={call.Doctor.DoctorName}
                                    category={call.TeamName}
                                    doctorClass={call.Doctor.ClassName}
                                    loading={this.state.loadingButton}
                                    onPressHandler={() => this.onPress(call)}
                                />)
                            })
                        }
                    </Animated.ScrollView>
                </ImageBackgroundWrapper>
            </View >
        )
    }
}
export default CallPlans

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f1eee9',
        alignItems: 'center'
    }

}