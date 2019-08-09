import React, { useState, useEffect } from 'react';
import { View, FlatList, NativeModules, Keyboard, Switch } from 'react-native';
import { Input, Overlay, Text, ListItem, Button } from 'react-native-elements';
import { RandomInteger, brandColors } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CitiesModal from '../CitiesModal';
import ImageBackgroundWrapper from '../ImageBackground';

const NewDoctorForm = ({
    data = {},
    designations = [],
    specialities = [],
    setField = () => {},
    selectField = () => {},
    onPressSelection = () => {},
    cities = [],
}) => {
    const [ fieldSelectionOverlay, setFieldSelectionOverlay ] = useState(false)
    const [ fieldToSelect, setFieldToSelect ] = useState('')
    const [ designationsLocal, setDesignationsLocal ] = useState(designations)
    const [ specialitiesLocal, setSpecialitiesLocal ] = useState(specialities)
    const [ citiesModal, setCitiesModal ] = useState(false);

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

    useEffect(() => {
        setDesignationsLocal(designations)
    }, [fieldSelectionOverlay])  

    const searchDesignation = (value) => {
        if(value != '') {
           let result = fieldToSelect == 'Designation'
            ? designationsLocal.filter(designation => {
               return designation.Value.toLowerCase().includes(value.toLowerCase())
            })
            : specialitiesLocal.filter(speciality => {
                return speciality.Value.toLowerCase().includes(value.toLowerCase())
            })

           fieldToSelect == 'Designation' ? setDesignationsLocal(result) : setSpecialitiesLocal(result)
        } else {
            setDesignationsLocal(designations)
        }
    }

    const renderRow = (item, type) => {
        return (
            <ListItem
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={item.Value}
                bottomDivider
                onPress={ () => {
                    console.log(234234)
                        setField(type, item.Id)
                        setFieldToSelect('')
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
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Enter Doctor full name"
                    value={data.DoctorName}
                    onChangeText={(value) => setField('DoctorName', value)}
                    errorMessage={data.errors.DoctorName || ''}
                />
                <Input
                    label="Phone"
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Enter Phone number"
                    keyboardType='number-pad'
                    value={data.Phone}
                    onChangeText={(value) => setField('Phone', value)}
                    errorMessage={data.errors.Phone || ''}
                />
                <Input
                    label="City"
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Select Doctor City"
                    keyboardType='number-pad'
                    value={data.CityName}
                    onFocus={ () => onFocus('DoctorCity')}
                    errorMessage={data.errors.CityId || ''}
                />
                <Input
                    label="Designation"
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Select Designation"
                    value={data.Designation}
                    onFocus={ () => onFocus('Designation')}
                    errorMessage={data.errors.Designation || ''}
                />
            </View>
            <View style={{width: '50%'}}>
                <Input
                    label="Email"
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Enter Doctor email address"
                    keyboardType='email-address'
                    value={data.Email}
                    onChangeText={(value) => setField('Email', value)}
                    errorMessage={data.errors.Email || ''}
                />
                <Input
                    label="Address (Optional)"
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Enter address"
                    value={data.DoctorAddress}
                    onChangeText={(value) => setField('DoctorAddress', value)}
                />
                <Input
                    label="Speciality"
                    labelStyle={{ color: brandColors.darkBrown}}
                    placeholder="Select Speciality"
                    value={data.Speciality}
                    onFocus={ () => onFocus('Speciality')}
                    errorMessage={data.errors.Speciality || ''}
                />
                <Text style={{ color: brandColors.darkBrown, marginVertical: 3, marginHorizontal: 10, fontSize: 12, fontWeight: '900'}}>
                    Is KOL?
                </Text><Switch value={data.IsKOL} trackColor={brandColors.green} thumbColor={data.IsKOL ? brandColors.lightGreen : 'lightgrey'} onValueChange={(value) => setField('IsKOL', value)}/>
            </View>
            <CitiesModal
                isVisible={citiesModal}
                vivibilityHandler={citiesModalVisibilityHandler}
                cities={cities}
                onPressHandler={setField}
            />
            <Overlay
                overlayBackgroundColor="#ddd"
                borderRadius={15}
                isVisible={fieldSelectionOverlay}
                onBackdropPress={() => setFieldSelectionOverlay(false)}
                width='60%'
                height='90%'
                children={
                    <ImageBackgroundWrapper>
                        <Text h3 h3Style={styles.listTitle}>
                            { `Select Doctor's ${fieldToSelect}`  }
                        </Text>
                        <Input label="Search" placeholder="Search designation" onChangeText={searchDesignation} />
                        <KeyboardAwareScrollView style={{ borderRadius: 10, }} behavior="padding">
                            <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ width: '98%', marginHorizontal: 5}}>
                                    <FlatList
                                        initialNumToRender={50}
                                        keyExtractor={ item => `${item.Id} + ${RandomInteger()}`}
                                        data={fieldToSelect === 'Designation' ?  designationsLocal : specialitiesLocal }
                                        renderItem={({item}) => renderRow(item, fieldToSelect)}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </ImageBackgroundWrapper>
                }
            />
            
        </View>
    )
}
const styles = {
    flatList: {
        width: '90%',
        marginHorizontal: 5,
    },
    listTitle: {
        backgroundColor: '#ece8e7',
        borderRadius: 10,
        padding: 5,
        width: '99.8%',
        fontSize: 18,
        fontWeight: 'bold',
        color: brandColors.darkBrown,
        opacity: 0.5,
    },
}
export default NewDoctorForm;