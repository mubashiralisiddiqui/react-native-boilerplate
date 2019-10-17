import React from 'react';
import { View, Switch } from 'react-native';
import { Input, Text } from 'react-native-elements';
import {  brandColors, styles, RFValue } from '../../constants';
import CitiesModal from '../CitiesModal';
import { SearchDesignations, SearchSpecialities } from '..';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useToggle } from '../../hooks';

const NewDoctorForm = ({
    data = {},
    setField,
}) => {
    const [ citiesModal, toggleCitiesModal ] = useToggle(false);

    return (
        <View style={{display: "flex", flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
                <Input
                    label="Name"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholder="Enter Doctor full name"
                    value={data.DoctorName}
                    onChangeText={(value) => setField('DoctorName', value)}
                    errorMessage={data.errors.DoctorName || ''}
                />
                <Input
                    label="Phone"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholder="Enter Phone number"
                    keyboardType='number-pad'
                    value={data.Phone}
                    onChangeText={(value) => setField('Phone', value)}
                    errorMessage={data.errors.Phone || ''}
                />
                <TouchableOpacity onPressIn={toggleCitiesModal}> 
                    <Input
                        label="City"
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder="Select Doctor City"
                        value={data.CityName}
                        editable={false}
                        errorMessage={data.errors.CityId || ''}
                    />
                </TouchableOpacity>
                <SearchDesignations setField={setField} value={data.Designation} errors={data.errors} />
            </View>
            <View style={{width: '50%'}}>
                <Input
                    label="Email"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholder="Enter Doctor email address"
                    keyboasrdType='email-address'
                    value={data.Email}
                    onChangeText={(value) => setField('Email', value)}
                    errorMessage={data.errors.Email || ''}
                />
                <Input
                    label="Address (Optional)"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholder="Enter address"
                    value={data.DoctorAddress}
                    onChangeText={(value) => setField('DoctorAddress', value)}
                />
                <SearchSpecialities setField={setField} value={data.Speciality} errors={data.errors}/>
                <Text style={{ color: brandColors.darkBrown, marginVertical: 3, marginHorizontal: 10, fontSize: RFValue(15), fontFamily: 'Lato-HeavyItalic'}}>
                    Is KOL?
                </Text><Switch value={data.IsKOL} trackColor={{true: brandColors.darkBrown}} thumbColor={data.IsKOL ? brandColors.lightGreen : 'lightgrey'} onValueChange={(value) => setField('IsKOL', value)}/>
            </View>
            <CitiesModal
                isVisible={citiesModal}
                visibilityHandler={toggleCitiesModal}
                onPressHandler={setField}
            />
            
        </View>
    )
}

export default NewDoctorForm;