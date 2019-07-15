import React from 'react';
import { ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { brandColors, RandomInteger } from '../../../constants'

const FieldHeader = ({
    key = RandomInteger(),
    title = '',
    field = 'productFieldsCount',
    fieldType = 'product',
    onRemove = () => {},
    isFirst = true
}) => {
    return (
        <ListItem
            key={ key }
            title={<Text style={inlineStyles.textStyle('title')}>{title}</Text>}
            subtitle={ isFirst
                ? null
                : <Text style={inlineStyles.textStyle('subtitle')}>{`Click on right icon to remove this ${fieldType}`}</Text>
            }
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

export default FieldHeader;
const inlineStyles = {
    textStyle: (type) => {
        return {
            fontWeight: type === 'title' ? 'bold' : 'normal',
            color: brandColors.green,
            fontSize: type === 'title' ? 18 : 10,
            paddingLeft: 5
        }
    },
    listItemContainer: {
        borderRadius: 5,
        fontWeight: 'bold',
        height: 50,
        padding: 2,
        backgroundColor: brandColors.darkBrown
    }
}