import React from 'react';
import { View, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { styles } from '../../constants';

const KeyCallInfo = (props) => {
    console.log("From Key Call Info => ", props)
    const { width, height } = Dimensions.get('window')
    return (
        <View style={inlineStyles.cardcontainer}>
            <View style={{width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2), ...inlineStyles.formContainer}}>
                <Input labelStyle={styles.labelStyle} label="Start Time" placeholder="12:30:00" value={info.VisitStart}/>
                <Input labelStyle={styles.labelStyle} label="End Time" placeholder="12:30:00"  value={info.VisitEnd}/>
                <Input labelStyle={styles.labelStyle} label="Doctor" placeholder="12:30:00" value={info.Doctor.DoctorName}/>
                <Input labelStyle={styles.labelStyle} label="SPO Name" placeholder="12:30:00"/>
                <Input labelStyle={styles.labelStyle} label="Address" placeholder="12:30:00" value={info.Doctor.DoctorAddress}/>
                <Input labelStyle={styles.labelStyle} label="Reason" placeholder="12:30:00"/>
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