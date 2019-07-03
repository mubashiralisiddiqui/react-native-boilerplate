import React from 'react';
import { View, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-elements';
import HistoryCardHeader from './HistoryCardHeader';
import { rangeArray } from '../../../constants';

const HistoryCard = ({
    times = 3
}) => {
    const { width } = Dimensions.get('window')
    return (
        // {
            rangeArray(times).map((key, value) => {
                return (
                    <Card
                        title={<HistoryCardHeader/>}
                        wrapperStyle={{ width: width / 2, height: 150}}
                        containerStyle={{padding: 0, borderRadius: 8, width: width / 2,}}
                    >
                        <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={{paddingLeft: 10}}>Call Type</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text>Planned</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={{paddingLeft: 10}}>Products</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text>Amak, Combihale</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={{paddingLeft: 10}}>Notez</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text>N/A</Text>
                            </View>
                        </View>
                        
                    </Card>
                );
            })
        // }
    )
}

export default HistoryCard;