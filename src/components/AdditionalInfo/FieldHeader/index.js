import React from 'react';
import { ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { brandColors, RFValue } from '../../../constants';
import { propTypes, defaultValues } from './defaultPropTypesValues'

const FieldHeader = ({
    key,
    title,
    onRemove
}) => {
    return (
        <ListItem
            key={ key }
            title={<Text style={inlineStyles.textStyle('title')}>{title}</Text>}
            containerStyle={inlineStyles.listItemContainer}
            // rightIcon={ isFirst ? null : <Icon
            rightIcon={ true ? null : <Icon
                        name='remove'
                        size={25}
                        color={brandColors.green}
                        onPress={onRemove}
                        style={{ paddingRight: 5}}
                        />}
            pad={20}
        />
    )
}

FieldHeader.propTypes = propTypes
FieldHeader.defaultProps = defaultValues;

export default FieldHeader;
const inlineStyles = {
    textStyle: (type) => {
        return {
            fontFamily: type === 'title' ? 'Lato-MediumItalic' : 'Lato-Regular',
            color: brandColors.lightGreen,
            fontSize: type === 'title' ? RFValue(16) : RFValue(10),
            paddingLeft: 5
        }
    },
    listItemContainer: {
        borderRadius: 5,
        height: 40,
        padding: 2,
        backgroundColor: brandColors.darkBrown
    }
}