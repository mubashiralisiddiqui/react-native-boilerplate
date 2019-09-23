import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Input, Overlay, Text, ListItem, SearchBar } from 'react-native-elements';
import { RandomInteger, brandColors, styles, RFValue } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux'
import { getDesignations } from '../../reducers/doctorReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchSpecialities = (props) => {
    const allSpecialities = useSelector(getDesignations);
    const [show, setShow] = useState(false)
    const [query, setQuery] = useState('')
    const [specialities, setSpeicalities] = useState(allSpecialities)

    useEffect(() => {
        console.log(show, 'asd')
        setQuery('');
        setSpeicalities(allSpecialities)
    }, [show])

    const _onPress = () => {
        setShow(true)
    }

    useEffect(() => {
        if(query !== '') {
            const searched = allSpecialities.filter(speciality => speciality.Value.toLowerCase().includes(query.toLowerCase()))
            setSpeicalities(searched)
        } else {
            setSpeicalities(allSpecialities)
        }
    }, [query])

    const _render = ({item}) => {
        return (
            <ListItem
                Component={TouchableWithoutFeedback}
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={item.Value}
                bottomDivider
                onPress={() => setShow(false) || props.setField('Speciality', item.Id)}
            />
        )
    }

    return (
        <View>
            <TouchableOpacity onPressIn={_onPress}>
                <Input
                    editable={false}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    label="Select Speciality"
                    placeholder="Select Speciality"
                    value={props.value || ''}
                    errorMessage={props.errors && props.errors.Speciality || ''}
                />
            </TouchableOpacity>
            <Overlay
                overlayBackgroundColor="#ddd"
                borderRadius={15}
                isVisible={show}
                onBackdropPress={() => setShow(false)}
                width='60%'
                height='75%'
                children={
                    <ImageBackgroundWrapper>
                        <Text style={styles.listTitle}>
                            { `Select Doctor's Speciality`  }
                        </Text>
                        <SearchBar
                            inputStyle={styles.inputStyle}
                            value={query}
                            placeholder={`Search for more Specialities`}
                            onChangeText={setQuery}
                            platform="ios"
                            containerStyle={{ backgroundColor: 'transparent'}}
                            round
                            cancelButtonProps={{buttonTextStyle: { fontFamily:"Lato-RegularItalic", fontSize: RFValue(14), color: brandColors.lightGreen, fontFamily: 'Lato-MediumItalic' }}}
                        />
                        {/* <Input label="Search" placeholder={`Search for more ${fieldToSelect}s`} onChangeText={searchDesignation} /> */}
                        <ScrollView style={{ borderRadius: 10, }} behavior="padding">
                            <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ width: '98%', marginHorizontal: 5}}>
                                    <FlatList
                                        initialNumToRender={30}
                                        keyExtractor={ item => `${item.Id} + ${RandomInteger()}`}
                                        data={JSON.parse(JSON.stringify(specialities.slice(0, 30)))}
                                        renderItem={_render}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackgroundWrapper>
                }
            />
        </View>
    );
} 

export default SearchSpecialities