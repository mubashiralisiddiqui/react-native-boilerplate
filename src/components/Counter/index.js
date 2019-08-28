import React from 'react'
import Counter from "react-native-counters";
import { Button } from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { brandColors, RFValue } from '../../constants';

const Count = ({
    start,
    max,
    onChange,
}) => {
    const plusIcon = () => {
        return (<Button type='clear' icon={<FontAwesome5Icon name='plus-circle' color={brandColors.lightGreen} size={RFValue(20)}/>} />)
    }
    const minusIcon = () => {
        return (<Button type='clear' icon={<FontAwesome5Icon name='minus-circle' color={brandColors.lightGreen} size={RFValue(20)}/>} />)
    }
    return (
        <Counter
            minusIcon={plusIcon}
            plusIcon={minusIcon }
            start={start}
            max={max}
            onChange={onChange}
        />
    )
}

export default Count;