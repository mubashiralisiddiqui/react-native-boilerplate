import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '../Icons'

const Collapsable = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(props.shouldBeCollapsed)
    const {
        title = 'Title',
        HeaderIcon = null,
        Header = null,
        Body = null,
        shouldBeCollapsed = true,
    } = props;

    const toggleMe = () =>  setIsCollapsed(! isCollapsed)
    return (
        <View
            style={{ marginBottom: 5 }}
            isCollapsed={isCollapsed}
            onToggle={toggleMe}>
                <View>
                    {
                        (Header) ?
                            <Header isCollapsed={isCollapsed} />
                            :
                            <TouchableWithoutFeedback onPress={toggleMe} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: brandColors.darkBrown, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                {HeaderIcon}
                                <Text style={{ fontSize: RFValue(26), textAlign: 'center', color: brandColors.lightGreen, padding: 5, fontFamily: 'Lato-HeavyItalic' }}>{title}</Text>
                                <FontAwesomeIcon name={(isCollapsed) ? 'angle-up' : 'angle-down'} size={ RFValue(35) } color={brandColors.lightGreen} />
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