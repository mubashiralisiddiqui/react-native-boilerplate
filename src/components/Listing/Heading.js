import React from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

const Heading = ({
    firstColumn,
    secondColumn = '',
}) => {
    return (
        <View>
            <ListItem
                containerStyle={{borderWidth: 1, backgroundColor: '#bdbfc0'}}
                leftElement={
                    <View style={{borderRightWidth: 1, width: '50%'}}>
                        <Text h4>{firstColumn}</Text>
                    </View>
                    } 
                rightElement={ secondColumn !== ''
                    ? <View style={{width: '50%'}}>
                        <Text h4 style={{width: '100%', textAlign: 'left'}}>{secondColumn}</Text>
                    </View>
                    : null
                    }
                />
        </View>
    )
}

export default Heading