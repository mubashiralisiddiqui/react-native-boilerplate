// With Flow type annotations (https://flow.org/)
// import PDFView from 'react-native-view-pdf';
// Without Flow type annotations
import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import PDFView from  'react-native-view-pdf/lib/index';
import { FontAwesomeIcon } from '../Icons'
import { brandColors, mediaStoragePath } from '../../constants';
import { Button } from 'react-native-elements';
import { ImageBackgroundWrapper } from '..';
import { useInterval } from '../../hooks/useInterval';

const PDF = ({
  file,
  onClose,
}) => {
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    setSeconds(seconds => seconds + 1);
  }, 1000)
  
  
  const resource = `${mediaStoragePath}/${file.FileName}`

  return (
    <ImageBackgroundWrapper>
      <View style={{ flex: 1 }}>
        <View style={{position: 'absolute', zIndex: 1000000, top: 10, right: 10}}>
          <Button
            type="clear"
            onPress={() => onClose(seconds)}
            icon={<FontAwesomeIcon size={30} name="window-close" color={brandColors.lightGreen} />}
          />
        </View>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resource}
          resourceType={'file'}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error, resource)}
        />
      </View>
    </ImageBackgroundWrapper>
  )
}

export default PDF;

