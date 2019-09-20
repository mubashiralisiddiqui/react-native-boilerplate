import React from 'react';
import { View, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-elements';
import HistoryCardHeader from './HistoryCardHeader';
import { RFValue, brandColors } from '../../../constants';

const HistoryCard = ({
    data
}) => {
    
    const { width } = Dimensions.get('window')

    return (
        <Card
            title={<HistoryCardHeader title={data.DeviceDateTime} />}
            wrapperStyle={{ width: width / 2, height: 150, backgroundColor: 'transparent'}}
            containerStyle={{padding: 0, borderRadius: 8, width: width / 2, backgroundColor: 'transparent'}}
        >
            <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                <View style={{width: '25%'}}>
                    <Text style={{paddingLeft: 10, fontSize: RFValue(15), fontFamily: 'Lato-BoldItalic', color: brandColors.lightGreen }}>Call Type</Text>
                </View>
                <View style={{width: '75%'}}>
                    <Text style={{fontSize: RFValue(17), fontFamily: 'Lato-Semibold', color: brandColors.darkBrown }}>{data.PlanStatus}</Text>
                </View>
            </View>
            <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                <View style={{width: '25%'}}>
                    <Text style={{paddingLeft: 10, fontSize: RFValue(15), fontFamily: 'Lato-BoldItalic', color: brandColors.lightGreen }}>Products</Text>
                </View>
                <View style={{width: '75%'}}>
                    <Text style={{fontSize: RFValue(17), fontFamily: 'Lato-Semibold', color: brandColors.darkBrown }}>{data.Products}</Text>
                </View>
            </View>
            <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                <View style={{width: '25%'}}>
                    <Text style={{paddingLeft: 10, fontSize: RFValue(15), fontFamily: 'Lato-BoldItalic', color: brandColors.lightGreen }}>Notes</Text>
                </View>
                <View style={{width: '75%'}}>
                    <Text style={{fontSize: RFValue(14), fontFamily: 'Lato-Semibold', color: brandColors.darkBrown }}>{data.Feedback}</Text>
                </View>
            </View>
            
        </Card>
        // }
    )
}

export default HistoryCard;