import React, { Component, createContext } from 'react';
import { ImageBackgroundWrapper, TerritoryList, ScreenLoader, ReviewChangesButton, ReviewChangesOverlay, PendingRequestButton, PendingRequestsOverlay } from '..';
import { CallPlanHeader } from '../Headers';
import { navigationOption, getToken, stringify } from '../../constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBricksLoading, getRequestedMappings } from './reducer';
import { requestBrickMap, getAllRequestedMappings } from './services';
import { getUser } from '../../reducers/authReducer';


export const BricksContext = createContext({
    data: [],
});


class Bricks extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Territory Manager'))

    state = {
        data: [],
        toggleReview: false,
        togglePendingRequests: false,
    }

    addData = (brick, changeType, territory = null) => {
        const { data } = this.state;
        data.push({
            BrickId: brick.BrickId,
            BrickName: brick.BrickName,
            BrickCode: brick.BrickCode,
            TerritoryCode: _.isNull(territory) ? brick.TerritoryCode : territory.TerritoryCode,
            TerritoryId: _.isNull(territory) ? brick.TerritoryId : territory.TerritoryId,
            IsAddition: changeType,
        })
        this.setState({ data })
    }
    
    removeData = (index) => {
        let { data } = this.state;
        delete data[index];
        data = data.filter(a => a !== undefined)
        this.setState({ 
            data,
        })
    }

    onPressReviewChangesButton = () => {
        const { toggleReview } = this.state
        this.setState({
            toggleReview: !toggleReview
        })
    }

    requestBrickMapping = () => {
        const payload = {
            EmployeeId: this.props.user.EmployeeId,
            Token: getToken,
            json: stringify(this.state.data),
        }
        this.props.requestMapping(payload, () => {
            this.setState({
                data: [],
                toggleReview: false,
            })
        });

    }

    onPressPendingRequest = () => {
        const { togglePendingRequests } = this.state
        this.setState({
            togglePendingRequests: !togglePendingRequests
        })
    }

    componentDidMount() {
        this.props.getRequested({
            Token: getToken,
            EmployeeId: this.props.user.EmployeeId
        })
    }

    render() {
        const { 
            props: {
                requestedMappings,
            },
            state: {
                data,
                toggleReview,
                togglePendingRequests,
            },
            addData,
            removeData,
        } = this;
        return (
            <BricksContext.Provider value={{ state: this.state }}>
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    { data.length > 0 && <ReviewChangesButton onPress={this.onPressReviewChangesButton}/> }
                    { requestedMappings.length > 0 && <PendingRequestButton onPress={this.onPressPendingRequest}/> }
                    { this.props.loading && <ScreenLoader />}
                    <TerritoryList onAdd={addData} />
                </ImageBackgroundWrapper>
                <ReviewChangesOverlay onPressSubmit={this.requestBrickMapping} onPressRemove={removeData} visible={toggleReview} toggleVisibility={this.onPressReviewChangesButton} />
                <PendingRequestsOverlay visible={togglePendingRequests} toggleVisibility={this.onPressPendingRequest} />
            </BricksContext.Provider>
        );
    }
}

/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof CallPlans
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        loading: getBricksLoading(state),
        user: getUser(state),
        requestedMappings: getRequestedMappings(state),
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof CallPlans
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    requestMapping: requestBrickMap,
    getRequested: getAllRequestedMappings,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bricks)