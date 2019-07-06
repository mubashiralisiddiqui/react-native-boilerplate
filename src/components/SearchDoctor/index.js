import React, { useState, useEffect } from 'react';
import { View, NativeModules, Keyboard } from 'react-native';
import { Input, Overlay, Text, Divider, ListItem } from 'react-native-elements';
import { RandomInteger } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlatList } from 'react-native-gesture-handler';
import { ListView } from '../../components'

const SearchDoctor = (props) => {
    const initialList = [
        {
            id: 1,
            name: 'Usman Shahid',
            address: 'Ancholi',
        },
        {
            id: 2,
            name: 'Saad Mehmood',
            address: 'Nazimabad',
        },
        {
            id: 3,
            name: 'Fahad Khalid',
            address: 'out of the city',
        },
        {
            id: 4,
            name: 'Owais Parkar',
            address: 'Baldia',
        },
        {
            id: 5,
            name: 'Amir Saleem',
            address: 'Gulshan',
        },
        {
            id: 1,
            name: 'Usman Shahid',
            address: 'Ancholi',
        },
        {
            id: 2,
            name: 'Saad Mehmood',
            address: 'Nazimabad',
        },
        {
            id: 3,
            name: 'Fahad Khalid',
            address: 'out of the city',
        },
        {
            id: 4,
            name: 'Owais Parkar',
            address: 'Baldia',
        },
        {
            id: 5,
            name: 'Amir Saleem',
            address: 'Gulshan',
        },
        {
            id: 2,
            name: 'Saad Mehmood',
            address: 'Nazimabad',
        },
        {
            id: 3,
            name: 'Fahad Khalid',
            address: 'out of the city',
        },
        {
            id: 4,
            name: 'Owais Parkar',
            address: 'Baldia',
        },
        {
            id: 5,
            name: 'Amir Saleem',
            address: 'Gulshan',
        },
    ];
    const [showOverlay, setShowOverlay] = useState(false)
    const [query, setQuery] = useState('')
    const [list, setList] = useState(initialList)
    
    const onFocus = () => {
        Keyboard.dismiss();
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        setShowOverlay(true);
    }
    useEffect(() => {
        console.log('change effect of Overlay=>', showOverlay)
        setQuery('');
        setList(initialList)
    }, [showOverlay])   

    useEffect(() => {
        console.log('change effect of query =>', query)
        if(query !== '') {
            const text = query.toLowerCase();
            const searched = initialList.filter(user => {
                return user.name.toLowerCase().includes(text)
                || user.address.toLowerCase().includes(text)
            })
            setList(searched)
        } else {
            setList(initialList)
        }
    }, [query])

    return (
        <View>
            <Input {...props} onFocus={onFocus} />
              <Overlay width={'75%'} onBackdropPress={() => setShowOverlay(false)} animationType={'fade'} isVisible={showOverlay}>

                <KeyboardAwareScrollView enableAutomaticScroll={true} behavior={'height'} contentContainerStyle={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'center' }} style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    flex: 1,    
                    width: '100%',
                    height: '100%'
                }}>

                    <View style={{ padding: 5, width: '80%' }}>
                        <Text h2 style={{ textAlign: 'center' }}>Select Doctor</Text>
                        <Divider />
                        <View style={{ width: '40%', paddingBottom: 10 }}>
                            <Input placeholder="Search" value={query} onChangeText={ value => {console.log(value);setQuery(value)}}></Input>

                        </View>
                        <ListView
                            data={list}
                            firstColumnHeading="Name"
                            secondColumnHeading="Address"
                            firstColumnValue="name"
                            secondColumnValue="address"
                        />
                    </View>
                </KeyboardAwareScrollView>
            </Overlay>
        </View>
    )

}

export default SearchDoctor;