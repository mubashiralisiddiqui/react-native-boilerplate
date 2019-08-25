import { brandColors } from '../../../constants'
import { RFValue } from 'react-native-responsive-fontsize';
export const styles = {
    heading: {
        fontFamily: 'Lato-Medium',
        textAlign: 'center',
        color: brandColors.darkBrown,
        fontSize: RFValue(30)
    },
    checkbox: {
        height: 50,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        flex: 1,
        flexDirection: 'column'
    },
}