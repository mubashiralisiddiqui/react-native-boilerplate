/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper, ScreenLoader } from '../../components';
import { navigationOption, authUser, getToken } from '../../constants'
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
import { getAllDesignations, getAllSpecialities } from '../../services/doctor';
import { getAllCities } from '../../services/city';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    static contextType = NetworkContext
    state = {
        loadingButton: false,
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
        this.props.getDesignations();
        this.props.getSpecialities();
        this.props.getCities();
        
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
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '99%' }}>
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
                    </ScrollView>
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
    getDesignations: getAllDesignations,
    getSpecialities: getAllSpecialities,
    getCities: getAllCities,
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
