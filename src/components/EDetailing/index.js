import React from 'react';
import { View, FlatList } from 'react-native';
import { RandomInteger, brandColors } from '../../constants';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EDetailing = ({
    files = [],
    existingCall = false,
}) => {
    const renderItem = ({item}) => {
        return (
            <ListItem
                title={item[0] && item[0].FileName}
                subtitle={item[0] && item[0].FileDescription}
                containerStyle={{backgroundColor: 'background', borderBottomWidth: 1}}
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="file-pdf" size={25} color={brandColors.green} />}
            />
        )
    }
    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center'}}>
            {
                files.length > 0
                ? <FlatList
                    style={{width: '80%'}}
                    keyExtractor={RandomInteger}
                    data={files}
                    renderItem={renderItem}
                />
                : <ListItem
                    key={RandomInteger()}
                    title="No files found" 
                />
            }
        </View>
    );
}

export default EDetailing;