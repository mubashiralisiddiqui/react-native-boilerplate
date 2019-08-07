/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper, ScreenLoader } from '../../components';
import { navigationOption, authUser, getToken, getStorage, parse } from '../../constants'
import ItemCard from '../../components/Itemcard';
import { getProductsWithSamples } from '../../services/productService'
import { getTodayCalls } from '../../services/callServices'
import { getAllGifts } from '../../services/giftService'
import { connect } from 'react-redux';
import { getCalls, getCallsError, getCallsLoading } from '../../reducers/callsReducers'
import { bindActionCreators } from 'redux'
import { getProducts } from '../../reducers/productsReducer';
import { getUser } from '../../reducers/authReducer';
import { NetworkContext } from '../../components/NetworkProvider';
import CallPlansListHeader from '../../components/CallPlansListHeader';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    static contextType = NetworkContext
    state = {
        fadeAnim: new Animated.Value(0),
        loadingButton: false,
    }
    animate = (duration, easeDuration = 500) => {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: easeDuration,              // Make it take a while
            }
            ).start();
    }
    async componentDidMount() {
        let calls = await getStorage('offlineCalls');
        console.log(parse(calls))
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
        this.context.showRefresh()
    }


    shouldShowLoader = () => {
        return this.props.loading;
    }
    
    onPress = (data) => {
        this.props.navigation.navigate('CallExecution', {
            call_info: data,
            existing_call: true,
        })
    }

    render() {
        return (
            <View style={styles.InputContainer}>
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    { this.shouldShowLoader() ? <ScreenLoader /> : null }
                    <CallPlansListHeader />
                    <Animated.ScrollView showsVerticalScrollIndicator={false} style={{ width: '99%', opacity: this.state.fadeAnim }}>
                        {
                            this.props.calls.map((call, i) => {
                                return (<ItemCard
                                    key={i}
                                    name={`${call.Doctor.DoctorName}`}
                                    category={call.TeamName}
                                    doctorClass={call.Doctor.ClassName}
                                    loading={this.state.loadingButton}
                                    onPressHandler={() => this.onPress(call)}
                                    status={call.IsExecuted}
                                    isOffline={call.IsExecutedOffline && call.IsExecutedOffline}
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
        user: getUser(state),
        
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
