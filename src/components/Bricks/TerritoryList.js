import React, { Component } from 'react'
import { RandomInteger } from '../../constants'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler'
import { getBricksLoading, getBricks } from './reducer';
import { getUser } from '../../reducers/authReducer';
import { getAllBricks } from './services';
import TerritoryListItem from './TerritoryListItem';
import { NoItemsInTheList } from '..';


class TerritoryList extends Component {

    state = {
        selectedBrickId: 0,
    }

    toggleManagementView = () => {
        this.setState(state => {
            return {
                isManaging: !state.isManaging
            }
        })
    }

    selectBrickId = (id) => {
        this.setState({
            selectedBrickId: id
        })
    }

    componentDidMount() {
        this.props.getBricks({
            EmployeeId: this.props.user.EmployeeId
        });
    }

    render() {
        const { bricks, onAdd } = this.props
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center'}}>
            {
                Object.keys(bricks).map(brick => (
                    <TerritoryListItem
                        onAddData={onAdd}
                        showTerritorySelection={this.toggleManagementView}
                        key={RandomInteger()}
                        bricks={bricks[brick]}
                        territory={bricks[brick][0]}
                    />
                ))
            }
            </ScrollView>
        )
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
        bricks: getBricks(state),
        user: getUser(state),
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
    getBricks: getAllBricks,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TerritoryList)