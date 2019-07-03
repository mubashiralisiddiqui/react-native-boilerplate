import React from 'react';
import { ImageBackground } from 'react-native';

const ImageBackgroundWrapper = ({
    source = require('../../assets/images/background.png'),
    children,
}) => {
    return (
        <ImageBackground style={{width: '100%', height: '100%' , resizeMode: 'cover'}} source={source}>
            { children }
        </ImageBackground>        
    );
}

export default ImageBackgroundWrapper;