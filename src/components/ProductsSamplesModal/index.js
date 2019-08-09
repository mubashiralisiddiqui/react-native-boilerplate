import React from 'react';
import {View, FlatList} from 'react-native';
import { Button, Text, Overlay, ListItem } from 'react-native-elements';
import { ImageBackgroundWrapper } from '..';
import Counter from "react-native-counters";
import { brandColors, RandomInteger } from '../../constants';
import { useSelector } from 'react-redux';

const ProductsSamplesModal = ({
    isVisible = false,
    productSelectionError = '',
    selectedProductId = 0,
    reminderPosition = 0,
    samples = [],
    selectedProducts = [],
    selectedSamples = [],
    onCloseHandler = () => {},
    onPressProductHandler = () => {},
    onPressSampleHanlder = () => {},
    setSamplesCountHandler = () => {},
}) => {

    const products = useSelector(state => state.products.products)

    const _renderProduct = ({ item }) => {
        let shouldBeDisabled = false;
        if(selectedProducts[item.ProductTemplateId] !== undefined && selectedProducts[item.ProductTemplateId].IsReminder === false) {
            shouldBeDisabled = true;
        }
        let style = styles.listItems;
        style = selectedProductId === item.ProductTemplateId
        ? [style, styles.selectedItems] : style
        let titleStyle = selectedProductId === item.ProductTemplateId
        ? styles.selectedTitle : styles.unSelectedTitle
        return (
            <ListItem
                disabled={shouldBeDisabled}
                containerStyle={style}
                titleStyle={titleStyle}
                rightSubtitle={shouldBeDisabled && reminderPosition != 0 ? 'Cannot be selected as reminder' : null}
                key={item.ProductTemplateId}
                bottomDivider
                onPress={() => onPressProductHandler(item.ProductTemplateId)}
                title={item.ProductTemplateName}
            />
        )
    }

    const _renderSamples = ({ item }) => {
        let selected = selectedSamples.filter(sample => sample.ProductId === item.ProductId)
        let style = selected[0] === undefined
        ? [styles.listItems, styles.unSelectedItem]
        : [styles.selectedItem, styles.listItems]
        let titleStyle = selected[0] === undefined
        ? styles.unSelectedTitle
        : styles.selectedTitle
        return (<ListItem
            key={RandomInteger()}
            containerStyle={style}
            titleStyle={titleStyle}
            bottomDivider
            onPress={() => onPressSampleHanlder(item.ProductId)}
            rightElement={selected[0] !== undefined ? <Counter start={selected[0].SampleQty} max={10} onChange={(number, type) => setSamplesCountHandler(number, type, item.ProductTemplateId)} /> : null}
            title={item.ProductName} />)
    }

    return (
        <Overlay
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            width="95%"
            height="95%"
            onBackdropPress={() => onCloseHandler(true)}
            isVisible={isVisible}
            children={
                <ImageBackgroundWrapper>
                    <View style={{width:'100%', height: 450, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={styles.flatList}>
                            <Text h3 h3Style={styles.listTitle}>Select Product</Text>
                            <FlatList
                                keyExtractor={item => `${item.ProductTemplateId} + ${RandomInteger()}`}
                                data={products}
                                renderItem={_renderProduct}
                            />
                        </View>
                        <View style={styles.flatList}>
                            <Text h3 h3Style={styles.listTitle}>Select Sample (Select Product First)</Text>
                            <FlatList
                                contentContainerStyle={{height: 220}}
                                keyExtractor={item => `${item.ProductId} + ${RandomInteger()}`}
                                data={samples}
                                renderItem={_renderSamples}
                            />
                        </View>
                    </View>
                    <View style={{width:'98%', height: 150, display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        {
                            productSelectionError != ''
                            ?<View style={{width: '100%'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>{productSelectionError}</Text>
                            </View>
                            : null 
                        }
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.flatList}>
                                <Button
                                    buttonStyle={styles.button}
                                    onPress={() => onCloseHandler(true)}
                                    title="Unselect"
                                />
                            </View>
                            <View style={styles.flatList}>
                                <Button buttonStyle={styles.button} onPress={() => onCloseHandler(false)} title="Done" />
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
        backgroundColor: '#ece8e7',
        borderRadius: 10,
        padding: 5,
        width: '99.8%'
    },
    listItems: {
        width: '99%',
        height: 45,
        backgroundColor: 'transparent',
    },
    selectedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    unSelectedTitle: {
        fontSize: 16,
    }
}
export default ProductsSamplesModal; 