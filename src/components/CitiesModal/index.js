import React, {useState, useEffect} from 'react'
import { View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ListItem, Text, Overlay, Input } from 'react-native-elements'
import { brandColors, RandomInteger } from '../../constants';
import ImageBackgroundWrapper from '../ImageBackground';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux'

const CitiesModal = ({
    isVisible = false,
    visibilityHandler,
    onPressHandler,
}) => {
    const [cities, user] = useSelector(state => [state.cities.cities, state.auth.user])
    const [citiesInitial, setCitiesInitial] = useState(cities)
    const [ selectedCity, setSelectedCity ] = useState(null)

    useEffect(() => {
        onPressHandler('CityId', user.CityId)
        onPressHandler('CityName', user.CityName)
    }, [])

    const _onPress = (id, name) => {
        setSelectedCity(id)
        onPressHandler('CityId', id)
        onPressHandler('CityName', name)
        visibilityHandler();
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
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            isVisible={isVisible}
            onBackdropPress={visibilityHandler}
            width='50%'
            height='80%'
            children={
                <ImageBackgroundWrapper>
                    <Text h3 h3Style={styles.listTitle}>Select City</Text>
                    <Input label="Search" placeholder="Search City" onChangeText={_search} />
                    <ScrollView behavior="padding">
                        <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ width: '98%', marginHorizontal: 5}}>
                                <FlatList
                                    maxToRenderPerBatch={20}
                                    updateCellsBatchingPeriod={20}
                                    keyExtractor={ item => `${item.CityId} + ${RandomInteger()}`}
                                    data={citiesInitial}
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
        fontFamily: 'Lato-MediumItalic',
        fontSize: RFValue(16),
        borderRadius: 10,
        padding: 5,
        width: '99.8%'
    },
}
export default CitiesModal;