import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Input, Overlay, Text, ListItem, SearchBar } from 'react-native-elements';
import { RandomInteger, brandColors, styles, RFValue } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux'
import { getDesignations } from '../../reducers/doctorReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchDesignations = (props) => {
    const allDesignations = useSelector(getDesignations);
    const [show, setShow] = useState(false)
    const [query, setQuery] = useState('')
    const [designations, setDesignations] = useState(allDesignations)

    useEffect(() => {
        console.log(show, 'asd')
        setQuery('');
        setDesignations(allDesignations)
    }, [show])

    const _onPress = useCallback(() => {
        setShow(true)
    })

    useEffect(() => {
        if(query !== '') {
            const searched = allDesignations.filter(designation => designation.Value.toLowerCase().includes(query.toLowerCase()))
            setDesignations(searched)
        } else {
            setDesignations(allDesignations)
        }
    }, [query])

    const _render = useCallback(({item}) => {
        return (
            <ListItem
                Component={TouchableWithoutFeedback}
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={item.Value}
                bottomDivider
                onPress={() => setShow(false) || props.setField('Designation', item.Id)}
            />
        )
    })

    return (
        <View>
            <TouchableOpacity onPressIn={_onPress}>
                <Input
                    editable={false}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    label="Select Designation"
                    placeholder="Select Designation"
                    value={props.value || ''}
                    errorMessage={props.errors && props.errors.Designation || ''}
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
                            { `Select Doctor's Designation`  }
                        </Text>
                        <SearchBar
                            inputStyle={styles.inputStyle}
                            value={query}
                            placeholder={`Search for more Designations`}
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
                                        data={JSON.parse(JSON.stringify(designations.slice(0, 30)))}
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

export default SearchDesignations