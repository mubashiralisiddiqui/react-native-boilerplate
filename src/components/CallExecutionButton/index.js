import React, { PureComponent } from 'react'
import {Button} from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';
import { MaterialIcon } from '../Icons'
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

class CallExecutionButton extends PureComponent {

    animated = new Animated.Value(0)

    componentDidMount() {
        Animated.timing(this.animated, {
            toValue: 1,
            duration: 300,
        }).start();
    }

    render() {
        const {
            onPress,
            disabled = false,
        } = this.props;

        return (
            <Animatable.View duration={300} easing="ease-in" animation="slideInDown" direction="alternate" style={{
                position: 'absolute', 
                right: RFValue(50),
                bottom:RFValue(50),
                zIndex: 1000000
            }}>
            <Button
                ViewComponent={LinearGradient}
                linearGradientProps={brandColors.linearGradientSettings}
                raised
                buttonStyle={{
                    width: RFValue(75),
                    height: RFValue(75),
                    borderRadius: RFValue(37),
                    backgroundColor: brandColors.lightGreen,
                }}
                containerStyle={{
                    width: RFValue(75),
                    height: RFValue(75),
                    borderRadius: RFValue(40),
                    backgroundColor: brandColors.lightGreen,
                }}
                icon={<MaterialIcon
                        name="check-circle"
                        color={brandColors.darkBrown}
                        size={RFValue(55)}
                        onPress={onPress}
                    />}
                disabled={disabled}
            />
            </Animatable.View>
        );
    }
}

// const CallExecutionButton = ({
//     onPress,
//     disabled = false,
// }) => {
//     return (
//         <Button
//             ViewComponent={LinearGradient}
//             linearGradientProps={brandColors.linearGradientSettings}
//             raised
//             buttonStyle={{
//             width: RFValue(75),
//             height: RFValue(75),
//             borderRadius: RFValue(37),
//             backgroundColor: brandColors.lightGreen,
//             }}
//             containerStyle={{
//                 width: RFValue(75),
//                 height: RFValue(75),
//                 borderRadius: RFValue(40),
//                 backgroundColor: brandColors.lightGreen,
//                 position: 'absolute',
//                 right: RFValue(50),
//                 bottom:RFValue(50),
//                 zIndex: 1000000
//             }}
//             icon={<MaterialIcon
//                     name="check-circle"
//                     color={brandColors.darkBrown}
//                     size={RFValue(55)}
//                     onPress={onPress}
//                 />}
//             disabled={disabled}
//         />
//     );
// }

// CallExecutionButton.propTypes = {
//     onPress: PropTypes.func.isRequired,
//     disabled: PropTypes.bool,
// }

export default CallExecutionButton;
