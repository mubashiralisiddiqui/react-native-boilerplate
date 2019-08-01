
import React from 'react';
import { View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { brandColors } from '../../constants';
import  UserInfo  from '../UserInfo';

const ImageHeader = () => {
    return (
        <View style={styles.container}>
            <Image
                style={{ resizeMode: 'contain' }}
                source={ require('../../assets/images/HPLogo.png') }
            />
            <UserInfo />
            <Divider style={{height: 5, backgroundColor: brandColors.darkBrown}} />
        </View>
    )
}
export default ImageHeader;
const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginVertical:20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: brandColors.darkBrown
    },
}