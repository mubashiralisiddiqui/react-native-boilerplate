
import React from 'react';
import { View, Image } from 'react-native';


const ImageHeader = ({ verticalHeight = 30 }) => {
    return (
        <View style={containerStyle(verticalHeight)}>
            <Image
                source={require('../../assets/images/HPLogo.png')}
            />
        </View>
    )
}
const containerStyle = (height) => {
    console.warn(height)
    return {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 30,
        marginVertical: height,
        alignItems: 'center',
    }
}
export default ImageHeader;
// const styles = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         marginHorizontal: 30,
//         marginVertical: 50,
//         alignItems: 'center',
//     },
// }