import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { brandColors, RandomInteger } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome'

const ItemCard = ({
    name,
    type,
    category,
    status,
    loading,
    onPressHandler
}) => {
    const styles = getStyles(status);
    return (   
        <Card key={RandomInteger()}
            containerStyle={styles.cardContainer}
        >
            <View key={RandomInteger()} style={styles.viewContainer}> 
                <View key={RandomInteger()} style={styles.itemFirst}>
                    <Text key={RandomInteger()} style={styles.text}> { name }</Text>
                </View>
                <View key={RandomInteger()} style={styles.itemSecond}>
                    <Text key={RandomInteger()} style={styles.text}>{ type }</Text>
                </View>
                <View key={RandomInteger()} style={styles.item}>
                    <Text key={RandomInteger()} style={styles.text}>{ category }</Text>
                </View>
                <Button 
                    buttonStyle={{
                        // marginRight: 8,
                        backgroundColor: brandColors.lightGreen
                    }}
                    title={<Text style={{color: brandColors.darkBrown}}>Execute</Text>}
                    containerStyle={{ marginRight: 5, }}
                    onPress={onPressHandler}
                    disabled={!status}
                    raised
                    loading={loading}
                />
            </View>
        </Card>
    )
} 
export default ItemCard;

const getStyles = (status) => {
    const { width } = Dimensions.get('window');
    return {
        viewContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: 40,
            paddingLeft: 0,
            border: 1,
        },
        itemFirst: {
            height: 40,
            justifyContent: 'center',
            marginLeft: 0,
            alignItems: 'center',
            width: width/5
        },
        itemSecond: {
            height: 40,
            flexGrow: 1,
            justifyContent: 'center',
            marginLeft: 10,
            alignItems: 'center',
            padding: 10,
            width: width/10
        },
        item: {
            height: 40,
            marginLeft: 10,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 7,
            width: width/6
        },
        text: {
            // fontWeight: 'bold',
            fontSize: 18,
            // color: status === 1 ? brandColors.darkBrown : '#fff',
            color: status === 1 ? brandColors.darkBrown : '#aaa',
            // fontFamily: 'Lato-Bold'
        },
        cardContainer: {
            // backgroundColor: status === 1 ? brandColors.lightGreen : brandColors.darkBrown,
            backgroundColor: status === 1 ? 'transparent' : 'transparent    ',
            paddingLeft: 2,
            paddingRight: 5,
            shadowColor: brandColors.lightGreen,
            border: 2,
            borderRadius: 2,
            borderColor: '#86af49',
            borderBottomWidth: 0,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
        }
    }
}