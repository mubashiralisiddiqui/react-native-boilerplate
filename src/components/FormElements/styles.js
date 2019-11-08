import { StyleSheet } from 'react-native'
import { brandColors, RFValue } from '../../constants'

const styles = StyleSheet.create({
    checkboxContainer: {
        backgroundColor: 'transparent',
    },
    checkboxTextStyle: {
        color: brandColors.darkBrown,
        fontFamily: 'Lato-BoldItalic',
        fontSize: RFValue(18)
    },
    inputOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        justifyContent: 'center',
        height: 55,
        alignItems: 'center',
        borderRadius: 33,
        borderWidth: 1,
        borderColor: brandColors.darkBrown,
        width: '100%',
        marginVertical: 12,

    },
    input: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        color: brandColors.darkBrown,
        borderBottomWidth: 0
    },
})

export default styles;