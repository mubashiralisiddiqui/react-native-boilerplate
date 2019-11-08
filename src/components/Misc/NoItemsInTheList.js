import React from 'react'
import { ListItem } from 'react-native-elements'

const NoItemsInTheList = ({
    message = 'No Items',
}) => {
    return (
        <ListItem
            containerStyle={{ backgroundColor: 'transparent'}}
            title={message}
            bottomDivider
        />
    )
}

export default NoItemsInTheList