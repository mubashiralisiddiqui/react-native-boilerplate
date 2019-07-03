import React, { Component } from 'react';
import { View } from 'react-native'
import { Overlay, Text, Input } from 'react-native-elements';
import { brandColors } from '../../../constants'
import { Button as Button } from '../..';

export default class LocationOverlay extends Component {
    render() {
        const { onChange } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'white', height: 'auto' }}>
                <Text h4>Location Change Request</Text>
                <Text h5>Doctor Name: Aslam Channa</Text>
                <View style={{ borderRadius: 10,
                    borderWidth: 1,
                    borderColor: brandColors.darkBrown,}}>
                    <Input
                    placeholder='Why do you wish to change location?'
                    multiline={true}
                    numberOfLines={4}
                    />
                </View>
                <Button loading={false}
                    Title="Submit"
                    rounded={true}
                    onPress={onChange}
                />
            </View>
        );
    }
}
