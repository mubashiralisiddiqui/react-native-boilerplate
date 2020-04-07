import React, { useState, useEffect, useCallback } from 'react';
import { View, NativeModules, Keyboard, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Input, Overlay, Text, ListItem, SearchBar, Badge } from 'react-native-elements';
import { RandomInteger, styles, brandColors, RFValue } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux';
import { getDoctors, getUnplannedCallDoctors, getCallDoctors } from '../../reducers/doctorReducer';
import { useBoolean } from '../../hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchDoctor = (props) => {
    const allDoctors = useSelector(getDoctors);
    const callDoctors = useSelector(getCallDoctors);
    const unplannedCallDoctors = useSelector(getUnplannedCallDoctors);
    const allCallDoctors = useCallback(() => _.concat(callDoctors, unplannedCallDoctors))
    
    const [areDoctorsVisible, showDoctors, hideDoctors] = useBoolean(false)
    const [query, setQuery] = useState('')
    const [doctors, setDoctors] = useState(allDoctors)
    // console.log(callDoctors, unplannedCallDoctors, 'asd0')

    useEffect(() => {
        setQuery('');
        setDoctors(allDoctors)
    }, [areDoctorsVisible])   

    useEffect(() => {
        if(query !== '') {
            const searched = allDoctors.filter(doctor => doctor.Value.toLowerCase().includes(query.toLowerCase()))
            setDoctors(searched)
        } else {
            setDoctors(allDoctors)
        }
    }, [query])
    const _render = ({item}) => {
        // console.log(allCallDoctors(), _.includes(allCallDoctors, item.Id))
        return (
            <ListItem
                disabled={!props.location && _.includes(allCallDoctors(), item.Id)}
                rightElement={ !props.location && _.includes(allCallDoctors(), item.Id) && <Badge textStyle={{fontSize: RFValue(11), fontFamily: 'Lato-Regular' }} status="success" value="Already Planned / Executed" /> }
                Component={TouchableWithoutFeedback}
                style={{ height: RFValue(40), marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={`${item.Value} - ${ item.DoctorBrick }`}
                bottomDivider
                onPress={ () => {
                        props.setDoctor(item)
                        hideDoctors()
                        setDoctors(allDoctors);
                    }
                }
            />
        )
    }

    return (
        <View>
            <TouchableOpacity onPressIn={showDoctors}>
                <Input
                    editable={false}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    label="Select Doctor"
                    placeholder="Select Doctor"
                    value={props.name || ''}
                    errorMessage={props.errors && props.errors.DoctorCode || ''}
                />
            </TouchableOpacity>
              <Overlay
                width={'75%'}
                height={'75%'}
                overlayBackgroundColor={'#ddd'}
                onBackdropPress={hideDoctors}
                animationType={'slide'}
                isVisible={areDoctorsVisible}
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
                            cancelButtonProps={{buttonTextStyle: { fontFamily:"Lato-RegularItalic", fontSize: RFValue(14), color: brandColors.lightGreen }}}
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