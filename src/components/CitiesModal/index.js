import React, {useState} from 'react'
import { View, FlatList } from 'react-native';
import { ListItem, Text, Button, Overlay, Input } from 'react-native-elements'
import { brandColors, RandomInteger } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageBackgroundWrapper from '../ImageBackground';

const CitiesModal = ({
    isVisible = false,
    vivibilityHandler = () => {},
    cities = [],
    onPressHandler = () => {},
}) => {
    const [citiesInitial, setCitiesInitial] = useState(cities)
    const [ selectedCity, setSelectedCity ] = useState(null)

    const _onPress = (id, name) => {
        setSelectedCity(id)
        onPressHandler('CityId', id)
        onPressHandler('CityName', name)
        vivibilityHandler();
        
    }

    const _search = (value) => {
        if(value != '') {
            const searched = cities.filter(city => city.CityName.toLowerCase().includes(value.toLowerCase()))
            setCitiesInitial(searched)
        } else {
            setCitiesInitial(cities)
        }
    }

    const _render = ({item}) => {
        return (
            <ListItem
                style={{ height: 45, marginVertical: 5}}
                containerStyle={{ backgroundColor: 'transparent' }}
                title={item.CityName}
                onPress={() => _onPress(item.CityId, item.CityName)}
                bottomDivider
            />
        )
    }

    return (
        <Overlay
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            isVisible={isVisible}
            onBackdropPress={vivibilityHandler}
            width='50%'
            height='80%'
            children={
                <ImageBackgroundWrapper>
                    <Text h3 h3Style={styles.listTitle}>Select City</Text>
                    <Input label="Search" placeholder="Search City" onChangeText={_search} />
                    <KeyboardAwareScrollView behavior="padding">
                        <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ width: '98%', marginHorizontal: 5}}>
                                <FlatList
                                    initialNumToRender={50}
                                    keyExtractor={ item => `${item.CityId} + ${RandomInteger()}`}
                                    data={citiesInitial}
                                    renderItem={_render}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackgroundWrapper>
            }
        />
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
        width: '99.8%'
    },
}
export default CitiesModal;