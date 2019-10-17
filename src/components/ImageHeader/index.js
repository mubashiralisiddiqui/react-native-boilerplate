
import React from 'react';
import { View, Image } from 'react-native';
import { RFValue } from '../../constants';
import Shimmer from 'react-native-shimmer';


const ImageHeader = ({ verticalHeight = 30 }) => {
    return (
        <View style={containerStyle(verticalHeight)}>
            <Shimmer duration={2500} tilt={45} pauseDuration={100}>
                <Image
                    style={{ justifyContent: 'center', alignItems: 'center', width: RFValue(200), resizeMode: 'contain', height: RFValue( 100) }}
                    source={require('../../assets/images/HPLogo.png')}
                />
            </Shimmer>
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