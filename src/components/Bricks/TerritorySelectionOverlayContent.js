import React, { useContext } from 'react'
import { View } from 'react-native'
import { ImageBackgroundWrapper } from '..'
import { Text, ListItem, Badge } from 'react-native-elements'
import { brandColors, RFValue } from '../../constants'
import { ScrollView } from 'react-native-gesture-handler'
import { getBricks } from './reducer'
import { useSelector } from 'react-redux'
import { BricksContext } from '.'

const TerritorySelectionOverlayContent = (props) => {
    const territories = useSelector(getBricks)
    const bricksContext = useContext(BricksContext)
    const { state: {data} } = bricksContext;
    
    return (
        <ImageBackgroundWrapper>
            <View>
                <Text style={{
                    backgroundColor: brandColors.darkBrown,
                    color: brandColors.green,
                    textAlign: 'left',
                    height: RFValue(35),
                    borderRadius: 10,
                    fontSize: RFValue(20),
                    fontFamily: 'Lato-HeavyItalic',
                    paddingLeft: 5,
                }}>
                    Select Territory to add brick in
                </Text>
                <ScrollView>
                    {
                        Object.keys(territories)
                            .filter(territoryId => territoryId != props.selectedBrick.TerritoryId)
                            .map(territoryId => {
                                const ifAlreadySelected = data.filter(el => {
                                    return el.BrickId == props.selectedBrick.BrickId
                                        && el.TerritoryId == territoryId
                                }).length > 0
                                return (
                                    <ListItem
                                        onPress={() => { props.onPress(props.selectedBrick, true, territories[territoryId][0]); props.toggleVisibility()}}
                                        disabled={ifAlreadySelected}
                                        key={territoryId}
                                        bottomDivider
                                        containerStyle={{ backgroundColor: 'transparent' }}
                                        title={territories[territoryId][0].TerritoryCode}
                                        chevron={ifAlreadySelected && <Badge status="success" value="Already Selected to add for this berick"  />}
                                    />
                                )
                        })
                    }
                </ScrollView>
            </View>
        </ImageBackgroundWrapper>
    )
}

export default TerritorySelectionOverlayContent