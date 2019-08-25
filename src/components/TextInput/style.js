
import { StyleSheet } from 'react-native';
import { brandColors } from '../../constants'
export const styles = StyleSheet.create({
    outerContainer: {
        // display: 'flex',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        // flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        borderRadius: 33,
        borderWidth: 1,
        borderColor: brandColors.darkBrown,
        width: '100%',
        marginVertical: 12,

    },
    input: {
        // display: 'flex',
        // flex: 1,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        color: 'white',
        borderBottomWidth: 0
    },
    errorStyle: {
        // paddingVertical: 15
    }
})