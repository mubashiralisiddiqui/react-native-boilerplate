import React, { useState } from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-elements';
import { brandColors, RFValue } from '../../constants'
import { Checkbox } from '..'

const CallReason = ({
    onCallReasonChange,
    selectedValue
}) => {
    return (
        <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
            <Text style={{fontSize: RFValue(14), color: brandColors.darkBrown, fontWeight: 'bold', paddingLeft: 10}}>Reason</Text>
            <View style={{width: '50%'}}>
                <Checkbox
                    title="Clinic Closed"
                    checked={selectedValue === 'Clinic Closed'}
                    onCheckedCallback={() => onCallReasonChange('CallReason', 'Clinic Closed')}
                />
            </View>
            <View style={{width: '50%'}}>
                <Checkbox
                    title="N/A"
                    checked={selectedValue === 'N/A'}
                    onCheckedCallback={() => onCallReasonChange('CallReason', 'N/A')}
                />
            </View>
        </View>
    )
}

export default CallReason;