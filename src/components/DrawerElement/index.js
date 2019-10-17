import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import {Text} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { brandColors, RandomInteger } from '../../constants'
import { useSelector } from 'react-redux'
import { getUser } from '../../reducers/authReducer'

const DrawerElement = (props) => {
    const { CustomIcon, focused, index, option, navigate, styles } = props
    const user = useSelector(getUser)
    if(! option.visibleTo.includes(user.RoleId)) return null;
    if(focused) {
        return (<LinearGradient key={RandomInteger()} {...brandColors.linearGradientSettings}>
            <TouchableOpacity key={`${RandomInteger()}`}
                onPress={() => navigate(option.navigateTo)}
                style={[styles.section, styles.activeSection, { backgroundColor: 'transparent'}]}
            >
                <CustomIcon isActive={focused}  icon={ option.icon || '' } type={option.iconType || ''} />
                <View key={`${RandomInteger()}`} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                    <Text key={`${RandomInteger()}`} style={[styles.sectionHeadingStyle, {color: '#fff'}]}>{option.label}</Text>
                </View>
            </TouchableOpacity>    
        </LinearGradient>)
    }
    return  (
        <TouchableOpacity key={`${RandomInteger()}`}
            onPress={() => navigate(option.navigateTo)}
            style={ focused ? [styles.section, styles.activeSection] : styles.section}
        >
            <CustomIcon  key={`${RandomInteger()}`} isActive={focused}  icon={ option.icon || '' } type={option.iconType || ''} />
            <View key={`${RandomInteger()}`} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                <Text key={`${RandomInteger()}`} style={styles.sectionHeadingStyle}>{option.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DrawerElement;