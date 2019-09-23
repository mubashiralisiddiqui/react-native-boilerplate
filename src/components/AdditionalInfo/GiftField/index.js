import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FieldHeader from '../FieldHeader';
import { Input } from 'react-native-elements';
import { styles, getQuantityOrNameOfSelectedGift } from '../../../constants';
import { defaultPropValues, propTypes } from './defaultPropTypesValues'

const GiftField = ({
    showGifts,
    selectedGift,
    gifts
}) => {
    return (
        <View style={styles.container}>
            <View style={{width: "95%"}}> 
                <FieldHeader
                    title="Gift Details"
                />
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{width: "50%"}}>
                        <TouchableOpacity onPress={showGifts}>
                            <Input editable={false} pointerEvents="none" inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Gift" placeholder="Select Gift" value={getQuantityOrNameOfSelectedGift(selectedGift, gifts)} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: "50%"}}>
                        <TouchableOpacity onPress={showGifts}>
                            <Input editable={false} pointerEvents="none" inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Quantity" placeholder="Quantity" value={`${getQuantityOrNameOfSelectedGift(selectedGift, gifts, 'qty')}`} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

GiftField.propTypes = propTypes
GiftField.defaultProps = defaultPropValues;

export default GiftField;