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
    return (
        <View style={styles.container}>
            {
                (existingCall || array_count(products) == 2) ? products.map((product, key) => {
                    return (
                        <View key={ RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title="Product Details"
                                field="productFieldsCount"
                                fieldType="product"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input onFocus={() => onFocus(existingCall ? product.ProductId : null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${key + 1}`} placeholder="Product Name" value={existingCall ? product.ProductName : ''} />
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
                }) : null
                // (!existingCall && (array_count(products) > 0 && array_count(products) < 2))
                // ? products.map((product, key) => {
                //     return (
                //         <View key={ RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                //             <FieldHeader
                //                 title="Product Details"
                //                 field="productFieldsCount"
                //                 fieldType="product"
                //                 isFirst={ key === 0 ? true : false }
                //                 onRemove={onRemove}
                //             />
                //             <Input onFocus={() => onFocus(existingCall ? product.ProductId : null)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Product ${key + 1}`} placeholder="Product Name" value={existingCall ? product.ProductName : ''} />
                //             <View key={ RandomInteger() } style={{flex:1, flexDirection: 'row'}}>
                //                 <View key={ RandomInteger() } style={{width: "50%"}}>
                //                     {/* product.ProductId here is ProductTemplateId in database */}
                //                     <Input onFocus={() => onFocus(product.ProductId)} labelStyle={styles.labelStyle} key={ RandomInteger() } label={`Sample ${key + 1}`} placeholder="Sample Name" value={getNameFromSelectedSamples(selectedSamples, product.ProductId)}/> 
                //                 </View>
                //                 <View key={ RandomInteger() } style={{width: "50%"}}>
                //                     <Input onFocus={() => onFocus(product.ProductId)} labelStyle={styles.labelStyle} key={ RandomInteger() } label="Quantity"  placeholder="Quantity" value={`${getQuantityOfTheSelectedSamples(selectedSamples, product.ProductId)}`} />
                //                 </View>
                //             </View>
                //         </View>
                //     )
                // })
                // : null

            }
        </View>
    );
}

export default ProductField;

