import React, { useState, useEffect } from 'react';
import { View, NativeModules, Keyboard, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Input, Overlay, Text, ListItem, SearchBar } from 'react-native-elements';
import { RandomInteger, styles, brandColors } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux';

const ReportingEmployeeField = (props) => {
    const [allEmployees, user] = useSelector(state => [state.auth.employees, state.auth.user]);
    const [showEmployees, setShowEmployees] = useState(false)
    const [query, setQuery] = useState('')
    const [employees, setEmployees] = useState(allEmployees)
    const onFocus = () => {
        Keyboard.dismiss();
        NativeModules.KeyboardFunctionalities.hideKeyboard()
        setEmployees(allEmployees)
        setShowEmployees(true);
    }
    useEffect(() => {
        setQuery('');
        setEmployees(employees)
    }, [showEmployees])

    useEffect(() => {
        if(query !== '') {
            const searched = allEmployees.filter(employee => employee.Value.toLowerCase().includes(query.toLowerCase()))
            setEmployees(searched)
        } else {
            setEmployees(allEmployees)
        }
    }, [query])
    const _render = ({item}) => {
        return (
            <ListItem
                Component={TouchableWithoutFeedback}
                style={{ height: 45, marginVertical: 5, backgroundColor: 'transparent' }}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={item.Value}
                subtitle={ item.Id == user.EmployeeId && 'Select this to get your doctors'}
                subtitleStyle={{ color: brandColors.lightGreen, fontFamily: 'Lato-MediumItalic' }}
                bottomDivider
                onPress={ () => {
                    setShowEmployees(false)
                    props.setMio(item)
                }
                }
            />
        )
    }

    return (
        <View>
            <Input onFocus={onFocus} inputStyle={styles.inputStyle} labelStyle={styles.labelStyle} label="Select MIO" placeholder="Select MIO" value={props.name || ''}/>
              <Overlay
                width={'40%'}
                height={'75%'}
                overlayBackgroundColor={'#ddd'}
                onBackdropPress={() => setShowEmployees(false)}
                animationType={'fade'}
                isVisible={showEmployees}
                borderRadius={15}
                children={
                    <ImageBackgroundWrapper>
                        <Text h3 h3Style={styles.listTitle}>
                            Select SPO  
                        </Text>
                        <ScrollView style={{ borderRadius: 10, }} behavior="padding">
                        <SearchBar
                            placeholder={`Search SPO`}
                            onChangeText={setQuery}
                            platform="ios"
                            containerStyle={{ backgroundColor: 'transparent'}}
                            round
                            cancelButtonProps={{buttonTextStyle: { fontFamily:"Lato-RegularItalic", fontSize: RFValue(14), color: brandColors.lightGreen }}}
                        />
                        {/* <Input label="Search SPO" placeholder="Search SPO" onChangeText={(text) => setQuery(text)} /> */}
                            <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ width: '98%', marginHorizontal: 5}}>
                                    <FlatList
                                        initialNumToRender={50}
                                        keyExtractor={ item => `${item.Id} + ${RandomInteger()}`}
                                        data={employees}
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

export default ReportingEmployeeField;