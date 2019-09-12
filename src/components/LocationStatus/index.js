import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Blink } from '..'
import { brandColors, RFValue } from '../../constants';
import { MaterialIcon } from '../Icons';

const LocationStatus = ({
    isFetching = true,
}) => {
    return (
        <View style={{width: '10%'}}>
            <Blink blinking={isFetching} delay={300}>
                <Button
                    type="clear"
                    title={isFetching === true ? `Fetching` : `Fetched`}
                    disabled={isFetching}
                    titleStyle={{color: isFetching ? 'red' : brandColors.lightGreen, fontSize: RFValue(11)}}
                    buttonStyle={{width: '100%'}}
                    containerStyle={{width: '100%',}}
                    icon={<MaterialIcon
                        name={isFetching === true ? "location-searching" : 'location-on'}
                        size={RFValue(15)} 
                        color={isFetching === true ? 'red' : brandColors.lightGreen} />}
                />
            </Blink>
        </View>
    )
}

export default LocationStatus;