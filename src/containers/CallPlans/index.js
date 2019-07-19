/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper } from '../../components';
import { navigationOption, brandColors, RandomInteger, todayDate, authUser, getToken } from '../../constants'
import ItemCard from '../../components/Itemcard';
import { getCalls, serviceWrapper, getProductsWithSamples } from '../../services';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    state = {
        loading: true,
        fadeAnim: new Animated.Value(0),
        loadingButton: false,
        data: [],
        user: {},
        products: [],
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
        const user = await authUser();
        if(user === null) {
            this.props.navigation.navigate('Login');
        }
        const serviceCallPlans = {
            cache_key: `${user.loginId}-${todayDate()}`,
            call: () => getCalls({
                Token: getToken,
                EmployeeId: user.EmployeeId,
            }),
            sync: false,
        }
        const serviceProductsAndSamples = {
            cache_key: `${user.loginId}-products`,
            call: () => getProductsWithSamples({
                EmployeeId: user.EmployeeId
            }),
            sync: false
        }
        const data  = await serviceWrapper(serviceCallPlans)
        this.setState({ data: data, user: user })
        this.animate(200);
        
        const products = await serviceWrapper(serviceProductsAndSamples)
        this.setState({
            products
        })
    }

    onPress = (data) => this.props.navigation.navigate('CallExecution', {
        call_info: data,
        existing_call: true,
        user: this.state.user,
        products: this.state.products,
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