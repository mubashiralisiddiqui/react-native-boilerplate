
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
                source={require('../../assets/images/logo.jpeg')}
            />

        </View>
    )
}
export default ImageHeader;
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal:20,
        marginVertical:10

    }
}