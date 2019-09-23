import React, { useState, useEffect } from 'react';
import { View, FlatList, NativeModules, Keyboard, Switch, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Input, Overlay, Text, ListItem, SearchBar } from 'react-native-elements';
import { RandomInteger, brandColors, styles, RFValue } from '../../constants';
import CitiesModal from '../CitiesModal';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux'
import { SearchDesignations, SearchSpecialities } from '..';

const NewDoctorForm = ({
    data = {},
    setField,
}) => {
    const [designations, specialities] = useSelector(state => (
        [state.doctor.designations, state.doctor.specialities]
    ))
    const [ fieldSelectionOverlay, setFieldSelectionOverlay ] = useState(false)
    const [ fieldToSelect, setFieldToSelect ] = useState('')
    const [ designationsLocal, setDesignationsLocal ] = useState(designations && JSON.parse(JSON.stringify(designations.slice(0, 30))))
    const [ specialitiesLocal, setSpecialitiesLocal ] = useState(specialities && JSON.parse(JSON.stringify(specialities.slice(0, 30))))
    const [ citiesModal, setCitiesModal ] = useState(false);
    const [query, setQuery] = useState('')

    useEffect(() => {
        setQuery('')
        setDesignationsLocal(designations)
        setSpecialitiesLocal(specialities)
    }, [fieldToSelect])



    const citiesModalVisibilityHandler = () => {
        setCitiesModal( citiesModal => !citiesModal)
    }

    const onFocus = (type) => {
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        Keyboard.dismiss();
        if(type == 'DoctorCity') {
            citiesModalVisibilityHandler();
            return;
        }
        setFieldToSelect(type)
        setFieldSelectionOverlay(true);
    }

    const searchDesignation = (value) => {
        setQuery(value)
        if(value != '') {
           let result = fieldToSelect == 'Designation'
            ? designations.filter(designation => {
               return designation.Value.toLowerCase().includes(value.toLowerCase())
            })
            : specialities.filter(speciality => {
                return speciality.Value.toLowerCase().includes(value.toLowerCase())
            })

           fieldToSelect == 'Designation' ? setDesignationsLocal(result) : setSpecialitiesLocal(result)
        } else {
            fieldToSelect == 'Designation' ? 
            setDesignationsLocal(designations.slice(0, 30))
            : setDesignationsLocal(designations.slice(0, 30))
        }
    }

    const renderRow = (item, type) => {
        return (
            <ListItem
                Component={TouchableWithoutFeedback}
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={item.Value}
                bottomDivider
                onPress={ () => {
                        setField(type, item.Id)
                        setFieldToSelect('')
                        // setDesignationsLocal(designations.slice(0, 20))
                        // setSpecialitiesLocal(specialities.slice(0, 20))
                        setFieldSelectionOverlay(false)
                    }
                }
            />
        )
    }
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
                <Input
                    label="City"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholder="Select Doctor City"
                    keyboardType='number-pad'
                    value={data.CityName}
                    onFocus={ () => onFocus('DoctorCity')}
                    errorMessage={data.errors.CityId || ''}
                />
                <SearchDesignations setField={setField} value={data.Designation} errors={data.errors} />
            </View>
            <View style={{width: '50%'}}>
                <Input
                    label="Email"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholder="Enter Doctor email address"
                    keyboardType='email-address'
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
                visibilityHandler={citiesModalVisibilityHandler}
                onPressHandler={setField}
            />
            
        </View>
    )
}
const inlineStyles = {
    listTitle: {
        backgroundColor: brandColors.darkBrown,
        // backgroundColor: '#ece8e7',
        borderRadius: 10,
        padding: 5,
        width: '99.8%',
        fontFamily: 'Lato-MediumItalic',
        fontSize: RFValue(16),
        color: brandColors.lightGreen,
    },
}
export default NewDoctorForm;