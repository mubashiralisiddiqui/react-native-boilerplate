import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCalls, getUnplannedCalls } from '../../reducers/callsReducers'
import { CallListItem } from '..';
import { FlatList } from 'react-native-gesture-handler';
import { RandomInteger } from '../../constants';

export default function ({ 
    type = 'planned',
    onPress= () => null
}) {
    const calls = type === 'planned'
    ? useSelector(getCalls)
    : useSelector(getUnplannedCalls)

    const _render =  useCallback(({item}) => {
        return (
            <CallListItem
                call={item}
                key={item.Doctor.DoctorCode}
                name={`${item.Doctor.DoctorName}`}
                category={item.Doctor.SpecialtyName}
                doctorClass={item.Doctor.ClassName}
                onPressHandler={onPress}
                status={item.IsExecuted}
                isOffline={item.IsExecutedOffline && item.IsExecutedOffline}
                isUnplanned={type != 'planned'}
            />
        )
    })
    
    return (
        <FlatList
            data={calls}
            renderItem={_render}
            keyExtractor={ item => `${item.Doctor.DoctorName}-${RandomInteger()}`}
        />
        // calls.map((call, i) => {
        //     return call.Doctor && (
        //         <CallListItem
        //             call={call}
        //             key={i}
        //             name={`${call.Doctor.DoctorName}`}
        //             category={call.Doctor.SpecialtyName}
        //             doctorClass={call.Doctor.ClassName}
        //             onPressHandler={onPress}
        //             status={call.IsExecuted}
        //             isOffline={call.IsExecutedOffline && call.IsExecutedOffline}
        //             isUnplanned={type != 'planned'}
        //         />
        //     )
        // })
    );
}