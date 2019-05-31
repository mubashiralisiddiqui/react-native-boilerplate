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
    ScrollView,
} from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import { ImageHeader } from '../components';
import { navigationOptions, brandColors } from '../constants'

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
        // console.warn(navigate)
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 0, width: '100%' }}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <ImageHeader
                            verticalHeight={0}
                        />
                        {/* <Text style={{ fontSize: 16, color: '#000', marginTop: 5 }}>firstName</Text>
                        <Text>email</Text> */}
                    </View>
                    {
                        navigationOptions.map((option, index) => {
                            return (<TouchableOpacity
                                onPress={() => option.navigateTo ? navigate(option.navigateTo) : ''}
                                style={this.state.activeTab === 1 ? styles.active : styles.tabName}
                            >
                            <Icon name='schedule' color={brandColors.darkBrown}/>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.sectionHeadingStyle}>{ option.label }</Text>
                            </View>
                            </TouchableOpacity>)
                        })
                    }
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
        // fontFamily: 'SFProDisplay-Regular',
        color: brandColors.darkBrown,
        fontSize: 16,
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    },

    tabName: {
        paddingVertical: 20,
        // alignItems: 'center',
        // fontFamily: 'SFProDisplay-Regular',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: brandColors.darkBrown
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