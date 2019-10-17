import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Card, Button, Badge } from 'react-native-elements'
import { brandColors, RandomInteger, RFValue } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

const ItemCard = ({
    name,
    doctorClass = 'A',
    category,
    status = 1,
    onPressHandler,
    isOffline = false,
    isUnplanned = false,
    call,
}) => {
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(Dimensions.get('screen').width);
    const onLayout = (e) => {
        setWidth(Dimensions.get('screen').width)
    }
    const onPress = () => {
        setLoading(true);
        setTimeout(() => {
            onPressHandler(call);
            setLoading(false)
        }, 0)
    }
    
    const styles = getStyles(status, width);
    return (
        <Card key={RandomInteger()}
            containerStyle={styles.cardContainer}
            // wrapperStyle={{borderRadius: 5}}
        >
            <View onLayout={onLayout} key={RandomInteger()} style={styles.viewContainer}> 
                <View key={RandomInteger()} style={styles.itemFirst}>
                    <Text key={RandomInteger()} style={[styles.text, {fontFamily: 'Lato-MediumItalic'}]}> { name }</Text>
                </View>
                <View key={RandomInteger()} style={styles.itemSecond}>
                    { (status === true && isOffline === true)
                        ? <Badge status="warning" value="Offline" textStyle={{fontSize: RFValue(11), fontFamily: 'Lato-Regular' }}/>
                        : status === true &&
                         isOffline === false &&
                         <Badge status="success" value="Synced" textStyle={{fontSize: RFValue(11), fontFamily: 'Lato-Regular' }}/>
                    }
                    { isUnplanned == true && <Badge status="primary" value="Unplanned" textStyle={{fontSize: RFValue(11), fontFamily: 'Lato-Regular' }} /> }
                    
                    <Text key={RandomInteger()} style={styles.text}>{ doctorClass }</Text>
                </View>
                <View key={RandomInteger()} style={styles.item}>
                    <Text key={RandomInteger()} style={styles.text}>{ category }</Text>
                </View>
                <Button
                    buttonStyle={{
                        borderRadius: 40, backgroundColor: brandColors.lightGreen
                    }}
                    ViewComponent={LinearGradient}
                    linearGradientProps={status ? brandColors.linearGradientDisabledSettings : brandColors.linearGradientSettings}
                    title="Execute"
                    containerStyle={{ marginRight: RFValue(5), width: RFValue(80) }}
                    titleStyle={{ fontSize: RFValue(14), fontFamily: 'Lato-BoldItalic' }}
                    onPress={onPress}
                    disabled={status}
                    // raised
                    loading={loading}
                />
            </View>
        </Card>
    )
}
export default ItemCard;

const getStyles = (status, width) => {
    return {
        viewContainer: {
            // display: 'flex',
            elevation: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: RFValue(35),
            paddingLeft: 0,
            backgroundColor: 'transparent'
        },
        itemFirst: {
            height: RFValue(35),
            justifyContent: 'center',
            marginLeft: 0,
            alignItems: 'center',
            width: width/4
        },
        itemSecond: {
            height: RFValue(35),
            flexGrow: 1,
            justifyContent: 'center',
            marginLeft: 10,
            alignItems: 'center',
            padding: 10,
            width: width/10
        },
        item: {
            height: RFValue(35),
            marginLeft: 10,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 7,
            width: width/5
        },
        text: {
            fontSize: RFValue(16),
            color: !status ? brandColors.darkBrown : '#aaa',
            fontFamily: 'Lato-Regular',
            textAlign: 'left',
            textAlign: 'center'
        },
        cardContainer: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderWidth: 1,
            borderColor: brandColors.lightGreen,
            borderRadius: RFValue(15),
            elevation: 0,
            // borderTopColor: brandColors.linearGradientSettings.colors[0],
        }
    }
}