import React from 'react';
import { View, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { styles } from '../../constants';

const KeyCallInfo = (props) => {
    const defaults = {
        Doctor: {
            DoctorName: '',
            DoctorAddress: '',
        },
        VisitEnd: '',
        VisitStart: '',
    }
    const info = defaults
    const { width, height } = Dimensions.get('window')
    return (
        <View style={inlineStyles.cardcontainer}>
            <View style={{width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2), ...inlineStyles.formContainer}}>
                <Input editable={false} editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Start Time" placeholder="12:30:00" value={info.VisitStart || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="End Time" placeholder="12:30:00"  value={info.VisitEnd || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Doctor" placeholder="Doctor Name" value={info.Doctor.DoctorName || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="SPO Name" placeholder="SPO Name"/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Address" placeholder="Doctor address" value={info.Doctor.DoctorAddress || ''}/>
                <Input inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Reason" placeholder="Enter reason"/>
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
        // width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2),
        height: 'auto',
        justifyContent: 'center',
    },
}