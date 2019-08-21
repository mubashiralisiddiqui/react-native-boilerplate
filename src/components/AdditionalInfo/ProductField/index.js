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
}) => {
    const onFocus = (selectedProduct) => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        showProducts(selectedProduct);
    }
    const sortedArray = Object.keys(products).sort()
    return (
        <View style={styles.container}>
            {
                (array_count(products) == 2) ? products.map((product, key) => {
                    return (
                        <View key={ RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title="Product Details"
                                field="productFieldsCount"
                                fieldType="product"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input onFocus={() => onFocus(existingCall ? product.ProductId : null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${key + 1}`} placeholder="Product Name" value={product.name} />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    {/* product.ProductId here is ProductTemplateId in database */}
                                    <Input onFocus={() => onFocus(product.ProductId)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)}/> 
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(product.ProductId)} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
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
                                <Input onFocus={() => onFocus(existingCall ? product.ProductId : null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${index + 1}`} placeholder="Product Name" value={product.name} />
                                <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                    <View key={ RandomInteger() } style={{width: "50%"}}>
                                        {/* product.ProductId here is ProductTemplateId in database */}
                                        <Input onFocus={() => onFocus(product.ProductId)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Sample ${index + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)}/> 
                                    </View>
                                    <View key={ RandomInteger() } style={{width: "50%"}}>
                                        <Input onFocus={() => onFocus(product.ProductId)} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
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
                            <Input onFocus={() => onFocus(existingCall ? product.ProductId : null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${index + 1}`} placeholder="Product Name" value={''} />
                            <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    {/* product.ProductId here is ProductTemplateId in database */}
                                    <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Sample ${index + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, 0)}/> 
                                </View>
                                <View key={ RandomInteger() } style={{width: "50%"}}>
                                    <Input onFocus={() => onFocus(null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, 0)}`} />
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
