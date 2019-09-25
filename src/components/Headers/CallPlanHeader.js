
import React from 'react';
import { View, Image } from 'react-native';
import { brandColors, RFValue } from '../../constants';
import  UserInfo  from '../UserInfo';

const ImageHeader = () => {
    return (
            <View style={styles.container}>
                <Image
                    style={{ width: RFValue(240), resizeMode: 'contain', height: RFValue(120) }}
                    source={ require('../../assets/images/HPLogo.png') }
                />
                <UserInfo />
            </View>
    )
}
export default ImageHeader;
const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: brandColors.darkBrown
    },
}