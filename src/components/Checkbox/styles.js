import { StyleSheet } from 'react-native'
import { brandColors, RFValue } from '../../constants'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: brandColors.darkBrown,
        fontFamily: 'Lato-BoldItalic',
        fontSize: RFValue(18)
    },
})

export default styles;