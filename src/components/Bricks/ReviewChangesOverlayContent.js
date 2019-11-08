import React, { useContext, useCallback, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { ImageBackgroundWrapper, NoItemsInTheList } from '..';
import { Text, Button } from 'react-native-elements';
import { brandColors, RFValue, RandomInteger, RHValue } from '../../constants';
import { FlatList } from 'react-native-gesture-handler';
import { BricksContext } from '.';
import { getBricksLoading } from './reducer';
import LinearGradient from 'react-native-linear-gradient';
import ReviewChangesListItem from './ReviewChangesListItem';


const ReviewChangesOverlayContent = (props) => {

    const bricksContext = useContext(BricksContext);
    const loading = useSelector(getBricksLoading)
    const { state: { data } } = bricksContext;

    const { onPressRemove } = props;

    const renderItem = useCallback((props) => {
        return (
            <ReviewChangesListItem {...props} onPressRemove={onPressRemove} />
        )
    })

    const [width, setWidth] = useState(Dimensions.get('screen').width);
    const onLayout = useCallback((e) => {
        setWidth(Dimensions.get('screen').width)
    })

    return (
        <ImageBackgroundWrapper>
            <View onLayout={onLayout} style={{
                flex: 1,
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        backgroundColor: brandColors.darkBrown,
                        color: brandColors.green,
                        textAlign: 'left',
                        height: RFValue(35),
                        borderRadius: 10,
                        fontSize: RFValue(18),
                        fontFamily: 'Lato-HeavyItalic',
                        paddingLeft: 5,
                    }}>
                    Review All the Changes
                    </Text>
                </View>
                <View style={{ maxHeight: RHValue() }}>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 0, }}
                        ListEmptyComponent={<NoItemsInTheList />}
                        data={data}
                        scrollEnabled
                        keyExtractor={() =>  `-${RandomInteger()}`}
                        renderItem={renderItem}
                    />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Button
                            onPress={props.toggleVisibility}
                            containerStyle={{
                                width: '48%',
                                marginHorizontal: 3
                            }}
                            title="Make more changes"
                            ViewComponent={LinearGradient}
                            linearGradientProps={ brandColors.linearGradientSettings }
                            buttonStyle={{
                                borderRadius: 25,
                            }}
                        />
                        <Button
                            loading={loading}
                            onPress={props.onPressSubmit}
                            disabled={data.length === 0 || loading}
                            containerStyle={{
                                width: '48%',
                                marginHorizontal: 3
                            }}
                            title="Submit"
                            ViewComponent={LinearGradient}
                            linearGradientProps={ brandColors.linearGradientSettings }
                            buttonStyle={{
                                borderRadius: 25,
                            }}
                        />
                    </View>
                </View>
            </View>
        </ImageBackgroundWrapper>
    )
}

export default ReviewChangesOverlayContent