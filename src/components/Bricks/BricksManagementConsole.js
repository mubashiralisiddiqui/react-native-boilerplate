import React, { useContext, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { brandColors, RFValue } from '../../constants'
import { BricksContext } from '.'
import { canRequestNew } from './reducer'
import { useSelector } from 'react-redux'

const ConsoleButtons = (props) => {
    const bricksContext = useContext(BricksContext)
    const { state: { data } } = bricksContext
    const shouldShowConsoleButtons = useSelector(canRequestNew)
    
    
    const ifRemovedExist = useMemo (() => {
        return ! _.isEmpty(
                _.find(data, { 
                    BrickId: props.brick.BrickId,
                    IsAddition: false,
                })
            )
    })

    const onPressRemove = useCallback(() => {
        props.onLongPress()
        props.onDataRemoval();
    })

    const onPressAdd = useCallback(() => {
        props.onLongPress()
        props.onAdd();
    })
    
    return shouldShowConsoleButtons && (
        <View style={{ width: '70%', flexDirection: 'row-reverse', }}>
            <Button
                onPress={onPressRemove}
                disabled={ifRemovedExist}
                title="Remove"
                containerStyle={{ width: '20%' }}
                titleStyle={{ fontSize: RFValue(12), fontFamily: 'Lato-BoldItalic' }}
                buttonStyle={{ backgroundColor: '#f01', borderRadius: 25 }}
            />
            <Button
                onPress={onPressAdd}
                title="Add this brick in"
                containerStyle={{ width: '25%' }}
                titleStyle={{ fontSize: RFValue(12), fontFamily: 'Lato-BoldItalic' }}
                buttonStyle={{ backgroundColor: brandColors.green, borderRadius: 25 }}
            />
        </View>
    )
}

const BricksManagementConsole = (props) => {
    return (
        <ConsoleButtons {...props} onAdd={props.onAddPress} />
    )
}

export default BricksManagementConsole