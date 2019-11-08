import React from 'react';
import { View } from 'react-native';
import FieldHeader from './FieldHeader';
import { styles } from '../../constants';
import { propTypesCallRemarks } from './defaultPropTypeValues'
import { Checkbox } from '../index'
 
const CallRemarksField = ({
    onChangeCallRemarks,
    selectedValue,
}) => {
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}>

                <FieldHeader
                    title="Call Remarks"
                />
                <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>    
                    <View style={{width: '33%'}}>
                        <Checkbox
                            title='Positive'
                            checked={selectedValue === 'Positive'}
                            onCheckedCallback={() => onChangeCallRemarks('Remarks', 'Positive')}
                        />
                    </View>
                    <View style={{width: '33%'}}>
                        <Checkbox
                            title='Negative'
                            checked={selectedValue === 'Negative'}
                            onCheckedCallback={() => onChangeCallRemarks('Remarks', 'Negative')}
                        />
                    </View>
                    <View style={{width: '33%'}}>
                        <Checkbox
                            title='Neutral'
                            checked={selectedValue === 'Neutral'}
                            onCheckedCallback={() => onChangeCallRemarks('Remarks', 'Neutral')}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

CallRemarksField.propTypes = propTypesCallRemarks

export default CallRemarksField;