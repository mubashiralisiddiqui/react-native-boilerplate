import React from 'react';
import {View, FlatList} from 'react-native';
import { Button, Text, Overlay, ListItem } from 'react-native-elements';
import { ImageBackgroundWrapper } from '..';
import Counter from "react-native-counters";
import { brandColors, RandomInteger, RFValue } from '../../constants';

const GiftsModal = ({
    gifts = [],
    onCloseHandler = () => {},
    selectedGift,
    onPressGiftHandler = () => {},
    isVisible = false,
}) => {

    const _render = ({ item }) => {
        return (
            <ListItem
                key={RandomInteger()}
                containerStyle={styles.listItems}
                titleStyle={styles.unSelectedTitle}
                bottomDivider
                onPress={() => onPressGiftHandler(item.GiftId)}
                containerStyle={styles.listItems}
                rightElement={(selectedGift[0] !== undefined && selectedGift[0].GiftId === item.GiftId) ? <Counter start={selectedGift[0].GiftQty} max={5} onChange={(number, type) => onPressGiftHandler(item.GiftId, number)} /> : null}
                title={item.GiftName}
            />
        )
    }
    return (
        <Overlay
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            width={'75%'}
            height={'75%'}
            onBackdropPress={() => onCloseHandler(true)}
            isVisible={isVisible}
            children={
                <ImageBackgroundWrapper>
                    <View style={{width:'100%', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{ width: '98%', marginHorizontal: 5}}>
                            <Text style={styles.listTitle}>Select Gift</Text>
                            <FlatList
                                contentContainerStyle={{height: '70%'}}
                                keyExtractor={ item => `${item.GiftId} + ${RandomInteger()}`}
                                data={gifts}
                                renderItem={_render}
                            />
                        </View>
                    </View>
                    <View style={{width:'98%', display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.flatList}>
                                <Button
                                    buttonStyle={styles.button}
                                    onPress={() => onCloseHandler(true)}
                                    title="No need to select Gift"
                                />
                            </View>
                            <View style={styles.flatList}>
                                <Button
                                    buttonStyle={styles.button}
                                    onPress={() => onCloseHandler(false)}
                                    title="Done" />
                            </View>
                        </View>
                    </View>
                </ImageBackgroundWrapper>
            }
        />
        
    );
}


const styles = {
    button: {
        marginVertical: 5,
        width: '100%',
        backgroundColor: brandColors.lightGreen,
        position: 'relative'
    },
    flatList: {
        width: '48%',
        marginHorizontal: 5,
    },
    listTitle: {
        backgroundColor: brandColors.darkBrown,
        color: brandColors.lightGreen,
        fontFamily: 'Lato-MediumItalic',
        borderRadius: 10,
        padding: 5,
        width: '99.8%',
        fontSize: RFValue(18),
    },
    listItems: {
        width: '99%',
        height: 45,
        backgroundColor: 'transparent',
    },
}
export default GiftsModal;