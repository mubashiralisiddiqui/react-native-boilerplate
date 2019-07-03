import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import { Input } from 'react-native-elements';
import FieldHeader from '../FieldHeader';
import { RandomInteger, styles, rangeArray } from '../../../constants';

const ReminderField = ({
    times = 1,
    onRemove = () => {},
}) => {
    return (
        <View style={styles.container}>
            {
                rangeArray(times).map((value, key) => {
                    return (
                        <View key={ key + RandomInteger() } style={{width: "95%", paddingBottom: 10}}>
                            <FieldHeader
                                title="Reminder Details"
                                field="reminderFieldsCount"
                                fieldType="reminder"
                                isFirst={ key === 0 ? true : false }
                                onRemove={onRemove}
                            />
                            <Input labelStyle={styles.labelStyle} label={`Reminder ${key+1}`} placeholder="Product Name" />
                        </View>
                    );
                })
            }
        </View>
    )
}

export default ReminderField;
