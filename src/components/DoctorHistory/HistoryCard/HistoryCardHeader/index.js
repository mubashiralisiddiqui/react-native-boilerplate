import React from 'react';
import { Text } from 'react-native-elements';
import { brandColors } from '../../../../constants';

const HistoryCardHeader = () => {
    return (
        <Text style={{
            backgroundColor: brandColors.darkBrown,
            color: brandColors.green,
            textAlign: 'center',
            height: 35,
            borderRadius: 8,
            fontSize: 22
        }}>June 20 2019 02:30PM</Text>
    );
}
export default HistoryCardHeader;