import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { brandColors } from '../../constants';

export default class Collabsable extends Component {

    /**
     * 
     * To toggling the collapse bar
     */

    render() {
        const { 
            title = 'Title',
            HeaderIcon = null,
            Header = null,
            Body = null,
            isCollapsed = false,
            toggler = () => { alert(44)},
         } = this.props;

        return (
            <View
                style={{ marginBottom: 5 }}
                isCollapsed={isCollapsed}
                onToggle={toggler}>
                <View>
                    {
                        (Header) ?
                            <Header isCollapsed={isCollapsed} />
                            :
                            <TouchableOpacity onPress={toggler} style={{ backgroundColor: '#706349', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                {HeaderIcon}
                                <Text style={{ textAlign: 'center', color: brandColors.green, padding: 5 }} h2>{title}</Text>
                                <Icon name={(isCollapsed) ? 'angle-up' : 'angle-down'} size={30} color={brandColors.green} />
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <View>
                        {isCollapsed && Body}
                    </View>
                </View>
            </View>
        );
    }
}