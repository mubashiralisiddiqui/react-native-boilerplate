import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { brandColors, RFValue } from '../../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Collapsable = (props) => {
    const {
        title = 'Title',
        HeaderIcon = null,
        Header = null,
        Body = null,
        isCollapsed = false,
        toggler,
        section
    } = props;

    const toggleMe = () => requestAnimationFrame( () => toggler(section)) 
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
                            <TouchableWithoutFeedback onPress={toggleMe} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: brandColors.darkBrown, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                {HeaderIcon}
                                <Text style={{ fontSize: RFValue(26), textAlign: 'center', color: brandColors.lightGreen, padding: 5, fontFamily: 'Lato-HeavyItalic' }}>{title}</Text>
                                <Icon name={(isCollapsed) ? 'angle-up' : 'angle-down'} size={ RFValue(35) } color={brandColors.lightGreen} />
                            </TouchableWithoutFeedback>
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

export default Collapsable