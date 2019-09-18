import React from 'react';
import { View, NativeModules, Keyboard } from 'react-native';
import FieldHeader from '../FieldHeader';
import { Input } from 'react-native-elements';
import { styles, getQuantityOrNameOfSelectedGift } from '../../../constants';
import { defaultPropValues, propTypes } from './defaultPropTypesValues'

const GiftField = ({
    showGifts,
    selectedGift,
    gifts
}) => {
    const onFocus = () => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        showGifts()
    }
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}> 
                <FieldHeader
                    title="Gift Details"
                />
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{width: "50%"}}>
                        <Input inputStyle={styles.inputStyle} onFocus={onFocus} labelStyle={styles.labelStyle} label="Gift" placeholder="Select Gift" value={getQuantityOrNameOfSelectedGift(selectedGift, gifts)} />
                    </View>
                    <View style={{width: "50%"}}>
                        <Input inputStyle={styles.inputStyle} onFocus={onFocus} labelStyle={styles.labelStyle} label="Quantity" placeholder="Quantity" value={`${getQuantityOrNameOfSelectedGift(selectedGift, gifts, 'qty')}`} />
                    </View>
                </View>
            </View>
        </View>
    );
}

GiftField.propTypes = propTypes
GiftField.defaultProps = defaultPropValues;

export default GiftField;