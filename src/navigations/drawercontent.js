import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { ImageHeader } from '../components';
import { navigationOptions, brandColors, RFValue } from '../constants'
import { FontAwesome5Icon, MaterialCommunityIcon, AntDesignIcon, FontAwesomeIcon } from '../components/Icons'
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../reducers/authReducer';
import { connect } from 'react-redux';

class NavigationMenu extends Component {
    state = {
        activeTab: 'CallPlans',
    };

    logout = () => {
        Alert.alert(
            'Are you sure?',
            'Are you sure you wan to logout? Make sure you do not have unsynced data, this action will remove all the data.',
            [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    AsyncStorage.clear()
                    this.props.navigation.navigate('AuthCheck')
                }
            },
            ],
        );
    }

    getIcon = ({icon, type, isActive}) => {
        switch(type) {
            case 'FontAwesome5': {
                return (
                    <FontAwesome5Icon name={icon} size={20} color={isActive ? '#fff' : brandColors.lightGreen} />
                )
            }
            case 'AntDesign': {
                return (
                    <AntDesignIcon name={icon} size={20}  color={isActive ? '#fff' : brandColors.lightGreen} />
                )
            }
            case 'MaterialCommunityIcon': {
                return (
                    <MaterialCommunityIcon name={icon} size={20}  color={isActive ? '#fff' : brandColors.lightGreen} />
                )
            }
            case 'FontAwesome': {
                return (
                    <FontAwesomeIcon name={icon} size={20}  color={isActive ? '#fff' : brandColors.lightGreen} />
                )
            }
            default: {
                return null;
            }
        }
    }

    navigateIt = (to) => requestAnimationFrame( () => {
        this.setState({ activeTab: to}, () => console.log(this.state, this.props.navigation.state))
        switch(to) {
            case 'Login': {
                this.logout()
                return;
            }
            default: {
                return this.props.navigation.navigate(to)
            }
        }
    })
    getActiveRoute = (navigationState) => {
        if (
          !navigationState.routes ||
          !navigationState.routes.length ||
          navigationState.index >= navigationState.routes.length
        ) {
          return navigationState;
        }
      
        const childActiveRoute = navigationState.routes[navigationState.index];
        return this.getActiveRoute(childActiveRoute);
      };


    render() {
        const CustomIcon = this.getIcon;
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 0, width: '100%' }}>
                    {/* <View style={{ alignItems: 'center' }}> */}
                        <ImageHeader
                            verticalHeight={0}
                        />
                    {/* </View> */}
                    {
                        navigationOptions.map((option, index) => {
                            const activeRoute = this.getActiveRoute(this.props.navigation.state)
                            const focused = activeRoute.routeName && activeRoute.routeName == option.navigateTo
                            return option.visibleTo.includes(this.props.user.RoleId)
                            && (
                            <TouchableOpacity key={index}
                                onPress={() => this.navigateIt(option.navigateTo)}
                                style={ focused ? [styles.section, styles.activeSection] : styles.section}
                            >
                                <CustomIcon isActive={focused}  icon={ option.icon || '' } type={option.iconType || ''} />
                                {/* <Icon key={RandomInteger()} name='schedule' color={brandColors.darkBrown} /> */}
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                                    <Text key={index} style={styles.sectionHeadingStyle}>{option.label}</Text>
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
        // paddingTop: 20,
        // flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%'
    },

    sectionHeadingStyle: {
        paddingHorizontal: 5,
        color: brandColors.darkBrown,
        fontSize: RFValue(16),
        textAlignVertical: 'center',
        textAlign: 'left',
        fontFamily: 'Lato-HeavyItalic'
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        paddingLeft: 5,
        borderBottomColor: '#a9b1bc',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    activeSection: {
        backgroundColor: brandColors.lightGreen,
        paddingVertical: 10,
    },
});

NavigationMenu.propTypes = {
    navigation: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: getUser(state)
    }
};

export default connect(mapStateToProps)(NavigationMenu)