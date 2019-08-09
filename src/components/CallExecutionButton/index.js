import React from 'react'
import {Button} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { brandColors } from '../../constants';

const CallExecutionButton = ({
    onPress,
    disabled = false,
}) => {
    return (
        <Button
            raised
            buttonStyle={{
            width: 75,
            height: 75,
            borderRadius: 37,
            backgroundColor: brandColors.green,
            }}
            containerStyle={{
                width: 75,
                height: 75,
                borderRadius: 40,
                backgroundColor: brandColors.green,
                position: 'absolute',
                right: 50,
                bottom:50,
                zIndex: 1000000
            }}
            icon={<MaterialIcon
                    name="check-circle"
                    color={brandColors.darkBrown}
                    size={55}
                    onPress={onPress}
                />}
            disabled={disabled}
        />
    );
}

export default CallExecutionButton;
