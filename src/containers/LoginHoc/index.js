import React, { Component } from 'react';



const LoginHOC = (WrappedComponent) => (
    class extends Component {
        state = {
            email: '',
            password: '',
            rememberMe: false,
            loading: false,
        };
        static navigationOptions = {
            // header: null,
            drawerLockMode: 'locked-closed'
        }


        onChange = (name, value) => {
            this.setState({ [name]: value });
        }
        onSubmit = (e) => {
            console.warn(this.state.email)
        }

        render() {
            const { email, password, loading, rememberMe } = this.state;
            return (
                <WrappedComponent
                    email={email}
                    onSubmit={this.onSubmit}
                    {...this.props}
                />
            )
        }

    }
)

export default LoginHOC
