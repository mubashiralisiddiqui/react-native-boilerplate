import React, {useState} from 'react'
import { View, Text, Dimensions } from 'react-native';
import { Card } from 'react-native-elements'
import { brandColors, RandomInteger, RFValue } from '../../constants';

const CallPlansListHeader = () => {
    const [width, setWidth] = useState(Dimensions.get('screen').width);
    const onLayout = (e) => {
        setWidth(Dimensions.get('screen').width)
    }

    const styles = getStyles(width);

    return (
        <Card key={RandomInteger()}
            containerStyle={styles.cardContainer}
        >
            <View onLayout={onLayout} key={RandomInteger()} style={styles.viewContainer}> 
                <View key={RandomInteger()} style={styles.itemFirst}>
                    <Text key={RandomInteger()} style={styles.text}>Doctor Name</Text>
                </View>
                <View key={RandomInteger()} style={styles.itemSecond}>
                    <Text key={RandomInteger()} style={styles.text}>Class</Text>
                </View>
                <View key={RandomInteger()} style={styles.itemSecondLast}>
                    <Text key={RandomInteger()} style={styles.text}>Speciality</Text>
                </View>
                <View  key={RandomInteger()} style={styles.itemLast}>
                    <Text key={RandomInteger()} style={styles.text}>Call Action</Text>
                </View>
            </View>
        </Card>
    )
}
const getStyles = (width) => {
    return {
        viewContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            height: 15,
            paddingLeft: 0,
        },
        itemFirst: {
            height: 15,
            justifyContent: 'center',
            marginLeft: 0,
            alignItems: 'center',
            width: width/6
        },
        itemSecond: {
            height: 15,
            flex: 0,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: width/10
        },
        itemSecondLast: {
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
            width: width/6
        },
        itemLast: {
            height: 15,
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: width/6
        },
        text: {
            fontSize: RFValue(18),
            color: brandColors.lightGreen,
            fontFamily: 'Lato-HeavyItalic'
        },
        cardContainer: {
            backgroundColor: brandColors.darkBrown,
            // backgroundColor: '#ece8e7',
            shadowColor: brandColors.lightGreen,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            opacity: 0.9,
        }
    }
}

export default CallPlansListHeader;