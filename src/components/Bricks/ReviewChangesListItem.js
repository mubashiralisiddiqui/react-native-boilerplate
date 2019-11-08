import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { MaterialIcon, MaterialCommunityIcon } from '../Icons'
import { Text, Button, Badge } from 'react-native-elements'
import { brandColors, RFValue, RandomInteger } from '../../constants'
import Animated, { Easing } from 'react-native-reanimated'

export default class ReviewChangesListItem extends PureComponent {

    constructor(props) {
        super(props)
        this.scaleItem = new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(this.scaleItem, {
            toValue: 1,
            duration : 400,
            delay: Number(this.props.index) * 150,
            easing: Easing.inOut(Easing.ease)
        }).start();
    }

    onPressRemove = () => {
        const { index, onPressRemove } = this.props;
        Animated.timing(this.scaleItem, {
            toValue: 0,
            duration : 400,
            easing: Easing.out(Easing.ease)
        }).start();
        onPressRemove(index)
    }

    render() {
        const { item, isPending = false } = this.props;

        return (
            <Animated.View
                key={item.BrickCode + RandomInteger()}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 5,
                    borderRadius: 10,
                    borderBottomWidth: 1,
                    borderColor: brandColors.lightGreen,
                    width: '100%',
                    opacity: this.scaleItem
                }}
            >
                <View style={{ width: '5%', justifyContent: 'center', alignContent: 'flex-end'}}>
                    <MaterialIcon
                        name={item.IsAddition ? 'add-circle' : 'remove-circle' }
                        color={item.IsAddition ? brandColors.green : 'red' }
                        size={RFValue(20)}
                    />
                </View>
                <View style={{
                    width: '35%',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: brandColors.lightGreen,
                        fontFamily: 'Lato-HeavyItalic',
                        fontSize: RFValue(17),
                        textAlign: 'center'
                    }}>{ ` ${item.BrickName} (${item.BrickCode}) ` }</Text>
                </View>
                <View style={{
                    width: '10%',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontFamily: 'Lato-BoldItalic',
                        fontSize: RFValue(15),
                        textAlign: 'center'
                    }}>{item.IsAddition ? 'in' : 'from' }</Text>
                </View>
                <View style={{
                    width: '35%',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: brandColors.lightGreen,
                        fontFamily: 'Lato-HeavyItalic',
                        fontSize: RFValue(17),
                        textAlign: 'center'
                    }}>{ item.TerritoryCode }</Text>
                </View>
                {!isPending && <Button
                    onPress={this.onPressRemove}
                    containerStyle={{ justifyContent: 'center' }}
                    type="clear"
                    title="Remove"
                    titleStyle={{ color: 'red', fontSize: RFValue(12), fontFamily: "Lato-MediumItalic" }}
                    icon={<MaterialCommunityIcon name="delete" color="red" size={RFValue(20)} />}
                />}
                {isPending && <Badge
                    value="Pending"
                    status="warning"
                />}
            </Animated.View>
        )
    }
}