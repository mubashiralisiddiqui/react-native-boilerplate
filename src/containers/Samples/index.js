import React, { Component } from 'react'
import { View } from 'react-native';
import { ImageBackgroundWrapper, SearchDoctor, ListView } from '../../components';
import { CallPlanHeader } from '../../components/Headers';
import { navigationOption } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class Samples extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Samples'))

    render() {
        const list = [
            {
                sample_name: 'Amak 100mg',
                doctor_id: 1,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg/2ml',
                doctor_id: 1,
                quantity: 10,
            },
            {
                sample_name: 'Easehale 0.025 Respules',
                doctor_id: 2,
                quantity: 13,
            },
            {
                sample_name: 'Combihale',
                doctor_id: 2,
                quantity: 15,
            },
            {
                sample_name: 'Ferris Lamp',
                doctor_id: 3,
                quantity: 30,
            },
            {
                sample_name: 'Xaleve PS',
                doctor_id: 3,
                quantity: 3,
            },
            {
                sample_name: 'Digital Thermometer',
                doctor_id: 4,
                quantity: 6,
            },
            {
                sample_name: 'Eid Giftbox',
                doctor_id: 4,
                quantity: 1,
            },
            {
                sample_name: 'Nebulizer',
                doctor_id: 5,
                quantity: 2,
            },
            {
                sample_name: 'Mobile Holder Easehale and Amal',
                doctor_id: 5,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 3,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 2,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 4,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 6,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 2,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 4,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 5,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 6,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 1,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 5,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 3,
                quantity: 10,
            },
            {
                sample_name: 'Amak 100mg',
                doctor_id: 2,
                quantity: 10,
            },
        ];
        return (
            <ImageBackgroundWrapper>
                <CallPlanHeader />
                {/* <ScrollView> */}
                <View style={{width: '100%', alignItems: 'center', paddingVertical: 5 }}>
                    <View style={{
                            width: '40%',
                        }}
                    >
                        <SearchDoctor
                            label="Select Doctor"
                            placeholder="Select Doctor"
                        />
                    </View>
                </View>
                <View style={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{width: '80%'}}>
                        <ListView
                            firstColumnHeading="Stock Quantity"
                            secondColumnHeading="Given Quantity"
                            data={list}
                            maxHeight={250}
                            firstColumnValue="sample_name"
                            secondColumnValue="quantity"
                        />
                    </View>
                </View>
                {/* </ScrollView> */}
            </ImageBackgroundWrapper>
        )
    }
}