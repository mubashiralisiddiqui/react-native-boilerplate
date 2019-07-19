// With Flow type annotations (https://flow.org/)
// import PDFView from 'react-native-view-pdf';
// Without Flow type annotations
import * as React from 'react';
import { Platform, View } from 'react-native'
import PDFView from  'react-native-view-pdf/lib/index';
import RNFetchBlob from 'rn-fetch-blob'

const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/data/user/0/com.hudsonpharma/files/a.pdf',
  url: 'http://www.africau.edu/images/default/sample.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};

export default class App extends React.Component {
  download = (url) => {
    let dirs = RNFetchBlob.fs.dirs
    RNFetchBlob
    .config({
      // response data will be saved to this path if it has access right.
      path : dirs.DocumentDir + '/a.pdf'
    })
    .fetch('GET', url, {
      //some headers ..
    }).progress((received, total) => {
      console.log('progress', received / total, 'received=>', received, 'total=>', total)
    })
    .then((res) => {
      console.log('The file saved to ', res.path(), res)
    }).catch(console.log)
  }
  render() {
    const resourceType = 'file';
    // this.download('https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf');

    return (
      <View style={{ flex: 1 }}>
        {/* Some Controls to change PDF resource */}
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      </View>
    );
  }
}