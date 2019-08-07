import React from 'react';
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
}) => {
    console.log('these are selected samples from reminder field', selectedSamples)
    const onFocus = (selectedProduct, position) => {
        Keyboard.dismiss();
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        showProducts(selectedProduct, position);
    }
    return (
        <View style={styles.container}>
            {
                rangeArray(times).map((value, key) => {
                    let product = selectedProduct.filter(product => product.reminderPosition && product.reminderPosition == (key + 1))
                    if(product.length > 0) product = product[0];
                    console.log(product)

                    return (
                        <View key={ key + RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title={`Reminder ${ key +1 } Details`}
                                field="reminderFieldsCount"
                                fieldType="reminder"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input onFocus={() => onFocus(product.length > 0 ? product.ProductId : null, key + 1)} labelStyle={styles.labelStyle} label={`Reminder ${key+1}`} placeholder="Product Name" value={product.name || ''} />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} key={ key + RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)} />
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity" placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
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
