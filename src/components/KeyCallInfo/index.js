import React, { useState } from 'react';
import { View, Dimensions, NativeModules, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import { styles } from '../../constants';
import { keyCallInfo } from '../../defaults';
import { CallReason } from '..'
import { useSelector } from 'react-redux';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

    
const KeyCallInfo = (props) => {

    const defaults = {
        Doctor: {
            DoctorName: '',
            DoctorAddress: '',
        },
        VisitEnd: '',
        VisitStart: '',
        user: {
            FirstName: '',
            MiddleName: '',
            LastName: '',
        }
    }
    const minimumDate = new Date();
    const user = useSelector(state => state.auth.user);
    const info = props.info ? props.info : keyCallInfo
    if(info.VisitStart == '' && info.VisitEnd == '') {
        info.VisitStart = new Date()
        info.VisitEnd = new Date()
    }
    const { width, height } = Dimensions.get('window')
    const onFocus = (field) => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        setSettingTimer(field)
        setShowTimer(true);
    }
    const [showTimer, setShowTimer ] = useState(false);
    const [settingTimer, setSettingTimer ] = useState('');
    return (
        <View style={inlineStyles.cardcontainer}>
            <DateTimePicker
                is24Hour={false}
                mode="time"
                minimumDate={minimumDate}
                timePickerModeAndroid="clock"
                isVisible={showTimer}
                onConfirm={(date) => props.handleDatePicked(date, settingTimer, () => setShowTimer(false))}
                onCancel={() => setShowTimer(false)}
                minuteInterval={15}
            />
            <View style={{width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2), ...inlineStyles.formContainer}}>
                <Input editable={!props.existingCall} onFocus={() => onFocus('CallStartTime')} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Start Time" placeholder="12:30:00" value={moment(info.VisitStart).format('YYYY-MM-DD hh:mm:ss') || info.CallStartTime || ''}/>
                <Input editable={!props.existingCall} onFocus={() => onFocus('CallEndTime') } inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="End Time" placeholder="12:30:00"  value={moment(info.VisitEnd).format('YYYY-MM-DD hh:mm:ss') || info.CallEndTime || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Doctor" placeholder="Doctor Name" value={info.Doctor && info.Doctor.DoctorName || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="SPO Name" placeholder="SPO Name" value={`${user.FullName || ''}`}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Address" placeholder="Doctor address" value={info.Doctor && info.Doctor.DoctorAddress || ''}/>
                <CallReason onCallReasonChange={(reason) => props.onCallReasonChange('CallReason', reason)} />
            </View>
        </View>
    )
}   

export default KeyCallInfo;


const inlineStyles = {
    cardcontainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        paddingLeft: 0,
        paddingTop: 5
    },
    formContainer: {
        // width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2),
        height: 'auto',
        justifyContent: 'center',
    },
}