import React, { useState } from 'react';
import { View, Dimensions, NativeModules, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import { styles, RSM_ROLE_ID } from '../../constants';
import { keyCallInfo } from '../../defaults';
import { CallReason } from '..'
import { useSelector } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SearchDoctor from '../../components/SearchDoctor'
import ReportingEmployeesField from '../../components/ReportingEmployeeField'

const KeyCallInfo = (props) => {
    const minimumDate = new Date();

    const user = useSelector(state => state.auth.user);
    
    const info = props.info ? props.info : keyCallInfo
    
    const onFocusTimerFields = (field) => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        setSettingTimer(field)
        setShowTimer(true);
    }
    const [showTimer, setShowTimer ] = useState(false);
    
    const [settingTimer, setSettingTimer ] = useState('');
    
    const { width, height } = Dimensions.get('window')
    
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
                <Input inputStyle={styles.inputStyle} onFocus={() => onFocusTimerFields('CallStartTime')} labelStyle={styles.labelStyle} label="Start Time" placeholder="12:30:00" value={info.CallStartTime || ''}/>
                <Input inputStyle={styles.inputStyle} onFocus={() => onFocusTimerFields('CallEndTime')} labelStyle={styles.labelStyle} label="End Time" placeholder="12:30:00"  value={info.CallEndTime || ''}/>
                {
                    user.RoleId == RSM_ROLE_ID
                    ? <ReportingEmployeesField name={info.SelectedEmployeeName} setMio={props.setMio} />
                    : null
                }
                <SearchDoctor errors={props.errors} setDoctor={props.setDoctor} name={info.SelectedDoctorName} />
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="SPO Name" placeholder="SPO Name" value={`${user.FullName || ''}`}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Address" placeholder="Doctor address" value={info.SelectedDoctorAddress || ''}/>
                <CallReason onCallReasonChange={props.onCallReasonChange} />
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
    },
    formContainer: {
        height: 'auto',
        justifyContent: 'center',
    },
}