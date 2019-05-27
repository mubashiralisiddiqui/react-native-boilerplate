
import React, { Fragment } from 'react';

import { View, ImageBackground, Image } from 'react-native';



const ImageHeader = () => {
    return (
        <View style={styles.container}>
            {/* <ImageBackground
                source={require('../../assets/images/logo.jpeg')}
            >

            </ImageBackground> */}
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