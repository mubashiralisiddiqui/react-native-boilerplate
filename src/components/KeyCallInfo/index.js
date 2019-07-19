import React from 'react';
import { View, Dimensions } from 'react-native';
import { Input, CheckBox, Text } from 'react-native-elements';
import { styles, brandColors } from '../../constants';
import { keyCallInfo } from '../../defaults';

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
    const info = props.info ? props.info : keyCallInfo
    const { width, height } = Dimensions.get('window')
    return (
        <View style={inlineStyles.cardcontainer}>
            <View style={{width: width < height ? parseInt(width / 1.2) : parseInt(width / 1.2), ...inlineStyles.formContainer}}>
                <Input editable={false} editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Start Time" placeholder="12:30:00" value={info.VisitStart || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="End Time" placeholder="12:30:00"  value={info.VisitEnd || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Doctor" placeholder="Doctor Name" value={info.Doctor.DoctorName || ''}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="SPO Name" placeholder="SPO Name" value={`${info.user.FirstName} ${info.user.MiddleName == null ? '' : info.user.MiddleName} ${info.user.LastName  == null ? '' : info.user.LastName}`}/>
                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Address" placeholder="Doctor address" value={info.Doctor.DoctorAddress || ''}/>
                <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, color: brandColors.darkBrown, fontWeight: 'bold', paddingLeft: 10}}>Reason</Text>
                    <View style={{width: '50%'}}>
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent'}}
                            textStyle={{color: brandColors.darkBrown}}
                            checkedColor={brandColors.lightGreen}
                            title='Clinic Closed'
                            checked={false}
                            onPress={() => onchange('positive')}
                        />
                    </View>
                    <View style={{width: '50%'}}>
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent'}}
                            textStyle={{color: brandColors.darkBrown}}
                            checkedColor={brandColors.lightGreen}
                            title='N/A'
                            checked={true}
                            onPress={() => onchange('negative')}
                        />
                    </View>
                </View>
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