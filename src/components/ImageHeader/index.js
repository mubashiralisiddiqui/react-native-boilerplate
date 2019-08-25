
import React from 'react';
import { View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


const ImageHeader = ({ verticalHeight = 30 }) => {
    return (
        <View style={containerStyle(verticalHeight)}>
            <Image
                style={{ justifyContent: 'center', alignItems: 'center', width: RFValue(200), resizeMode: 'contain', height: RFValue( 100) }}
                source={require('../../assets/images/HPLogo.png')}
            />
        </View>
    )
}
const containerStyle = (height) => {
    return {
        // flex: 1,
        display: 'flex',
        justifyContent: 'center',
        // marginHorizontal: 30,
        // marginVertical: height,
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