
import React from 'react';
import { View, Image } from 'react-native';
import { brandColors } from '../../constants';
import  UserInfo  from '../UserInfo';
import { RefreshNow } from '..'

const ImageHeader = () => {
    return (
            <View style={styles.container}>
                <Image
                    style={{ resizeMode: 'contain' }}
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