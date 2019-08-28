// With Flow type annotations (https://flow.org/)
// import PDFView from 'react-native-view-pdf';
// Without Flow type annotations
import React, { useState, useEffect, Component } from 'react';
import { View } from 'react-native'
// import Video from  'react-native-video';
import Video from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/FontAwesome'
import { brandColors, mediaStoragePath } from '../../constants';
import { Button } from 'react-native-elements';

class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0,
            videoRef: '',
            interval: null,
            file: `file://${mediaStoragePath}/${this.props.file.FileName}`
        }
        let Ref;
    }
    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    seconds: this.state.seconds + 1
                });
              }, 1000)
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }
    render() {
        const {
            file,
            onClose,
            setPaused,
            paused
          } = this.props
        return (<View style={{ flex: 1 }}>
            <View style={{position: 'absolute', zIndex: 1000000, top: 10, right: 10}}>
                <Button
                type="clear"
                onPress={() => onClose(this.state.seconds)}
                icon={<Icon size={30} name="window-close" color={brandColors.lightGreen} />}
                />
            </View>
            <Video
                source={{uri: this.state.file}}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                controls={true}
                resizeMode='contain'
                onBack={() => onClose(this.state.seconds)}
                ref={ ref => this.Ref = ref}
                paused={false}
                onError={(error) => console.log(error)}
            />
        </View>)
    }
}
// = ({
//   file,
//   onClose,
//   setPaused,
//   paused
// }) => {
//   const [seconds, setSeconds] = useState(0);
//   let videoRef = ''
  

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds(seconds => seconds + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [])

//   const handlePause = () => {
//       console.log(paused)
//       setPaused(!paused)
//   }

  
  
//   const resource = `/data/user/0/com.hudsonpharma/files/${file.FileName}`

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{position: 'absolute', zIndex: 1000000, top: 10, right: 10}}>
//         <Button
//           type="clear"
//           onPress={() => onClose(this.state.seconds)}
//           icon={<Icon size={30} name="window-close" color={brandColors.lightGreen} />}
//         />
//       </View>
//       <Video
//         source={{uri: resource}}
//         style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             bottom: 0,
//             right: 0,
//           }}
//         controls={true}
//         resizeMode='contain'
//         onBack={() => onClose(this.state.seconds)}
//         ref={ ref => videoRef = ref}
//         // pauseOnPress={true}
//         // onPause={() => handlePause(true)}
//         // onPLay={() => handlePause(false)}
//         // onPLay={() => console.log('play')}
//         // onPause={() => console.log('!paused')}
//         // paused={paused}
//       />
//     </View>
//   )
// }

export default VideoPlayer;