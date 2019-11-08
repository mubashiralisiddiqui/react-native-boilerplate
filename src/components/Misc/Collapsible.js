import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Text } from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import Fade from '../Animations/Fade';

export default class Collapsable extends PureComponent {

    constructor (props) {
        super(props)
        this.animatedValue2 = new Animated.Value(0)
        this.state = {
            isCollapsed: props.shouldBeCollapsed
        }
    }

    componentDidMount() {
        this.animate();
    }

    toggleCollapsed = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        }, this.animate);
    }


    animate () {
        this.animatedValue2.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
          return Animated.timing(
            value,
            {
              toValue: 1,
              duration,
              easing: Easing.inOut(Easing.ease),
              delay
            }
          )
        }
        Animated.parallel([
            createAnimation(this.animatedValue2, 500, Easing.ease),
        ]).start()
    }



    render() {
        const {
            title = 'Title',
            HeaderIcon = null,
            Header = null,
            Body = null,
            shouldBeCollapsed = false,
        } = this.props;

        const { isCollapsed } = this.state
        const spinIcon = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: isCollapsed ? ['0deg', '180deg'] : ['180deg', '360deg']
        })

        const AnimatedIcon = Animated.createAnimatedComponent(Icon)

        return (
            <View
                style={{ marginBottom: 5 }}
                isCollapsed={isCollapsed}
            >
                <View>
                    {
                        (Header) ?
                            <Header isCollapsed={isCollapsed} />
                            :
                            <TouchableWithoutFeedback onPress={this.toggleCollapsed} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: brandColors.darkBrown, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                {HeaderIcon}
                                <Text style={{ fontSize: RFValue(26), textAlign: 'center', color: brandColors.lightGreen, padding: 5, fontFamily: 'Lato-HeavyItalic' }}>{title}</Text>
                                <AnimatedIcon style={{ transform: [{rotate: spinIcon}] }} name={'angle-down'} size={ RFValue(35) } color={brandColors.lightGreen} />
                            </TouchableWithoutFeedback>
                    }
                </View>
                <View>
                    <Fade visible={isCollapsed}>
                        { Body }
                    </Fade>
                </View>
            </View>
        );
    }
}