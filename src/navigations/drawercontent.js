import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { ImageHeader, DrawerElement, AppVersion } from '../components';
import { navigationOptions, brandColors, RFValue, RandomInteger } from '../constants'
import { FontAwesome5Icon, MaterialCommunityIcon, AntDesignIcon, FontAwesomeIcon } from '../components/Icons'
import AsyncStorage from '@react-native-community/async-storage';

class NavigationMenu extends Component {
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
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 0, width: '100%' }}>
                    <ImageHeader
                        verticalHeight={0}
                    />
                    {
                        navigationOptions.map((option, index) => {
                            const activeRoute = this.getActiveRoute(this.props.navigation.state)
                            const focused = activeRoute.routeName && activeRoute.routeName == option.navigateTo
                            return (
                                <DrawerElement
                                    key={`${RandomInteger()}`}
                                    focused={focused}
                                    styles={styles}
                                    navigate={this.navigateIt}
                                    index={index}
                                    option={option}
                                    CustomIcon={this.getIcon}
                                />
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity key={'asd'}
                    style={{ width: '90%', marginTop: 10 }}>
                </TouchableOpacity>
                <View style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignContent: 'center', marginHorizontal: 10, marginVertical: 10,}}>
                    <AppVersion />
                </View>
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
        width: '100%',
        height: '100%'
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
export default NavigationMenu