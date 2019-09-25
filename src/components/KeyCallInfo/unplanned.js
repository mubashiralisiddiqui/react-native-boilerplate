import React, { useState, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { styles } from '../../constants';
import { keyCallInfo } from '../../defaults';
import { CallReason } from '..'
import { useSelector } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SearchDoctor from '../../components/SearchDoctor'
import ReportingEmployeesField from '../../components/ReportingEmployeeField'
import { useToggle } from '../../hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isRSM, getUser } from '../../reducers/authReducer';

const KeyCallInfo = (props) => {
    const minimumDate = useMemo(() => new Date());

    const isUserRSM = useSelector(isRSM);
    const user = useSelector(getUser);
    
    const info = props.info ? props.info : keyCallInfo
    
    const onFocusTimerFields = useMemo(() => (field) => {
        setSettingTimer(field)
        toggleTimer();
    })

    const [isTimerVisible, toggleTimer ] = useToggle(false);
    
    const [settingTimer, setSettingTimer ] = useState('');
    
    const { width, height } = Dimensions.get('window')
    
    return (
        <View style={inlineStyles.cardcontainer}>
            <DateTimePicker
                is24Hour={false}
                mode="time"
                minimumDate={minimumDate}
                timePickerModeAndroid="spinner"
                isVisible={isTimerVisible}
                onConfirm={(date) => props.handleDatePicked(date, settingTimer, () => toggleTimer(false))}
                onCancel={toggleTimer}
                minuteInterval={15}
            />
            <View style={{width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2), ...inlineStyles.formContainer}}>
                <TouchableOpacity onPressIn={() => onFocusTimerFields('CallStartTime')}>
                    <Input inputStyle={styles.inputStyle} editable={false} labelStyle={styles.labelStyle} label="Start Time" placeholder="12:30:00" value={info.CallStartTime || ''}/>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={ () => onFocusTimerFields('CallEndTime')}>
                    <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="End Time" placeholder="12:30:00"  value={info.CallEndTime || ''}/>
                </TouchableOpacity>
                {
                    isUserRSM && <ReportingEmployeesField name={info.SelectedEmployeeName} setMio={props.setMio} />
                }
                <SearchDoctor location={false} additionalInfo={info} errors={props.errors} setDoctor={props.setDoctor} name={info.SelectedDoctorName} />
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Employee Name" placeholder="Employee Name" value={`${user.FullName || ''}`}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Address" placeholder="Doctor address" value={info.SelectedDoctorAddress || ''}/>
                <CallReason onCallReasonChange={props.onCallReasonChange} selectedValue={props.selectedReason} />
            </View>
        </View>
    )
}   

export default KeyCallInfo;


const inlineStyles = {
    cardcontainer: {
        paddingTop: 10,
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