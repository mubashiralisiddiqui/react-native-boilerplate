import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import {Text} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { brandColors } from '../../constants'

const DrawerElement = (props) => {
    const { CustomIcon, focused, index, option, navigate, styles } = props
    if(focused) {
        return (<LinearGradient {...brandColors.linearGradientSettings}>
            <TouchableOpacity key={index}
                onPress={() => navigate(option.navigateTo)}
                style={[styles.section, styles.activeSection, { backgroundColor: 'transparent'}]}
            >
                <CustomIcon isActive={focused}  icon={ option.icon || '' } type={option.iconType || ''} />
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                    <Text key={index} style={[styles.sectionHeadingStyle, {color: '#fff'}]}>{option.label}</Text>
                </View>
            </TouchableOpacity>    
        </LinearGradient>)
    }
    return  (
        <TouchableOpacity key={index}
            onPress={() => navigate(option.navigateTo)}
            style={ focused ? [styles.section, styles.activeSection] : styles.section}
        >
            <CustomIcon isActive={focused}  icon={ option.icon || '' } type={option.iconType || ''} />
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                <Text key={index} style={styles.sectionHeadingStyle}>{option.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DrawerElement;