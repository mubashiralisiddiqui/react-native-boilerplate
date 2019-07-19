
import { StyleSheet } from 'react-native';
import { brandColors } from '../../constants'
export const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 10,
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 10,
        borderRadius: 33,
        borderWidth: 1,
        borderColor: brandColors.darkBrown,
        width: '80%',
        marginVertical: 12,

    },
    input: {
        display: 'flex',
        flex: 0.8,
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