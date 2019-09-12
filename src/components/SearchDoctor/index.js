import React, { useState, useEffect } from 'react';
import { View, NativeModules, Keyboard, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Input, Overlay, Text, ListItem, SearchBar, Badge } from 'react-native-elements';
import { RandomInteger, styles, brandColors } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux';
import { getDoctors, getUnplannedCallDoctors, getCallDoctors } from '../../reducers/doctorReducer';

const SearchDoctor = (props) => {
    const allDoctors = useSelector(getDoctors);
    const callDoctors = [...useSelector(getUnplannedCallDoctors), ...useSelector(getCallDoctors)]
    
    const [showDoctors, setShowDoctors] = useState(false)
    const [query, setQuery] = useState('')
    const [doctors, setDoctors] = useState(allDoctors)
    const onFocus = () => {
        Keyboard.dismiss();
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        setShowDoctors(true);
    }
    useEffect(() => {
        setQuery('');
        setDoctors(allDoctors)
    }, [showDoctors])   

    useEffect(() => {
        if(query !== '') {
            const searched = allDoctors.filter(doctor => doctor.Value.toLowerCase().includes(query.toLowerCase()))
            setDoctors(searched)
        } else {
            setDoctors(allDoctors)
        }
    }, [query])
    const _render = ({item}) => {
        return (
            <ListItem
                // disabled={_.includes(callDoctors, item.Id)}
                rightElement={ _.includes(callDoctors, item.Id) ? <Badge status="success" value="Already Planned / Executed" /> : null }
                Component={TouchableWithoutFeedback}
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={`${item.Value} - ${ item.DoctorBrick }`}
                bottomDivider
                onPress={ () => {
                        props.setDoctor(item)
                        setShowDoctors(false)
                        setDoctors(allDoctors);
                    }
                }
            />
        )
    }

    return (
        <View>
            <Input
                onFocus={onFocus}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                label="Select Doctor"
                placeholder="Select Doctor"
                value={props.name || ''}
                errorMessage={props.errors && props.errors.DoctorCode || ''}
            />
              <Overlay
                width={'75%'}
                height={'75%'}
                overlayBackgroundColor={'#ddd'}
                onBackdropPress={() => setShowDoctors(false)}
                animationType={'fade'}
                isVisible={showDoctors}
                borderRadius={15}
                children={
                    <ImageBackgroundWrapper>
                        <Text style={styles.listTitle}>
                            Select Doctor
                        </Text>
                        <ScrollView style={{ borderRadius: 10, }} behavior="padding">
                        <SearchBar
                            placeholder="Search Doctor"
                            onChangeText={setQuery}
                            value={query}
                            platform="ios"
                            containerStyle={{ backgroundColor: 'transparent'}}
                            round
                            cancelButtonProps={{buttonTextStyle: {color: brandColors.lightGreen, fontFamily: 'Lato-MediumItalic' }}}
                        />
                        {/* <Input label="Search Doctor" placeholder="Search Doctor" onChangeText={(text) => setQuery(text)} /> */}
                            <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ width: '98%', marginHorizontal: 5}}>
                                    <FlatList
                                        // extraData={showDoctors}
                                        keyExtractor={ item => `${item.Id} + ${RandomInteger()}`}
                                        data={JSON.parse(JSON.stringify(doctors.slice(0, 30)))}
                                        renderItem={_render}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackgroundWrapper>
                }
              />
        </View>
    )

}

export default SearchDoctor;