import React from 'react';
import { View } from 'react-native';
import FieldHeader from './FieldHeader';
import { Input } from 'react-native-elements';
import { styles } from '../../constants';
import { defaultPropsNotesField } from './defaultPropTypeValues'

const NotesField = ({
    onChangeAdditionalNotes
}) => {
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}>
                <FieldHeader
                    title="Additional Notes"
                />
                <Input inputStyle={styles.inputStyle} onChangeText={(text) => onChangeAdditionalNotes('FeedBack', text) } labelStyle={styles.labelStyle} label="Notes" placeholder="Any additional notes you want to mention" numberOfLine={2} />
            </View>
        </View>
    );
}

NotesField.propTypes = defaultPropsNotesField

export default NotesField;