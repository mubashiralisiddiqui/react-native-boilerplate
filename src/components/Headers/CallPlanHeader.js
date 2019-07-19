
import React, { useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { brandColors, authUser } from '../../constants';

const ImageHeader = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    authUser().then(user => {
        if(user) {
            console.log(user.MiddleName === null, typeof(user.LastName))
            setName(`${user.FirstName} ${user.MiddleName == null ? '' : user.MiddleName} ${user.LastName  == null ? '' : user.LastName}`)
            setEmail(user.LoginId);
        }
    })
    return (
            // <ImageBackground style={{width: '100%', resizeMode: 'repeat'}} source={require('../../assets/images/background.png')}>
        <View style={styles.container}>
                <Image
                    style={{ resizeMode: 'contain' }}
                    source={ require('../../assets/images/HPLogo.png') }
                />
                <Text h4 style={{ fontWeight: 'bold'}}>{ name }</Text>
                <Text h5 style={{ fontWeight: 'bold'}}>{ email }</Text>
                <Divider style={{height: 5, backgroundColor: brandColors.darkBrown}} />
            </View>
        // </ImageBackground>
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