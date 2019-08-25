import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { setDefault } from '../../constants';

const UserInfo = () => {
    const user = useSelector(state => state.auth.user )
    
    return (
        <View>
            <Text h4 style={{ fontFamily: 'Lato-Regular', textAlign: 'center'}}>{ `${setDefault(user.FullName)}` }</Text>
            <Text h5 style={{ fontFamily: 'Lato-Semibold',  textAlign: 'center'}}>{ `${user.LoginId}` }</Text>
        </View>
    );
}

export default UserInfo;