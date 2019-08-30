import React from 'react';
import {View, FlatList, TouchableWithoutFeedback} from 'react-native';
import { Button, Text, Overlay, ListItem, Badge } from 'react-native-elements';
import { ImageBackgroundWrapper } from '..';
import { brandColors, RandomInteger, RFValue } from '../../constants';
import { useSelector } from 'react-redux';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ProductsModal = ({
    isVisible = false,
    selectedProductId = 0,
    onCloseHandler,
    onPressProductHandler,
    selectedProducts,
    reminderPosition,
    existingCall,
}) => {
    const products = useSelector(state => state.products.products)
    const _renderProduct = ({ item }) => {
        const shouldBeDisabled = ! _.isEmpty(_.find(selectedProducts, { ProductId: item.ProductTemplateId, IsReminder: false }))
        let selected = selectedProductId === item.ProductTemplateId
        let style = styles.listItems;
        style = selected ? [style, styles.selectedItems] : style
        let titleStyle = selected ? styles.selectedTitle : styles.unSelectedTitle
        return (
            <ListItem
                Component={TouchableWithoutFeedback}
                underlayColor='transparent'
                disabled={shouldBeDisabled}
                containerStyle={style}
                rightTitle={ selected ? <Badge status="success" value="selected" /> : shouldBeDisabled ? <Badge badgeStyle={{ backgroundColor: brandColors.green }} value={existingCall ? 'Planned' : 'Selected'} /> : null }
                titleStyle={titleStyle}
                rightSubtitle={shouldBeDisabled && reminderPosition != 0 ? 'Cannot be selected as reminder' : null}
                key={item.ProductTemplateId}
                bottomDivider
                onPress={() => onPressProductHandler(item.ProductTemplateId)}
                title={item.ProductTemplateName}
            />
        )
    }
    const _closeAndUnselect = () => onCloseHandler(true);
    const _close = () => onCloseHandler(false);
    // console.log(selectedProductId, 'selected')

    return (
        <Overlay
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            width="60%"
            height="50%"
            onBackdropPress={_close}
            isVisible={isVisible}
            children={
                <ImageBackgroundWrapper>
                    <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={styles.flatList}>
                            <Text style={styles.listTitle}>Select Product</Text>
                            <FlatList
                                extraData={selectedProductId}
                                keyExtractor={item => `${item.ProductTemplateId} + ${RandomInteger()}`}
                                data={products}
                                renderItem={_renderProduct}
                            />
                        </View>
                    </View>
                    <View style={{width:'98%', height: 150, display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row'}}>
                            {/* <View style={styles.buttonContainer}>
                                <Button buttonStyle={styles.button} onPress={_close} title="Unselect Both" />
                            </View> */}
                            {
                                selectedProductId > 0
                                ? <View style={styles.buttonContainer}>
                                    <Button
                                        buttonStyle={styles.button}
                                        onPress={_closeAndUnselect}
                                        title="Unselect"
                                    />
                                </View>
                                : null
                            }
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
    buttonContainer: {
        width: '100%',
        marginHorizontal: 5,
    },
    flatList: {
        width: '100%',
        marginHorizontal: 5,
    },
    listTitle: {
        fontSize: RFValue(18),
        fontFamily: 'Lato-MediumItalic',
        backgroundColor: brandColors.darkBrown,
        borderRadius: 10,
        padding: 5,
        width: '100%',
        color: brandColors.lightGreen,
    },
    listItems: {
        width: '99%',
        height: 45,
        backgroundColor: 'transparent',
    },
    selectedTitle: {
        fontSize: RFValue(16),
        fontFamily: 'Lato-MediumItalic'
    },
    unSelectedTitle: {
        fontSize: RFValue(16),
        fontFamily: 'Lato-Medium'
    }
}
export default ProductsModal; 