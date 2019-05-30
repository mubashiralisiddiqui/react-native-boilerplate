


import React from 'react';

import { View, Text, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements'

const ItemCard = (props) => {
    return (

        <Card
            containerStyle={{ paddingLeft: 2, paddingRight: 5 }}
        >
            <View style={styles.cardcontainer}>
                <View style={styles.itemFirst}>
                    <Text> Dr Nauaman</Text>
                </View>
                <View style={styles.itemSecond}>
                    <Text> A</Text>
                </View>
                <View style={styles.item}>
                    <Text> OPHT</Text>
                </View>
                <Button

                    buttonStyle={{
                        marginLeft: 8,
                        backgroundColor: 'gray'
                    }}
                    title='Submit'
                    containerStyle={{ padding: 5, marginRight: 5, }}
                />
            </View>
        </Card>
    )
}
export default ItemCard;
const { width } = Dimensions.get('window');
const styles = {
    cardcontainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 50,
        paddingLeft: 0,
    },
    itemFirst: {
        height: 50,
        justifyContent: 'center',
        marginLeft: 0,
        alignItems: 'center',
        padding: 10
    },
    itemSecond: {
        height: 50,
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: 10,
        alignItems: 'center',
        padding: 10
    },
    item: {
        height: 50,
        marginLeft: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7
    }
}