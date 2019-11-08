import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { RandomInteger, RFValue, brandColors } from '../../constants';
import { Animated, Easing, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { FlatList } from 'react-native-gesture-handler';
import { TerritoryListBrickItem, TerritorySelectionOverlay } from '..';

export default class TerritoryListItem extends Component {
    constructor (props) {
        super(props)
        this.arrowAnimation = new Animated.Value(0)
        this.viewAnimation = new Animated.Value(0)
        this.state = {
            isCollapsed: false,
            selectedBrickId: 0,
            selectedTerritoryId: 0,
            selectedBrick: {},
            isManaging: false,
        }
    }

    selectBrickId = (brick) => {
        this.setState({
            selectedBrickId: brick.BrickId,
            selectedTerritoryId: brick.TerritoryId,
            selectedBrick: brick,
        })
    }

    toggleManagementView = () => {
        this.setState(state => {
            return {
                isManaging: !state.isManaging
            }
        })
    }

    animate () {
        this.arrowAnimation.setValue(0)
        this.viewAnimation.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
          return Animated.timing(
            value,
            {
              toValue: 1,
              duration,
              easing: Easing.inOut(easing),
              delay
            }
          )
        }
        Animated.parallel([
            createAnimation(this.arrowAnimation, 400, Easing.ease),
            createAnimation(this.viewAnimation, 200, Easing.ease),
        ]).start()
    }

    componentDidMount() {
        this.animate();
    }

    toggleCollapse = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        }, this.animate)
    }

    render() {
        const {
            isManaging,
            isCollapsed,
            selectedBrickId,
            selectedTerritoryId,
            selectedBrick,
        } = this.state
        const { territory, bricks, onAddData } = this.props

        const spinIcon = this.arrowAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: isCollapsed ? ['0deg', '180deg'] : ['180deg', '360deg']
        })

        const scale = this.viewAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: isCollapsed ? [0, 1] : [1, 0]
        })

        const AnimatedIcon = Animated.createAnimatedComponent(Icon)


        return (
            <View style={{ alignItems: 'center', width: '100%'}}>
                <ListItem
                    // Component={TouchableWithoutFeedback}
                    underlayColor={'transparent'}
                    key={RandomInteger()}
                    title={territory.TerritoryCode}
                    titleStyle={{ color: brandColors.lightGreen, fontSize: RFValue(16), fontFamily: 'Lato-HeavyItalic' }}
                    containerStyle={{
                        marginVertical: 10,
                        borderRadius: 10,
                        borderWidth: 2,
                        width: '90%',
                        backgroundColor: brandColors.darkBrown
                    }}
                    onPress={ this.toggleCollapse }
                    chevron={<AnimatedIcon
                            size={20}
                            name={'angle-down'}
                            color={brandColors.lightGreen}
                            style={{ transform: [{rotate: spinIcon}] }}
                        />}
                />
                <Animated.View style={{ alignItems: 'center', width: '100%', transform: [{scale }] }}>
                    {
                        isCollapsed && <FlatList style={{width: '90%'}}
                            initialNumToRender={20}
                            keyExtractor={item => `${item.TerritoryId}${RandomInteger()}`}
                            data={bricks}
                            renderItem={(props) => <TerritoryListBrickItem
                                onDataRemoval={() => onAddData(props.item, false)}
                                onDataAddition={() => onAddData(props.item, true)}
                                onPressAdd={this.toggleManagementView}
                                showOptions={selectedBrickId === props.item.BrickId}
                                onLongPress={this.selectBrickId}
                                {...props}
                                />
                            }
                        />
                    }
                </Animated.View>
                <TerritorySelectionOverlay
                    selectedBrickId={selectedBrickId}
                    selectedTerritoryId={selectedTerritoryId}
                    selectedBrick={selectedBrick}
                    onPress={onAddData}
                    visible={isManaging}
                    toggleVisibility={this.toggleManagementView}
                />
            </View>
        )
    }
}
