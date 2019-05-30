
import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';

const ImageHeader = () => {
    return (
        <View style={styles.container}>
            <Image
                containerStyle={{width: '180'}}
                source={require('../../assets/images/HPLogo.png')}
            />
            <Text h4>Muhamma Nauman</Text>
            <Text h5>muhammad.nauman@hudsonpharma.com</Text>
        </View>
    )
}
export default ImageHeader;
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal:30,
        marginVertical:20,
        alignItems: 'center',
    },
}