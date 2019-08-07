import React, { useState } from 'react';
import { View } from 'react-native';
import ReminderField from './ReminderField';
import ProductField from './ProductField';
import { styles } from '../../constants';
import GiftField from './GiftField';
import CallRemarksField from './CallRemarksField';
import NotesField from './NotesField';


const AdditionalInfo = ({
    navigate,
    showProducts,
    selectedProducts,
    selectedSamples,
    onChangeCallRemarks,
    onChangeAdditionalNotes,
    showGifts,
    selectedGift,
    allGifts,
    existingCall,
}) => {
    const { Products } = existingCall ? navigate.getParam('call_info') : { Products: [] }
    const [productFieldsCount, setProductFieldsCount] = useState(existingCall ? 2 : Products.length);
    const [reminderFieldsCount, setReminderFieldsCount] = useState(3);
    console.log('these are selected samples from additional info', selectedSamples);
    

    return (
        <View style={styles.container}>
            <ProductField
                showProducts={showProducts}
                selectedProduct={selectedProducts}
                selectedSamples={selectedSamples}
                products={Products}
                existingCall={existingCall}
                times={productFieldsCount}
                onRemove={() => setProductFieldsCount(productFieldsCount - 1)} 
            />
            {/* This functionality will be use in future when we have more products(hopefully) and 
                will give the feasibility to SPO/RSM to have dynamic number of products par visit */}
            {/* <Icon
                name="plus-square"
                size={30}
                color={brandColors.lightGreen}
                onPress={() => setProductFieldsCount(productFieldsCount + 1) }
            /> */}
            <ReminderField selectedProduct={selectedProducts}
                selectedSamples={selectedSamples} times={reminderFieldsCount} onRemove={() => setReminderFieldsCount(reminderFieldsCount - 1)} showProducts={showProducts}/>
            {/* This functionality will be use in future when we have more products(hopefully) and 
                will give the feasibility to SPO/RSM to have dynamic number of products par visit */}
            {/* <Icon
                name="plus-square"
                size={30}
                color={brandColors.lightGreen}
                onPress={() => setReminderFieldsCount(reminderFieldsCount + 1) }
            /> */}
            <GiftField showGifts={showGifts} selectedGift={selectedGift} gifts={allGifts}/>
            <CallRemarksField onChangeCallRemarks={onChangeCallRemarks}/>
            <NotesField onChangeAdditionalNotes={onChangeAdditionalNotes} />
        </View>
    )
}

export default AdditionalInfo;
