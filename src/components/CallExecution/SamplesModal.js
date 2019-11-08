import React, { useState } from 'react';
import {View, FlatList, TouchableWithoutFeedback} from 'react-native';
import { Button, Text, Overlay, ListItem, Badge } from 'react-native-elements';
import { ImageBackgroundWrapper } from '..';
import { brandColors, RandomInteger, RFValue } from '../../constants';
import { useSelector } from 'react-redux';
import Counter from 'react-native-counters'
import LinearGradient from 'react-native-linear-gradient';
import { getSamples } from '../../reducers/productsReducer';

const SamplesModal = ({
    isVisible = false,
    selectedSamples,
    onCloseHandler,
    onPressSampleHanlder,
    setSamplesCountHandler,
    selectedProductId,
}) => {
    const [selected, setSelected] = useState(selectedSamples)
    
    const samples = useSelector(getSamples).filter(sample => sample.ProductTemplateId == selectedProductId)

    const showNoSamplesAlert = () => alert('No Samples available, please contact IT Support.')
    
    const _closeAndUnselect = () => onCloseHandler(true);
    
    const _close = () => onCloseHandler(false);

    const _renderSamples = ({ item }) => {
        let selected = selectedSamples.filter(sample => sample.ProductId === item.ProductId)
        let style = selected[0] === undefined
        ? [styles.listItems, styles.unSelectedItem]
        : [styles.selectedItem, styles.listItems]
        let titleStyle = selected[0] === undefined
        ? styles.unSelectedTitle
        : styles.selectedTitle
        
        return (<ListItem
            Component={TouchableWithoutFeedback}
            underlayColor='transparent'
            key={RandomInteger()}
            containerStyle={style}
            titleStyle={titleStyle}
            bottomDivider
            disabled={item.OnHandQty <= 0}
            disabledStyle={{ backgroundColor: '#ece8e7' }}
            onPress={() => onPressSampleHanlder(item.ProductId)}
            rightElement={
                selected[0] !== undefined
                ? <Counter start={selected[0].SampleQty} max={item.OnHandQty} onChange={(number, type) => setSamplesCountHandler(number, type, item.ProductTemplateId)} /> 
                : item.OnHandQty <= 0 && <Badge textStyle={{fontSize: RFValue(11), fontFamily: 'Lato-Regular' }} status="error" value="No Samples" onPress={showNoSamplesAlert} />
            }
            title={item.ProductName} />)
    }

    return (
        <Overlay
            animationType={'slide'}
            overlayBackgroundColor="#ddd"
            borderRadius={20}
            width="75%"
            height="50%"
            onBackdropPress={_closeAndUnselect}
            isVisible={isVisible}
            children={
                <ImageBackgroundWrapper>
                    <View style={{ width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={styles.flatList}>
                            <Text style={styles.listTitle}>Select Sample</Text>
                            <FlatList
                                extraData={selected}
                                contentContainerStyle={{height: 220}}
                                keyExtractor={item => `${item.ProductId} + ${RandomInteger()}`}
                                data={samples}
                                renderItem={_renderSamples}
                            />
                        </View>
                    </View>
                    <View style={{width:'98%', height: 150, display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        {

                            <View style={{flexDirection: 'row'}}>
                                {/* <View style={styles.buttonContainer}>
                                    <Button buttonStyle={styles.button} onPress={_close} title="Unselect Both" />
                                </View> */}
                                <View style={styles.buttonContainer}>
                                    <Button
                                        ViewComponent={LinearGradient}
                                        linearGradientProps={brandColors.linearGradientSettings}
                                        buttonStyle={styles.button}
                                        onPress={_closeAndUnselect}
                                        title="Unselect"
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        ViewComponent={LinearGradient}
                                        linearGradientProps={brandColors.linearGradientSettings}
                                        buttonStyle={styles.button}
                                        onPress={_close}
                                        title="Done"
                                    />
                                </View>
                            </View>
                        }
                    </View>
                </ImageBackgroundWrapper>
            }
        />
        
    );
}


const styles = {
    button: {
        marginVertical: 5,
        borderRadius: 33,
        width: '100%',
        backgroundColor: brandColors.lightGreen,
        position: 'relative'
    },
    buttonContainer: {
        width: '49%',
        marginHorizontal: 5,
    },
    flatList: {
        width: '100%',
        marginHorizontal: 5,
    },
    listTitle: {
        fontSize: RFValue(18),
        fontFamily: 'Lato-Medium',
        backgroundColor: brandColors.darkBrown,
        borderRadius: 10,
        padding: 5,
        width: '99.8%',
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
    }
}
export default SamplesModal; 