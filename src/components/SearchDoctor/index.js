import React, { useState, useEffect } from 'react';
import { View, NativeModules, Keyboard, FlatList, ScrollView } from 'react-native';
import { Input, Overlay, Text, ListItem } from 'react-native-elements';
import { RandomInteger, styles } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux';

const SearchDoctor = (props) => {
    const allDoctors = useSelector(state => state.doctor.doctors);
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
        setDoctors(doctors)
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
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={`${item.Value} - ${ item.DoctorBrick }`}
                bottomDivider
                onPress={ () => {
                        props.setDoctor(item)
                        setShowDoctors(false)
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
                errorMessage={props.errors.DoctorCode}
            />
              <Overlay
                width={'40%'}
                height={'95%'}
                overlayBackgroundColor={'#ddd'}
                onBackdropPress={() => setShowDoctors(false)}
                animationType={'fade'}
                isVisible={showDoctors}
                borderRadius={15}
                children={
                    <ImageBackgroundWrapper>
                        <Text h3 h3Style={styles.listTitle}>
                            Select Doctor
                        </Text>
                        <ScrollView style={{ borderRadius: 10, }} behavior="padding">
                        <Input label="Search Doctor" placeholder="Search Doctor" onChangeText={(text) => setQuery(text)} />
                            <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ width: '98%', marginHorizontal: 5}}>
                                    <FlatList
                                        initialNumToRender={50}
                                        keyExtractor={ item => `${item.Id} + ${RandomInteger()}`}
                                        data={doctors}
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