import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';

function DoctorListItem(props) {
    const {
        Value,
        SpecialtyName,
        DoctorBrick,
        DoctorAddress,
        ClassName
    } = props.item;
    return (
        <View style={styles.listItem}>
            <View style={{width: '25%'}}>
                <Text style={[styles.text, styles.textName]}>{Value}</Text>
            </View>
            <View style={{width: '20%'}}>
                <Text style={styles.text}>
                    { SpecialtyName }
                </Text>
            </View>
            <View style={{width: '25%'}}>
                <Text style={[styles.text, styles.textCity]}>
                    { DoctorAddress }
                </Text>
            </View>
            <View style={{width: '10%'}}>
                <Text style={styles.text}>
                    { ClassName }
                </Text>
            </View>
            <View style={{width: '20%'}}>
                <Text style={styles.text}>
                    { DoctorBrick }
                </Text>
            </View>
        </View>
    );
}
export default memo(DoctorListItem, (prevProps, nextProps) => {
    return prevProps.item.Id === nextProps.item.Id;
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
        fontSize: RFValue(16),
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