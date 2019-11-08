import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { brandColors } from '../../constants';

const ScreenLoader = () => {
    return (
        <View style={{
            zIndex:1000000000,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e6e6e6',
            opacity: 0.7
          }}>
            <ActivityIndicator pointerEvents="none" size='large' color={brandColors.green} />
        </View>
    )
}

export default ScreenLoader;
