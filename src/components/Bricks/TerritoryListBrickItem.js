import React from 'react'
import { RandomInteger, RFValue } from '../../constants'
import { Badge, ListItem } from 'react-native-elements'
import { BricksManagementConsole } from '..'


const TerritoryListBrickItem = (props) => {
    const {
        item,
        onLongPress,
        onPressAdd,
        onDataAddition,
        onDataRemoval,
    } = props

    return (
        <ListItem
            key={RandomInteger()}
            title={item.BrickName}
            titleStyle={{ fontSize: RFValue(14), fontFamily: 'Lato-MediumItalic' }}
            containerStyle={{
                borderRadius: 5,
                borderWidth: 2,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                width: '100%',
                backgroundColor: 'transparent',
            }}
            componen
            chevron={<Badge status="success" value={item.EmployeeName} textStyle={{ fontSize: RFValue(10), fontFamily: 'lato-MediumItalic' }} />}
            rightElement={<BricksManagementConsole onLongPress={() => onLongPress(item)} brick={item} onDataRemoval={onDataRemoval} onDataAddition={onDataAddition} shouldClose={() => onLongPress(0)} onAddPress={onPressAdd} onRemovePress={() => onRemove(item, false)} />}
        />
    )
}

export default TerritoryListBrickItem