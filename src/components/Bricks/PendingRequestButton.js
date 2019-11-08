import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { RFValue, brandColors } from '../../constants'


const PendingRequestButton = (props) => {
    return (
        <View style={{ display: 'flex', flexDirection: "row-reverse", width: '100%' }}>
            <View style={{ width: '20%', marginHorizontal: '5%', marginVertical: '1%' }}>
                <Button
                    onPress={props.onPress}
                    title="See Pending Request"
                    buttonStyle={{
                        borderRadius: 20, backgroundColor: brandColors.lightGreen
                    }}
                    ViewComponent={LinearGradient}
                    linearGradientProps={brandColors.linearGradientSettings}
                    titleStyle={{ fontSize: RFValue(14), fontFamily: 'Lato-BoldItalic' }}
                />
            </View>
        </View>
    )
}

export default PendingRequestButton;