import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { RandomInteger, brandColors, getOrientation, doesFileExist, RFValue } from '../../constants';
import { ListItem, Overlay } from 'react-native-elements';
import { PDF } from '..';
import Video from '../Video'
import { ScrollView } from 'react-native-gesture-handler';
import DropDownHolder from '../../classes/Dropdown';
import { alertData } from '../../constants/messages';
import { FontAwesome5Icon, MaterialIcon, MaterialCommunityIcon } from '../Icons'

const EDetailing = ({
    files = [],
    onCloseFile,
}) => {
    const [showFile, setShowFile] = useState(false)
    const [orientation, setOrientation] = useState('')
    const [downloads, setDownloads] = useState(_.concat(...(_.map(files, file => {
        const a = [];
        return a[file.DetailingFileId] = false
    }))))
    const [selectedFile, setSelectedFile] = useState({})
    const [type, setType] = useState('')
    // console.log(downloads)
    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            const newOrientation = getOrientation();
            setOrientation(newOrientation)
        })
        return () => Dimensions.removeEventListener('change');
    }, [orientation])

    const showSelectedFile = (file) => {
        setSelectedFile(file)
        setType(file.FileType)
        setShowFile(true)
    }

    const onCloseFileModal = (seconds) => {
        onCloseFile(selectedFile.DetailingFileId, seconds)
        setSelectedFile('')
        setShowFile(false)
    }

    const renderItem = ({item}) => {
        doesFileExist(item.FileName).then(exists => setDownloads(downloads => {downloads[item.DetailingFileId] = exists; return downloads}))
        return (<ListItem
                underlayColor='transparent'
                subtitle={item && item.FileName}
                title={item && item.FileDescription}
                containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1}}
                titleStyle={{fontFamily: 'Lato-Semibold', color: brandColors.darkBrown, fontSize: RFValue(18)}}
                subtitleStyle={{fontFamily: 'Lato-MediumItalic', color: brandColors.darkBrown, fontSize: RFValue(16)}}
                leftIcon={<FontAwesome5Icon name={item.FileType == 'pdf' ? "file-pdf" : 'file-video'} size={25} color={brandColors.green} />}
                rightIcon={
                    downloads[item.DetailingFileId] ? <MaterialIcon size={25} color={brandColors.green} name={'cloud-done'}/>
                    : <MaterialCommunityIcon size={RFValue(25)} color={'red'} name='progress-download' />}
                onPress={() => downloads[item.DetailingFileId] ? showSelectedFile(item) : DropDownHolder.show(alertData.media)}
            />)
    }

    return (
        <View>
            <ScrollView contentContainerStyle={{ alignItems: 'center'}}>
                {
                    files.length > 0
                    ? <FlatList
                        keyExtractor={item => `${item.DetailingFileId}${RandomInteger()}`}
                        style={{width: '80%'}}
                        data={files}
                        renderItem={renderItem}
                    />
                    : <ListItem
                        key={`asd${RandomInteger()}`}
                        style={{width: '80%', height: 30}}
                        title="No files found"
                        containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1}}
                        titleStyle={{fontFamily: 'Lato-Heavy', fontSize: RFValue(18) }}
                        subtitleStyle={{fontFamily: 'Lato-MediumItalic'}}
                    />
                }
                
                <Overlay
                    animationType="slide"
                    isVisible={showFile}
                    transparent={true}
                    width="95%"
                    height="90%"
                    borderRadius={15}
                    children={ type == 'pdf' ? <PDF onClose={onCloseFileModal} file={selectedFile}/> : <Video onClose={onCloseFileModal} file={selectedFile} /> }
                    onRequestClose={() => console.log('closed')}
                />
            </ScrollView>
        </View>
    );
}

export default EDetailing;