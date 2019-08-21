import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Card, Button, Badge } from 'react-native-elements'
import { brandColors, RandomInteger, normalizeFont } from '../../constants';

const ItemCard = ({
    name,
    doctorClass = 'A',
    category,
    status = 1,
    onPressHandler,
    isOffline = false,
    isUnplanned = false,
}) => {
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(Dimensions.get('screen').width);
    const onLayout = (e) => {
        setWidth(Dimensions.get('screen').width)
    }
    const onPress = () => {
        setLoading(true);
        setTimeout(() => {
            onPressHandler();
            setLoading(false)
        }, 0)
    }
    
    const styles = getStyles(status, width);
    return (
        <Card key={RandomInteger()}
            containerStyle={styles.cardContainer}
        >
            <View onLayout={onLayout} key={RandomInteger()} style={styles.viewContainer}> 
                <View key={RandomInteger()} style={styles.itemFirst}>
                    <Text key={RandomInteger()} style={styles.text}> { name }</Text>
                </View>
                <View key={RandomInteger()} style={styles.itemSecond}>
                    { (status === true && isOffline === true)
                        ? <Badge status="warning" value="Offline"/>
                        : (status === true && isOffline === false)
                            ? <Badge status="success" value="Synced"/>
                            : null
                    }
                    { (isUnplanned == true)
                        ? <Badge status="primary" value="Unplanned"/>
                        : null
                    }
                    
                    <Text key={RandomInteger()} style={styles.text}>{ doctorClass }</Text>
                </View>
                <View key={RandomInteger()} style={styles.item}>
                    <Text key={RandomInteger()} style={styles.text}>{ category }</Text>
                </View>
                <Button 
                    buttonStyle={{
                        backgroundColor: brandColors.lightGreen
                    }}
                    title="Execute"
                    containerStyle={{ marginRight: 5 }}
                    onPress={onPress}
                    disabled={status}
                    raised
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
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: 40,
            paddingLeft: 0,
        },
        itemFirst: {
            height: 40,
            justifyContent: 'center',
            marginLeft: 0,
            alignItems: 'center',
            width: width/4
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
            fontSize: normalizeFont(18),
            color: !status ? brandColors.darkBrown : '#aaa',
        },
        cardContainer: {
            backgroundColor: 'transparent',
            paddingLeft: 2,
            paddingRight: 5,
            shadowColor: brandColors.lightGreen,
            borderRadius: 2,
            borderColor: '#86af49',
            borderBottomWidth: 0,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
        }
    }
}