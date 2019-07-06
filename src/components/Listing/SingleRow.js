import React from 'react'
import { View } from 'react-native'
import { Text, ListItem } from 'react-native-elements'

const SingleRow = ({
    item,
    columns = 2,
    firstColumnValue = '',
    secondColumnValue = '',
}) => {
    const styles = {
        itemContainer: {
            borderWidth: 1,
            borderTopWidth: 0,
            height: 25,
            backgroundColor: 'transparent',
        },
        leftElementContainer: {
            borderRightWidth: 1,
            width: columns === 2 ? '50%' : '100%',
        },
        rightElementText: {
            width: '100%',
            textAlign: 'left'
        }
    }
    return (
        <ListItem
            containerStyle={styles.itemContainer}
            leftElement={
                <View style={styles.leftElementContainer}>
                    <Text>{item[firstColumnValue] && item[firstColumnValue]}</Text>
                </View>
                } 
            rightElement={ columns === 2
                ? <View style={styles.leftElementContainer}>
                    <Text
                        style={styles.rightElementText}>
                        {item[secondColumnValue] && item[secondColumnValue]}
                    </Text>
                </View>
                : null
                }
        />
    )
}

export default SingleRow;