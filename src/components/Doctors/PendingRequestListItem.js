import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';

function PendingRequestsListItem(props) {
    const {
        DoctorName,
        Address,
        Phone,
        Speciality,
    } = props.item;
    return (
        <View style={styles.listItem}>
            <View style={{width: '25%'}}>
                <Text style={[styles.text, styles.textName]}>{ DoctorName }</Text>
            </View>
            <View style={{width: '20%'}}>
                <Text style={styles.text}>
                    { Phone }
                </Text>
            </View>
            <View style={{width: '25%'}}>
                <Text style={[styles.text, styles.textCity]}>
                    { Address }
                </Text>
            </View>
            <View style={{width: '10%'}}>
                <Text style={styles.text}>
                    { Speciality }
                </Text>
            </View>
            <View style={{width: '20%'}}>
                <Badge status="warning" value="Pending" />
            </View>
        </View>
    );
}
export default memo(PendingRequestsListItem, (prevProps, nextProps) => {
    return prevProps.item.DoctorRequestId === nextProps.item.DoctorRequestId;
})

const styles = StyleSheet.create({
    listItem: {
        width:'95%',
        marginHorizontal: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#bdc8cf',
        height: 45,
    },
    text: {
        fontSize: RFValue(18),
        fontFamily: 'Lato-Medium',
        color: brandColors.darkBrown,
        textAlign: 'center',
    },
    textCity: {
        fontFamily: 'Lato-MediumItalic'
    },
    textName: {
        fontFamily: 'Lato-BoldItalic',
        color: brandColors.green,
    }
})