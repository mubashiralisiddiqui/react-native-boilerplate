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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

class NavigationMenu extends Component {
    state = {
        name: '',
        activeTab: 1,
        affiliationCode: ''
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

    getIcon = ({icon, type}) => {
        switch(type) {
            case 'FontAwesome5': {
                return (
                    <FontAwesome5Icon name={icon} size={20} color={brandColors.lightGreen} />
                )
            }
            case 'AntDesign': {
                return (
                    <AntDesignIcon name={icon} size={20}  color={brandColors.lightGreen} />
                )
            }
            case 'MaterialCommunityIcon': {
                return (
                    <MaterialCommunityIcon name={icon} size={20}  color={brandColors.lightGreen} />
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
        // if(to != 'Login') {
        //     this.props.navigation.navigate(to)
        //     return
        // }
        // this.logout()
    })


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
                            return (
                            <TouchableOpacity key={index}
                                onPress={() => this.navigateIt(option.navigateTo)}
                                style={styles.section}
                            >
                                <CustomIcon  icon={ option.icon || '' } type={option.iconType || ''} />
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
        fontFamily: 'Lato-Heavy'
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        marginLeft: 10,
        borderBottomColor: '#a9b1bc',
        // borderBottomWidth: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
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