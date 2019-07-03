import React, { Component, useState } from 'react';
import { View } from 'react-native';
import ReminderField from './ReminderField';
import ProductField from './ProductField';
import { brandColors, styles } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import GiftField from './GiftField';
import CallRemarksField from './CallRemarksField';
import NotesField from './NotesField';

const AdditionalInfo = () => {
    const [productFieldsCount, setProductFieldsCount] = useState(1);
    const [reminderFieldsCount, setReminderFieldsCount] = useState(1);
    return (
        <View style={styles.container}>
            <ProductField
                times={productFieldsCount}
                onRemove={() => setProductFieldsCount(productFieldsCount - 1)} 
            />
            <Icon
                name="plus-square"
                size={30}
                color={brandColors.lightGreen}
                onPress={() => setProductFieldsCount(productFieldsCount + 1) }
            />
            <ReminderField times={reminderFieldsCount} onRemove={() => setReminderFieldsCount(reminderFieldsCount - 1) }/>
            <Icon
                name="plus-square"
                size={30}
                color={brandColors.lightGreen}
                onPress={() => setReminderFieldsCount(reminderFieldsCount + 1) }
            />
            <GiftField />
            <CallRemarksField />
            <NotesField />
        </View>
    )
}

export default AdditionalInfo;
