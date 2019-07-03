import React, { useState } from 'react';
import { View } from 'react-native';
import FieldHeader from '../FieldHeader';
import { styles, brandColors } from '../../../constants';
import { CheckBox } from 'react-native-elements';

const CallRemarksField = () => {
    const [neutral, setNeutral] = useState(false);
    const [positive, setPositive] = useState(false);
    const [negative, setNegative] = useState(false);
    const onchange = ( state ) => {
        if(state === 'neutral') {
            setNeutral(true);
            setNegative(false);
            setPositive(false);
            return;
        }
        if(state === 'positive') {
            setPositive(true);
            setNeutral(false);
            setNegative(false);
            return;
        }
        setNegative(true);
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
                        textStyle={{color: brandColors.darkBrown}}
                        checkedColor={brandColors.lightGreen}
                        title='Positive'
                        checked={positive}
                        onPress={() => onchange('positive')}
                    />
                    </View>
                    <View style={{width: '33%'}}>
                        <CheckBox
                            textStyle={{color: brandColors.darkBrown}}
                            checkedColor={brandColors.lightGreen}
                            title='Negative'
                            checked={negative}
                            onPress={() => onchange('negative')}
                        />
                    </View>
                    <View style={{width: '33%'}}>
                        <CheckBox
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
export default CallRemarksField;