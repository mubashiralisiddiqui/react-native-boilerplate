
import React from 'react';
import { View, Image } from 'react-native';

const ImageHeader = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/HPLogo.png')}
            />
        </View>
    )
}
export default ImageHeader;
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal:30,
        marginVertical:50,
        alignItems: 'center',
    },
}