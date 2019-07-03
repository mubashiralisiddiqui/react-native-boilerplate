import React from 'react';
import { View } from 'react-native';
import FieldHeader from '../FieldHeader';
import { Input } from 'react-native-elements';
import { styles } from '../../../constants';

const GiftField = () => {
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}> 
                <FieldHeader
                    title="Gift Details"
                />
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{width: "50%"}}>
                        <Input labelStyle={styles.labelStyle} label="Gift" placeholder="Select Product" />
                    </View>
                    <View style={{width: "50%"}}>
                        <Input labelStyle={styles.labelStyle} label="Quantity" placeholder="Quantity" />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default GiftField;