import React, { useCallback } from 'react';
import {
    View, TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements';
import FieldHeader from './FieldHeader';
import { RandomInteger, styles, rangeArray, getNameFromSelectedSamples, getQuantityOfTheSelectedSamples } from '../../constants';

const ReminderField = ({
    times = 1,
    onRemove = () => {},
    showProducts,
    selectedProduct,
    selectedSamples,
    showSamples,
}) => {
    const onFocus = useCallback((selectedProduct, position, type = 'product') => {
        type == 'product'
        ? showProducts(selectedProduct, position, 'reminder')
        : showSamples(selectedProduct, position, 'reminder');
    })
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
                            <TouchableOpacity onPress={() => onFocus(product.ProductId || null, key + 1)}>
                                <Input editable={false} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label={`Reminder ${key+1}`} placeholder="Product Name" value={product.name || ''} />
                            </TouchableOpacity>
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <TouchableOpacity onPress={() => onFocus( product.ProductId || null, key + 1, 'sample')}>
                                        <Input inputStyle={styles.inputStyle} editable={false} labelStyle={styles.labelStyle} key={ key + RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)} />
                                    </TouchableOpacity>
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <TouchableOpacity onPress={() => onFocus( product.ProductId || null, key + 1, 'sample')}>
                                        <Input inputStyle={styles.inputStyle} editable={false} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity" placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
                                    </TouchableOpacity>
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
