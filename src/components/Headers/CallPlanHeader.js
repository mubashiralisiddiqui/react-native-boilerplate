
import React from 'react';
import { View, Image } from 'react-native';
import { brandColors } from '../../constants';
import  UserInfo  from '../UserInfo';
import { RFValue } from 'react-native-responsive-fontsize';

const ImageHeader = () => {
    return (
            <View style={styles.container}>
                <Image
                    style={{ width: RFValue(250), resizeMode: 'contain', height: RFValue(125) }}
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