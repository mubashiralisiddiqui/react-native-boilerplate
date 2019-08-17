import React, { useState } from 'react';
import { View } from 'react-native';
import FieldHeader from '../FieldHeader';
import { styles, brandColors } from '../../../constants';
import { CheckBox } from 'react-native-elements';
import { propTypes } from './defaultPropTypesValues'
 
const CallRemarksField = ({
    onChangeCallRemarks
}) => {
    const [neutral, setNeutral] = useState(true);
    const [positive, setPositive] = useState(false);
    const [negative, setNegative] = useState(false);
    const onchange = ( state ) => {
        if(state === 'neutral') {
            onChangeCallRemarks('Neutral')
            setNeutral(true);
            setNegative(false);
            setPositive(false);
            return;
        }
        if(state === 'positive') {
            setPositive(true);
            onChangeCallRemarks('Positive')
            setNeutral(false);
            setNegative(false);
            return;
        }
        setNegative(true);
        onChangeCallRemarks('Negative')
        setNeutral(false);
        setPositive(false);
    }
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}>

                <FieldHeader
                    title="Call Remarks"
                />
                <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>    
                    <View style={{width: '33%'}}>
                    <CheckBox
                        containerStyle={{ backgroundColor: 'transparent'}}
                        textStyle={{color: brandColors.darkBrown}}
                        checkedColor={brandColors.lightGreen}
                        title='Positive'
                        checked={positive}
                        onPress={() => onchange('positive')}
                    />
                    </View>
                    <View style={{width: '33%'}}>
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent'}}
                            textStyle={{color: brandColors.darkBrown}}
                            checkedColor={brandColors.lightGreen}
                            title='Negative'
                            checked={negative}
                            onPress={() => onchange('negative')}
                        />
                    </View>
                    <View style={{width: '33%'}}>
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent'}}
                            textStyle={{color: brandColors.darkBrown}}
                            checkedColor={brandColors.lightGreen}
                            title='Neutral'
                            checked={neutral}
                            onPress={() => onchange('neutral')}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

CallRemarksField.propTypes = propTypes

export default CallRemarksField;