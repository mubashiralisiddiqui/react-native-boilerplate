import React, { memo } from 'react'
import { Text } from 'react-native-elements'
import VersionCheck from 'react-native-version-check';
import { RFValue, brandColors } from '../../constants';

const AppVersion = (props) => {
    return (
        <Text style={{
            fontSize: RFValue(14),
            fontFamily: 'Lato-BoldItalic',
            color: brandColors.lightGreen,
        }}>Application Version: { VersionCheck.getCurrentVersion() }</Text>
    )
}

export default memo(AppVersion)