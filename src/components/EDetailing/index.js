import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { RandomInteger, brandColors, getOrientation } from '../../constants';
import { ListItem, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PDF } from '../../components';

const EDetailing = ({
    files = [],
    existingCall = false,
}) => {
    const [showFile, setShowFile] = useState(false)
    const [orientation, setOrientation] = useState('')
    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            const newOrientation = getOrientation();
            setOrientation(newOrientation)
        })
    }, [orientation])
    const renderItem = ({item}) => {
        return (
            <ListItem
                title={item[0] && item[0].FileName}
                subtitle={item[0] && item[0].FileDescription}
                containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1}}
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="file-pdf" size={25} color={brandColors.green} />}
                onPress={() => setShowFile(true)}
            />
        )
    }
    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center'}}>
            {
                files.length > 0
                ? <FlatList
                    style={{width: '80%'}}
                    keyExtractor={() => RandomInteger()}
                    data={files}
                    renderItem={renderItem}
                />
                : <ListItem
                    key={RandomInteger()}
                    style={{width: '80%'}}
                    title="No files found"
                    containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1}}
                    titleStyle={{fontWeight: 'bold'}}
                />
            }
            <Overlay
                isVisible={showFile}
                onBackdropPress={() => setShowFile(false)}
                animationType={'fade'}
                height="80%"
                children={<PDF />}
                onRequestClose={() => console.log('closed')}
            />
        </View>
    );
}

export default EDetailing;