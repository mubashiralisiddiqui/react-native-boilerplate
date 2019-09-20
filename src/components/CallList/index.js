import React from 'react';
import { useSelector } from 'react-redux';
import { getCalls, getUnplannedCalls } from '../../reducers/callsReducers'
import { Itemcard } from '..';

export default function ({ 
    type = 'planned',
    onPress= () => null
}) {
    const calls = type === 'planned'
    ? useSelector(getCalls)
    : useSelector(getUnplannedCalls)
    
    return (
        calls.map((call, i) => {
            return (
                <Itemcard
                    call={call}
                    key={i}
                    name={`${call.Doctor.DoctorName}`}
                    category={call.Doctor.SpecialtyName}
                    doctorClass={call.Doctor.ClassName}
                    onPressHandler={onPress}
                    status={call.IsExecuted}
                    isOffline={call.IsExecutedOffline && call.IsExecutedOffline}
                    isUnplanned={type != 'planned'}
                />
            )
        })
    );
}