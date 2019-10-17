import React, { PureComponent } from 'react'
import { getAppRefreshingStatus } from '../../reducers/appReducer';
import { Button } from 'react-native-elements';
import { brandColors, RFValue, authUser, getToken } from '../../constants';
import { FontAwesomeIcon } from '../Icons';
import { getUser, isRSM } from '../../reducers/authReducer';
import { getTodayCalls, updatedCalls, getTodayUnplannedCalls } from '../../services/callServices';
import { getProductsWithSamples } from '../../services/productService';
import { getAllGifts } from '../../services/giftService';
import { getAllCities } from '../../services/city';
import { getAllDesignations, getAllSpecialities, getDoctorByEmployeeId } from '../../services/doctor';
import { getEmployees } from '../../services/auth';
import { connect } from 'react-redux';
import DropDownHolder from '../../classes/Dropdown';
import { alertData } from '../../constants/messages';
import { bindActionCreators } from 'redux'

class RefreshApp extends PureComponent {
    
    state = {
        isRefreshing: false,
    }

    syncApp = () => {
        this.setState({
            isRefreshing: true,
        })
        const payload = {
            Token: getToken,
            EmployeeId: this.props.user.EmployeeId
        }
        DropDownHolder.show(alertData.refresh.init)
        Promise.all([
            this.props.getTodayCalls(payload, true),
            this.props.getProductsWithSamples(payload, true),
            this.props.getAllGifts({}, true),
            this.props.getCities(true),
            this.props.getDesignations(true),
            this.props.getSpecialities(true),
            this.props.getUnplannedCalls(payload, true),
            this.props.isRSM
            ? this.props.getReportingEmployees(payload, true)
            : this.props.getDoctorsByEmployee(payload, true)
        ]).then(response => {
            DropDownHolder.show(alertData.refresh.success)
            this.setState({
                isRefreshing: false,
            })
        })
    }

    render() {
        const { isRefreshing } = this.state;

        return (
            <Button
                containerStyle={{
                    position: 'absolute',
                    right: RFValue(10),
                    top: 0,
                    zIndex: 1000000

                }}
                loading={isRefreshing}
                loadingProps={{ color: brandColors.lightGreen }}
                type="clear"
                title="Refresh"
                onPress={this.syncApp}
                titleStyle={{color: brandColors.lightGreen, fontSize: RFValue(14)}}
                icon={<FontAwesomeIcon name="refresh" size={RFValue(18)} color={brandColors.lightGreen} />}
            />
        );
    }
}
// const Refresh = () => {
//     console.log(234)
//     const isRefreshing = useSelector(getAppRefreshingStatus);
//     return (
//         <Button
//             containerStyle={{
//                 position: 'absolute',
//                 right: RFValue(10),
//                 top: 0,
//                 zIndex: 1000000
//             }}
//             loading={isRefreshing}
//             loadingProps={{ color: brandColors.lightGreen }}
//             type="clear"
//             title="Refresh"
//             onPress={this.SyncApp}
//             titleStyle={{color: brandColors.lightGreen, fontSize: RFValue(14)}}
//             icon={<FontAwesomeIcon name="refresh" size={RFValue(18)} color={brandColors.lightGreen} />}
//         />
//     );
// }

const mapStateToProps = state => {
    return {
        user: getUser(state),
        isRSM: isRSM(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getTodayCalls: getTodayCalls,
    getProductsWithSamples: getProductsWithSamples,
    getAllGifts: getAllGifts,
    getAuthUser: authUser,
    updateCalls: updatedCalls,
    getCities: getAllCities,
    getDesignations: getAllDesignations,
    getSpecialities: getAllSpecialities,
    getDoctorsByEmployee: getDoctorByEmployeeId,
    getReportingEmployees: getEmployees,
    getUnplannedCalls: getTodayUnplannedCalls,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RefreshApp)