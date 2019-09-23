import React from 'react';
import { View, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-elements';
import HistoryCardHeader from './HistoryCardHeader';
import { RFValue, brandColors, RandomInteger } from '../../../constants';

const HistoryCard = ({
    data
}) => {
    return (
        <View>
            <Card
                key={`${data.DeviceDateTime}-${RandomInteger}`}
                title={<HistoryCardHeader title={data.DeviceDateTime} />}
                wrapperStyle={{ width: Dimensions.get('screen').width / 2, borderRadius: 0}}
                containerStyle={{borderRadius: 8, backgroundColor: 'transparent'}}
            >
                <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                    <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '25%'}}>
                        <Text key={`${data.DeviceDateTime}-${RandomInteger}`} style={{paddingLeft: 10, fontSize: RFValue(15), fontFamily: 'Lato-BoldItalic', color: brandColors.lightGreen }}>Call Type</Text>
                    </View>
                    <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '75%'}}>
                        <Text key={`${data.DeviceDateTime}-${RandomInteger}`} style={{fontSize: RFValue(17), fontFamily: 'Lato-Semibold', color: brandColors.darkBrown }}>{data.PlanStatus}</Text>
                    </View>
                </View>
                <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                    <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '25%'}}>
                        <Text key={`${data.DeviceDateTime}-${RandomInteger}`} style={{paddingLeft: 10, fontSize: RFValue(15), fontFamily: 'Lato-BoldItalic', color: brandColors.lightGreen }}>Products</Text>
                    </View>
                    <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '75%'}}>
                        <Text key={`${data.DeviceDateTime}-${RandomInteger}`} style={{fontSize: RFValue(17), fontFamily: 'Lato-Semibold', color: brandColors.darkBrown }}>{data.Products}</Text>
                    </View>
                </View>
                <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                    <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '25%'}}>
                        <Text key={`${data.DeviceDateTime}-${RandomInteger}`} style={{paddingLeft: 10, fontSize: RFValue(15), fontFamily: 'Lato-BoldItalic', color: brandColors.lightGreen }}>Notes</Text>
                    </View>
                    <View key={`${data.DeviceDateTime}-${RandomInteger}`} style={{width: '75%'}}>
                        <Text key={`${data.DeviceDateTime}-${RandomInteger}`} style={{fontSize: RFValue(14), fontFamily: 'Lato-Semibold', color: brandColors.darkBrown }}>{data.Feedback}</Text>
                    </View>
                </View>
                
            </Card>
        </View>
        // }
    )
}

export default HistoryCard;