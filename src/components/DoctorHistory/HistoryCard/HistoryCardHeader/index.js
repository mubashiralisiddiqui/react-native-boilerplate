import React from 'react';
import { Text } from 'react-native-elements';
import { brandColors, RFValue } from '../../../../constants';
import moment from 'moment';

const HistoryCardHeader = ({title}) => {
    return (
        <Text style={{
            backgroundColor: brandColors.darkBrown,
            color: brandColors.green,
            textAlign: 'center',
            height: RFValue(35),
            borderRadius: 10,
            fontSize: RFValue(18),
            fontFamily: 'Lato-SemiboldItalic'
        }}>{ moment(title).format('dddd, MMMM Do YYYY, h:mm:ss a') }</Text>
    );
}
export default HistoryCardHeader;