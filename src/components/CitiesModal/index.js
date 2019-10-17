import React, {useState, useEffect} from 'react'
import { View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ListItem, Text, Overlay, SearchBar } from 'react-native-elements'
import { brandColors, RandomInteger, RFValue } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { useSelector } from 'react-redux'

const CitiesModal = ({
    isVisible = false,
    visibilityHandler,
    onPressHandler,
}) => {
    const [cities, user] = useSelector(state => [state.cities.cities, state.auth.user])
    const [citiesInitial, setCitiesInitial] = useState(cities)
    const [ selectedCity, setSelectedCity ] = useState(null)
    const [ query, setQuery ] = useState('')

    useEffect(() => {
        onPressHandler('CityId', user.CityId)
        onPressHandler('CityName', user.CityName)
    }, [])

    const _onPress = (id, name) => {
        setSelectedCity(id)
        onPressHandler('CityId', id)
        onPressHandler('CityName', name)
        setQuery('')
        setCitiesInitial(cities)
        visibilityHandler();
    }

    const _search = (value) => {
        setQuery(value)
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
                Component={TouchableWithoutFeedback}
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
            animationType={'slide'}
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            isVisible={isVisible}
            onBackdropPress={visibilityHandler}
            width='60%'
            height='80%'
            children={
                <ImageBackgroundWrapper>
                    <Text style={styles.listTitle}>Select City</Text>
                    <SearchBar
                        placeholder="Search City"
                        onChangeText={_search}
                        platform="ios"
                        value={query}
                        containerStyle={{ backgroundColor: 'transparent'}}
                        round
                        cancelButtonProps={{buttonTextStyle: { fontFamily:"Lato-RegularItalic", fontSize: RFValue(14), color: brandColors.lightGreen }}}
                    />
                    {/* <Input label="Search" placeholder="Search City" onChangeText={_search} /> */}
                    <ScrollView behavior="padding">
                        <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ width: '98%', marginHorizontal: 5}}>
                                <FlatList
                                    maxToRenderPerBatch={20}
                                    updateCellsBatchingPeriod={20}
                                    keyExtractor={ item => `${item.CityId} + ${RandomInteger()}`}
                                    data={citiesInitial.slice(0, 30)}
                                    renderItem={_render}
                                    removeClippedSubviews={true}
                                />
                            </View>
                        </View>
                    </ScrollView>
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
        backgroundColor: brandColors.darkBrown,
        color: brandColors.lightGreen,
        fontFamily: 'Lato-MediumItalic',
        fontSize: RFValue(16),
        borderRadius: 10,
        padding: 5,
        width: '99.8%'
    },
}
export default CitiesModal;