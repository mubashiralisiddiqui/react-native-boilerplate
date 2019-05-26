

import React, { Fragment } from 'react';


import Icon from 'react-native-vector-icons/AntDesign';


import { TextInput, Button } from '../../components';
import LoginHoc from '../../containers/LoginHoc';

const LoginForm = () => {

    return (
        <Fragment>
            <TextInput
                placeholder="username"
                keyboardType="default"
                handleChange={console.warn("testing")}
                underlineColor="black"
                secureTextEntry={false}
                icon={<Icon
                    size={20}
                    name="user"
                    color="#478eb5" />}
            />
            <TextInput
                placeholder="Password"
                keyboardType="default"
                handleChange={console.warn("testing")}
                underlineColor="black"
                secureTextEntry={true}
                icon={
                    <Icon
                        size={20}
                        name="key"
                        color="#478eb5"

                    />}
            />
            <Button
                loading={false}
                Title="Login"
                onPress={() => ({})}
                rounded={true}
            />

        </Fragment >
    )

}
export default LoginHoc(LoginForm) 