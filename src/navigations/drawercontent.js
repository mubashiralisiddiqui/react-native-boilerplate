import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    AsyncStorage,
    Share,
    ScrollView,
} from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';



class NavigationMenu extends Component {
    state = {
        name: '',
        activeTab: 1,
        affiliationCode: ''
    };

    componentDidMount() {

    }

    logout = () => {
        AsyncStorage.removeItem('userData')
        this.props.navigation.navigate('Auth')
    }


    render() {

        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 0, width: '100%' }}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Avatar
                            size={'large'}
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                            onPress={() => console.log('Works!')}
                            activeOpacity={0.7}
                        />
                        <Text style={{ fontSize: 16, color: '#000', marginTop: 5 }}>firstName</Text>
                        <Text>email</Text>
                    </View>

                    <TouchableOpacity

                        style={this.state.activeTab === 1 ? styles.active : styles.tabName}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.sectionHeadingStyle}>Home</Text>
                        </View>
                        <Icon name="chevron-right" color="#666666" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={this.state.activeTab === 2 ? styles.active : styles.tabName}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.sectionHeadingStyle}>Profile</Text>
                        </View>
                        <Icon name="chevron-right" color="#666666" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={this.state.activeTab === 3 ? styles.active : styles.tabName}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.sectionHeadingStyle}>Notifications</Text>
                        </View>
                        <Icon name="chevron-right" color="#666666" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={this.state.activeTab === 4 ? styles.active : styles.tabName}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.sectionHeadingStyle}>Settings</Text>
                        </View>
                        <Icon name="chevron-right" color="#666666" size={20} />
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    style={{ width: '90%', marginTop: 10 }}>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = new StyleSheet.create({

    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    sectionHeadingStyle: {
        paddingHorizontal: 5,
        fontFamily: 'SFProDisplay-Regular',
        color: '#666666',
        fontSize: 14,
        textAlignVertical: 'center'
    },

    tabName: {
        paddingVertical: 20,
        alignItems: 'center',
        fontFamily: 'SFProDisplay-Regular',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3'
    },
    active: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: '#d3d3d3',
        paddingVertical: 20
    }
});

NavigationMenu.propTypes = {
    navigation: PropTypes.object
};

// const mapStateToProps = ({ auth }) => {
//     const { loading, user } = auth;
//     return { loading, user };
// };


// export default connect(mapStateToProps, {
//     getUser
// })(NavigationMenu);

export default NavigationMenu