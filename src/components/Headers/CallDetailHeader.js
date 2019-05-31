import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';

const CallDetailheader = () => {
    return (
        <View style={styles.container}>
            <Text h3 style={{ fontWeight: 'bold'}}>Call Details</Text>
        </View>
    )
}
export default CallDetailheader;
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal:30,
        marginVertical:20,
        alignItems: 'center',
    },
}