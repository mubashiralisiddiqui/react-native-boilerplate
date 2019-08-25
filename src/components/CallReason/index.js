import React, { useState } from 'react';
import { View } from 'react-native'
import { Text, CheckBox} from 'react-native-elements';
import { brandColors } from '../../constants'
import { RFValue } from 'react-native-responsive-fontsize';

const CallReason = ({
    onCallReasonChange
}) => {
    const [ closed, setClosed ] = useState(false)
    const [ noReason, setNoReason ] = useState(true)

    const onChange = (type) => {
        if(type === 'N\\A') {
            onCallReasonChange(type)
            setNoReason(true);
            setClosed(false)
            return;
        }
        onCallReasonChange(type);
        setClosed(true);
        setNoReason(false);
    }
    return (
        <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: RFValue(14), color: brandColors.darkBrown, fontWeight: 'bold', paddingLeft: 10}}>Reason</Text>
            <View style={{width: '50%'}}>
                <CheckBox
                    containerStyle={{ backgroundColor: 'transparent'}}
                    textStyle={{color: brandColors.darkBrown}}
                    checkedColor={brandColors.lightGreen}
                    title='Clinic Closed'
                    checked={closed}
                    onPress={() => onChange('Clinic Closed')}
                />
            </View>
            <View style={{width: '50%'}}>
                <CheckBox
                    containerStyle={{ backgroundColor: 'transparent'}}
                    textStyle={{color: brandColors.darkBrown}}
                    checkedColor={brandColors.lightGreen}
                    title='N/A'
                    checked={noReason}
                    onPress={() => onChange('N\\A')}
                />
            </View>
        </View>
    )
}

export default CallReason;