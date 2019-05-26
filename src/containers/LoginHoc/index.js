import React, { Component } from 'react';



const LoginHOC = (WrappedComponent) => (
    class extends Component {
        state = {
            email: '',
            password: '',
            loading: false
        };
        static navigationOptions = {
            // header: null,
            drawerLockMode: 'locked-closed'
        }


        onChange = (name, value) => {
            this.setState({ [name]: value });
        }

        render() {
            const { email, password, loading } = this.state;
            return (

                <WrappedComponent
                    email={email}
                    {...this.props}
                />
            )
        }

    }
)

export default LoginHOC
