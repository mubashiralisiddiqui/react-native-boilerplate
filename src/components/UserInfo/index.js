import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { setDefault, RFValue } from '../../constants';

const UserInfo = () => {
    const user = useSelector(state => state.auth.user )
    
    return (
        <View>
            <Text style={{ fontFamily: 'Lato-HeavyItalic', textAlign: 'center', fontSize: RFValue(16)}}>{ `${setDefault(user.FullName)}` }</Text>
            <Text style={{ fontFamily: 'Lato-SemiboldItalic',  textAlign: 'center', fontSize: RFValue(14)}}>{ `${user.LoginId}` }</Text>
        </View>
    );
}

export default UserInfo;