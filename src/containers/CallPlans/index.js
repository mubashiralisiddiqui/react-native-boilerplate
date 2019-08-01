/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper } from '../../components';
import { navigationOption, brandColors, todayDate, authUser, getToken } from '../../constants'
import ItemCard from '../../components/Itemcard';
import { getProductsWithSamples } from '../../services/productService'
import { getTodayCalls } from '../../services/callServices'
import { getAllGifts } from '../../services/giftService'
import { connect } from 'react-redux';
import { getCalls, getCallsError, getCallsLoading } from '../../reducers/callsReducers'
import { bindActionCreators } from 'redux'
import { getProducts } from '../../reducers/productsReducer';
import { getUser } from '../../reducers/authReducer';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    state = {
        // loading: true,
        fadeAnim: new Animated.Value(0),
        loadingButton: false,
        data: [],
        // calls: [],
        user: {},
        products: [],
        // error: null,
    }
    animate = (duration, easeDuration = 1000) => {
        setTimeout(() => {
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
        const user = await this.props.getAuthUser();
        
        this.props.getTodayCalls({
            Token: getToken,
            EmployeeId: user.EmployeeId,
        });
        this.props.getProductsWithSamples({
            Token: getToken,
            EmployeeId: user.EmployeeId
        })
        this.props.getAllGifts();
        
        this.animate(200);
        console.log(this.props, user)
        }
        shouldComponentRender = () => {
            const { loading } = this.props.calls;
            return !loading;
        }
        
        onPress = (data) => {
            this.props.navigation.navigate('CallExecution', {
                call_info: data,
                existing_call: true,
                products: this.state.products,
        })
    }

    render() {
        // if(this.shouldComponentRender())
        return (
            <View style={styles.InputContainer}>
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    {
                        !this.shouldComponentRender()
                            ? <ActivityIndicator size={45} color={brandColors.lightGreen} />
                            : null
                    }
                    <Animated.ScrollView showsVerticalScrollIndicator={false} style={{ width: '99%', opacity: this.state.fadeAnim }}>
                        {
                            this.props.calls.calls.map((call, i) => {
                                return (<ItemCard
                                    key={i}
                                    name={call.Doctor.DoctorName}
                                    category={call.TeamName}
                                    doctorClass={call.Doctor.ClassName}
                                    loading={this.state.loadingButton}
                                    onPressHandler={() => this.onPress(call)}
                                    status={call.IsExecuted}
                                />)
                            })
                        }
                    </Animated.ScrollView>
                </ImageBackgroundWrapper>
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        error: getCallsError(state),
        loading: getCallsLoading(state),
        calls: getCalls(state),
        products: getProducts(state),
        user: getUser(state)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayCalls: getTodayCalls,
    getProductsWithSamples: getProductsWithSamples,
    getAllGifts: getAllGifts,
    getAuthUser: authUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CallPlans)

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f1eee9',
        alignItems: 'center'
    }

}
