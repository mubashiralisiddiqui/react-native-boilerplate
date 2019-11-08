import React, { useState } from 'react';
import { View } from 'react-native';
import { useInterval } from '../../hooks/useInterval'

const Blink = ({
    children,
    delay,
    blinking,
}) => {
    const [ show, setShow ] = useState(true)
    useInterval(() => {
        if(blinking) {
            setShow(!show)
        } else {
            setShow(true)
        }
    }, delay)

    return show ? children || <View /> : <View />
}

export default Blink;