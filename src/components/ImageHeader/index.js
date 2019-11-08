
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}
export default ImageHeader;