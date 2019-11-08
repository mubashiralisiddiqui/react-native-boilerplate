import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';

const PendingRequestsHeader = () => (
    <View style={styles.listItem}>
        <View style={{width: '25%'}}>
            <Text style={[styles.text]}>Doctor Name</Text>
        </View>
        <View style={{width: '20%'}}>
            <Text style={styles.text}>
                Phone
            </Text>
        </View>
        <View style={{width: '25%'}}>
            <Text style={[styles.text]}>
                Address 
            </Text>
        </View>
        <View style={{width: '10%'}}>
            <Text style={styles.text}>
                Speciality 
            </Text>
        </View>
        <View style={{width: '20%'}}>
            <Text style={styles.text}>
                Status
            </Text>
        </View>
    </View>
)

export default PendingRequestsHeader

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: brandColors.darkBrown,
        width:'95%',
        marginHorizontal: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 10,
    },
    text: {
        fontSize: RFValue(18),
        fontFamily: 'Lato-BoldItalic',
        color: brandColors.lightGreen,
        textAlign: 'center',
    },
})