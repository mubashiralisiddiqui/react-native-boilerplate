import React from 'react';
import {
    View, Keyboard, NativeModules
} from 'react-native';
import { Input } from 'react-native-elements';
import FieldHeader from '../FieldHeader';
import { RandomInteger, styles, rangeArray } from '../../../constants';

const ReminderField = ({
    times = 1,
    onRemove = () => {},
    showProducts,
}) => {
    const onFocus = (selectedProduct) => {
        Keyboard.dismiss();
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        showProducts(selectedProduct);
    }
    return (
        <View style={styles.container}>
            {
                rangeArray(times).map((value, key) => {
                    return (
                        <View key={ key + RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title={`Reminder ${ key +1 } Details`}
                                field="reminderFieldsCount"
                                fieldType="reminder"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} label={`Reminder ${key+1}`} placeholder="Product Name" />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} key={ key + RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" />
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity" keyboardType="number-pad" placeholder="Quantity" />
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
