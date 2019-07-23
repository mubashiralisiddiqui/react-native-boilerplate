import moment from 'moment';
import { getToken } from '../constants';

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
        PlanDetailId: 0,
        DeviceDateTime: moment().toLocaleString(),
        FeedBack: '',
        JVEmployeeId: 0,
        CallStartTime: '',
        CallEndTime: '',
        Remarks: 'Neutral',
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
    jsonGiftDetail: [],
    EmployeeId: 1,
    Token: getToken
}