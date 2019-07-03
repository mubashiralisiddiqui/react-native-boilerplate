
import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { brandColors } from '../../constants';

const ImageHeader = () => {
    return (
            // <ImageBackground style={{width: '100%', resizeMode: 'repeat'}} source={require('../../assets/images/background.png')}>
        <View style={styles.container}>
                <Image
                    style={{ resizeMode: 'contain' }}
                    source={ require('../../assets/images/HPLogo.png') }
                />
                <Text h4 style={{ fontWeight: 'bold'}}>Muhamma Nauman</Text>
                <Text h5 style={{ fontWeight: 'bold'}}>muhammad.nauman@hudsonpharma.com</Text>
                <Divider style={{height: 5, backgroundColor: brandColors.darkBrown}} />
            </View>
        // </ImageBackground>
    )
}
export default ImageHeader;
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginVertical:20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: brandColors.darkBrown
    },
}