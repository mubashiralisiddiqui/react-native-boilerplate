
import { StyleSheet } from 'react-native';
const brandColors = {
    darkBrown: '#514835',
    green: '#11B14C',
    lightGreen: '92C83E'
}
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
        color: 'black',
    }
})