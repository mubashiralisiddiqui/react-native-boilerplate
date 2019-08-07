import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { RandomInteger, brandColors, getOrientation } from '../../constants';
import { ListItem, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { PDF } from '../../components';
import RNFetchBlob from 'rn-fetch-blob'
import { TouchableHighlight } from 'react-native-gesture-handler';

const EDetailing = ({
    files = [],
    existingCall = false,
    onCloseFile,
}) => {
    const [showFile, setShowFile] = useState(false)
    const [orientation, setOrientation] = useState('')
    const [selectedFile, setSelectedFile] = useState({})
    const [downloads, setDownloads] = useState([]);
    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            const newOrientation = getOrientation();
            setOrientation(newOrientation)
        })
        return () => Dimensions.removeEventListener('change');
    }, [orientation])

    const showSelectedFile = (file) => {
        setSelectedFile(file)
        setShowFile(true)
    }

    const onCloseFileModal = (seconds) => {
        onCloseFile(selectedFile.ProductId, seconds)
        setSelectedFile('')
        setShowFile(false)
    }

    const download = async (url, name, id) => {
        let dirs = RNFetchBlob.fs.dirs
        console.log(dirs.DocumentDir)
        const exists = await RNFetchBlob.fs.exists(`${dirs.DocumentDir}/${name}`)
        setDownloads(downloads => {
            downloads[id] = exists
            return downloads
          } )
        console.log('exists=>', exists);
        if(!exists) {
            RNFetchBlob
            .config({
              // response data will be saved to this path if it has access right.
              path : `${dirs.DocumentDir}/${name}`
            })
            .fetch('GET', url, {
              //some headers ..
            }).progress((received, total) => {
              console.log('progress', received / total, 'received=>', received, 'total=>', total)
            })
            .then((res) => {
              setDownloads(downloads => {
                  downloads[id] = true
                  return downloads
                })
              console.log('The file saved to ', res.path(), res)
            }).catch(console.log)
        }
    }
    const renderItem = ({item}) => {
        download(`http://portal.hudsonpharma.com${item[0].FilePath}`, item[0].FileName, item[0].DetailingFileId);
        console.log(downloads, 'status download')
        return (
            <ListItem
                title={item[0] && item[0].FileName}
                subtitle={item[0] && item[0].FileDescription}
                containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 1, color: 'transparent'}}
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="file-pdf" size={25} color={brandColors.green} />}
                rightIcon={<MaterialIcon
                    size={25}
                    color={downloads[item[0].DetailingFileId] != undefined && downloads[item[0].DetailingFileId] == true ? brandColors.green : 'red' }    
                    name={downloads[item[0].DetailingFileId] != undefined && downloads[item[0].DetailingFileId] == true ? 'cloud-done' : 'cloud-download'} 
                        />}
                onPress={() => showSelectedFile(item[0])}
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
                animationType="slide"
                isVisible={showFile}
                transparent={true}
                animationType={'fade'}
                width="95%"
                height="95%"
                borderRadius={15}
                children={<PDF onClose={onCloseFileModal} file={selectedFile}/>}
                onRequestClose={() => console.log('closed')}
            />
        </View>
    );
}

export default EDetailing;