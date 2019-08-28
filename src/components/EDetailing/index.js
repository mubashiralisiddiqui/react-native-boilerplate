import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { RandomInteger, brandColors, getOrientation, doesFileExist, RFValue, MEDIA_DOWNLOAD_INPROGRESS } from '../../constants';
import { ListItem, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PDF } from '../../components';
import Video from '../Video'
import { ScrollView } from 'react-native-gesture-handler';
import DropDownHolder from '../../classes/Dropdown';

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
    console.log(downloads)
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
                title={item && item.FileName}
                subtitle={item && item.FileDescription}
                containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1}}
                titleStyle={{fontFamily: 'Lato-Semibold', color: brandColors.darkBrown}}
                subtitleStyle={{fontFamily: 'Lato-MediumItalic', color: brandColors.darkBrown}}
                leftIcon={<Icon name={item.FileType == 'pdf' ? "file-pdf" : 'file-video'} size={25} color={brandColors.green} />}
                rightIcon={
                    downloads[item.DetailingFileId] ? <MaterialIcon size={25} color={brandColors.green} name={'cloud-done'}/>
                    : <MaterialCommunityIcon size={RFValue(25)} color={'red'} name='progress-download' />}
                onPress={() => downloads[item.DetailingFileId] ? showSelectedFile(item) : DropDownHolder.show('info', 'File Download Inprogess', MEDIA_DOWNLOAD_INPROGRESS)}
            />)
        // return (
        //     <ListItem
        //         underlayColor='transparent'
        //         title={item && item.FileName}
        //         subtitle={item && item.FileDescription}
        //         containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1}}
        //         titleStyle={{fontFamily: 'Lato-Semibold', color: brandColors.darkBrown}}
        //         subtitleStyle={{fontFamily: 'Lato-MediumItalic', color: brandColors.darkBrown}}
        //         leftIcon={<Icon name={item.FileType == 'pdf' ? "file-pdf" : 'file-video'} size={25} color={brandColors.green} />}
        //         rightIcon={<MaterialIcon
        //             size={25}
        //             color={true ? brandColors.green : 'red' }    
        //             name={true ? 'cloud-done' : 'cloud-download'} 
        //                 />}
        //         onPress={() => showSelectedFile(item)}
        //     />
        // )
    }
    const [paused, setPaused] = useState(false)

    return (
        <View>
            <ScrollView contentContainerStyle={{ alignItems: 'center'}}>
                {
                    files.length > 0
                    // ? _.map(files, file => <RenderItem item={file} />)
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
                        titleStyle={{fontFamily: 'Lato-Heavy'}}
                        subtitleStyle={{fontFamily: 'Lato-MediumItalic'}}
                    />
                }
                
                <Overlay
                    animationType="slide"
                    isVisible={showFile}
                    transparent={true}
                    animationType={'fade'}
                    width="95%"
                    height="95%"
                    borderRadius={15}
                    children={ type == 'pdf' ? <PDF onClose={onCloseFileModal} file={selectedFile}/> : <Video onClose={onCloseFileModal} file={selectedFile} setPaused={setPaused} paused={paused} /> }
                    onRequestClose={() => console.log('closed')}
                />
            </ScrollView>
        </View>
    );
}

export default EDetailing;