import React from 'react';
import { View, FlatList } from 'react-native'
import SingleRow from './SingleRow';
import Heading from './Heading';
import { RandomInteger } from '../../constants';

const ListView = ({
    withHeading = true,
    data = [],
    columns = 2,
    firstColumnHeading,
    secondColumnHeading,
    maxHeight=350,
    firstColumnValue = '',
    secondColumnValue = '',
}) => {
    console.log(firstColumnHeading,
        secondColumnHeading, RandomInteger, columns)
    const _render = item => {
        console.log()
        return (
            <SingleRow
                item={item.item}
                columns={columns}
                firstColumn={firstColumnValue}
                secondColumn={secondColumnValue}
            />
        )
    }
    return (
        <View>
            {
                withHeading ? 
                <Heading
                    firstColumn={firstColumnHeading}
                    secondColumn={columns == 2 ? secondColumnHeading : ''}
                /> : null
            }
            <View style={{ maxHeight }}>
                <FlatList
                    keyExtractor={RandomInteger}
                    data={data}
                    renderItem={_render}
                />
            </View>
        </View>
    )
}

export default ListView