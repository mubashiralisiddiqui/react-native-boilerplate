import React from 'react';
import { View, NativeModules, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import { RandomInteger, styles, getNameFromSelectedSamples, getQuantityOfTheSelectedSamples, rangeArray, array_count } from '../../../constants';
import FieldHeader from '../FieldHeader';

const ProductField = ({
    onRemove = () => {},
    existingCall = false,
    products,
    showProducts,
    selectedSamples,
    showSamples,
}) => {
    const onFocus = (selectedProduct, position, type = 'product') => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        
        type == 'product'
        ? showProducts(selectedProduct, position)
        : showSamples(selectedProduct, position)
    }
    const sortedArray = Object.keys(products)
    return (
        <View style={styles.container}>
            {
                existingCall ? sortedArray.map((product, key) => {
                    if(!products[product].IsReminder)
                    return (
                        <View key={ RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title="Product Details"
                                field="productFieldsCount"
                                fieldType="product"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input inputStyle={styles.inputStyle} editable={!existingCall} onFocus={() => onFocus(existingCall ? products[product].ProductId : null, key + 1)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${key + 1}`} placeholder="Product Name" value={products[product].name} />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    {/* product.ProductId here is ProductTemplateId in database */}
                                    <Input onFocus={() => onFocus(products[product].ProductId, key + 1, 'samples')} labelStyle={styles.labelStyle} inputStyle={styles.inputStyle} key={ RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, products[product].ProductId)}/> 
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(products[product].ProductId, key + 1, 'samples')} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, products[product].ProductId)}`} />
                                </View>
                            </View>
                        </View>
                    )
                }) : [0, 1].map(index => {
                    if(products[sortedArray[index]] != undefined) {
                        const product = products[sortedArray[index]]
                        return (
                            <View key={ RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                                <FieldHeader
                                    title="Product Details"
                                    field="productFieldsCount"
                                    fieldType="product"
                                    isFirst={ index === 0 ? true : false }
                                    onRemove={onRemove}
                                />
                                <Input inputStyle={styles.inputStyle} onFocus={() => onFocus( product.ProductId, index + 1)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${index + 1}`} placeholder="Product Name" value={product.name} />
                                <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                    <View key={ RandomInteger() } style={{width: "50%"}}>
                                        {/* product.ProductId here is ProductTemplateId in database */}
                                        <Input inputStyle={styles.inputStyle} onFocus={() => onFocus(product.ProductId, index + 1, 'samples')} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Sample ${index + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)}/> 
                                    </View>
                                    <View key={ RandomInteger() } style={{width: "50%"}}>
                                        <Input inputStyle={styles.inputStyle} onFocus={() => onFocus(product.ProductId, index + 1, 'samples')} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    return (
                        <View key={ RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title="Product Details"
                                field="productFieldsCount"
                                fieldType="product"
                                isFirst={ index === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input inputStyle={styles.inputStyle} onFocus={() => onFocus(null, index + 1)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${index + 1}`} placeholder="Product Name" value={''} />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    {/* product.ProductId here is ProductTemplateId in database */}
                                    <Input inputStyle={styles.inputStyle} onFocus={() => onFocus(null, index + 1, 'samples')} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Sample ${index + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, 0)}/> 
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input inputStyle={styles.inputStyle} onFocus={() => onFocus(null, index + 1, 'samples')} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, 0)}`} />
                                </View>
                            </View>
                        </View>
                    )

                })

            }
        </View>
    );
}

export default ProductField;
