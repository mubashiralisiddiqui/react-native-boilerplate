import React, { useCallback, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { ImageBackgroundWrapper, NoItemsInTheList } from '..';
import { Text, Button } from 'react-native-elements';
import { brandColors, RFValue, RandomInteger, RHValue } from '../../constants';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getRequestedMappings } from './reducer';
import LinearGradient from 'react-native-linear-gradient';
import ReviewChangesListItem from './ReviewChangesListItem';


const PendingRequestsOverlayContent = (props) => {

    const mappingRequest = useSelector(getRequestedMappings)[0] || { RequestDetails: [] };
    /* For debugging the height and scrolling */
    // const s = useSelector(getRequestedMappings);
    // let mappingRequest = _.concat(...(_.map(s, 'RequestDetails')), ..._.concat(...(_.map(s, 'RequestDetails'))))
    const renderItem = useCallback((props) => {
        return (
            <ReviewChangesListItem {...props} isPending={true} />
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
                    justifyContent: 'center',
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
                        Your last submitted Mapping Request
                    </Text>
                </View>
                <View style={{ maxHeight: RHValue() }}>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 0, }}
                        ListEmptyComponent={<NoItemsInTheList />}
                        // data={mappingRequest} // For debugging
                        data={mappingRequest.RequestDetails}
                        scrollEnabled
                        keyExtractor={() =>  `-${RandomInteger()}`}
                        renderItem={renderItem}
                    />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    width: '100%',
                    marginBottom: 10,
                }}>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button
                            onPress={props.toggleVisibility}
                            containerStyle={{
                                width: '48%',
                                marginHorizontal: 3,
                                alignContent: 'center',
                                marginBottom: 10,
                            }}
                            title="Close"
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

export default PendingRequestsOverlayContent