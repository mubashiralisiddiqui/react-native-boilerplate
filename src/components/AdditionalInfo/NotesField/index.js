import React from 'react';
import { View } from 'react-native';
import FieldHeader from '../FieldHeader';
import { Input } from 'react-native-elements';
import { styles } from '../../../constants';

const NotesField = () => {
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}>
                <FieldHeader
                    title="Additional Notes"
                />
                <Input labelStyle={styles.labelStyle} label="Notes" placeholder="Any additional notes you want to mention" numberOfLine={2} />
            </View>
        </View>
    );
}
export default NotesField;