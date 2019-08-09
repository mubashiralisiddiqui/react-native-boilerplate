import moment from 'moment';
import { getToken, todayDate } from '../constants';

export const keyCallInfo = {
    Doctor: {
        DoctorName: '',
        DoctorAddress: '',
    },
    VisitEnd: '',
    VisitStart: '',
    Reason: '',
    user: {
        FirstName: '',
        MiddleName: '',
        LastName: '',
    },
}

export const callExecution = {
    jsonDailyCall: {
        DoctorCode: 0,
        EmployeeId: 0,
        Lattitude: 0.0,
        Longitude: 0.0,
        // DailyCallId: 0,
        DeviceDateTime: moment().toLocaleString(),
        FeedBack: '',
        JVEmployeeId: 0,
        CallStartTime: todayDate('YYYY-MM-DD hh:mm:ss'),
        CallEndTime: moment().add(15, 'minute').format('YYYY-MM-DD hh:mm:ss'),
        Remarks: 'Neutral',
        CallReason: 'N/A',
    },
    jsonDailyCallDetail: [
        // {
        //     ProductId: 4,
        //     DetailingSeconds: 10,
        // },
        // {
        //     ProductId: 7,
        //     DetailingSeconds: 6,    
        // }
    ],
    jsonSampleDetail: [
        // {
        //     ProductId: 7,
        //     SampleQty: 1,
        //     IsReminder: false
        // }
    ],
    jsonGiftDetail: [
        // {
        //     GiftId: 0,
        //     GiftQty: 0
        // }
    ],
    EmployeeId: 1,
    Token: getToken,
    DailyCallId: 0,
}

export const newDoctor = {
    DoctorName: '',
    DoctorAddress: '',
    Email: '',
    Phone: '',
    Designation: '',
    Speciality: '',
    CityId: '',
    CityName: '',
    isKOL: false,
}