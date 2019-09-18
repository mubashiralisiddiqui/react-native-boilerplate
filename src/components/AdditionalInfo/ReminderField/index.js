import React, { useState } from 'react';
import {
    View, Keyboard, NativeModules
} from 'react-native';
import { Input } from 'react-native-elements';
import FieldHeader from '../FieldHeader';
import { RandomInteger, styles, rangeArray, getNameFromSelectedSamples, getQuantityOfTheSelectedSamples } from '../../../constants';

const ReminderField = ({
    times = 1,
    onRemove = () => {},
    showProducts,
    selectedProduct,
    selectedSamples,
    showSamples,
}) => {
    const onFocus = (selectedProduct, position, type = 'product') => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        type == 'product'
        ? showProducts(selectedProduct, position, 'reminder')
        : showSamples(selectedProduct, position, 'reminder');
    }
    return (
        <View style={styles.container}>
            {
                rangeArray(times).map((value, key) => {
                    let product = _.find(selectedProduct, { position: key + 1, IsReminder: true }) || []
                    return (
                        <View key={ key + RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title={`Reminder ${ key +1 } Details`}
                                field="reminderFieldsCount"
                                fieldType="reminder"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input inputStyle={styles.inputStyle} onFocus={() => onFocus(product.ProductId || null, key + 1)} labelStyle={styles.labelStyle} label={`Reminder ${key+1}`} placeholder="Product Name" value={product.name || ''} />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input inputStyle={styles.inputStyle} editable={!_.isEmpty(product)} onFocus={() => onFocus( product.ProductId || null, key + 1, 'sample')} labelStyle={styles.labelStyle} key={ key + RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)} />
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input inputStyle={styles.inputStyle} editable={!_.isEmpty(product)} onFocus={() => onFocus(product.ProductId || null, key + 1, 'sample')} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity" placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
                                </View>
                            </View>
                        </View>
                    );
                })
            }
        </View>
    )
}

export default ReminderField;
