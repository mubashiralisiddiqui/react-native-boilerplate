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
    showSamples
}) => {
    const [reminderFieldsCount, setReminderFieldsCount] = useState(3);
    

    return (
        <View style={styles.container}>
            <ProductField
                showProducts={showProducts}
                selectedSamples={selectedSamples}
                products={selectedProducts}
                existingCall={existingCall}
                showSamples={showSamples}
            />
            {/* This functionality will be use in future when we have more products(hopefully) and 
                will give the feasibility to SPO/RSM to have dynamic number of products par visit */}
            {/* <Icon
                name="plus-square"
                size={30}
                color={brandColors.lightGreen}
                onPress={() => setProductFieldsCount(productFieldsCount + 1) }
            /> */}
            {
                existingCall
                ? <ReminderField
                    selectedProduct={selectedProducts}
                    selectedSamples={selectedSamples}
                    times={reminderFieldsCount}
                    onRemove={() => setReminderFieldsCount(reminderFieldsCount - 1)}
                    showProducts={showProducts}
                    showSamples={showSamples}
                />
                : null
            }
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
