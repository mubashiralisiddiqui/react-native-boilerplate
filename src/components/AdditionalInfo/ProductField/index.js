import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { RandomInteger, styles, rangeArray } from '../../../constants';
import FieldHeader from '../FieldHeader';

const ClassField = ({
    times = 1,
    onRemove = () => {}
}) => {
    return (
        <View style={styles.container}>
            {
                rangeArray(times).map((value, key) => {
                    return (
                        <View key={ key + RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title="Product Details"
                                field="productFieldsCount"
                                fieldType="product"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input labelStyle={styles.labelStyle} key={ key + RandomInteger() } label={`Product ${key + 1}`} placeholder="Product Name" />
                            <View key={ key + RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ key + RandomInteger() } style={{width: "50%"}}>
                                    <Input labelStyle={styles.labelStyle} key={ key + RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" />
                                </View>
                                <View key={ key + RandomInteger() } style={{width: "50%"}}>
                                    <Input labelStyle={styles.labelStyle} key={ key + RandomInteger() } label="Quantity" placeholder="Quantity" />
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ClassField;
