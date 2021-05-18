import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import ScanPlugin from '@hmscore/react-native-hms-scan';
import FilePickerManager from 'react-native-file-picker';

const hintData = ["What has 4 legs but can’t walk and has hair at night? You saw it this morning. The next clue is hiding under it.",
  "It is white but it turns yellow when falls on the floor. You next clue is hiding right next to it.",
  "I lose my head in the mornings and get it back at nights. What am I? The next clue is hiding under it.",
  "I stand up and make your day brighter."]

const App = () => {

  const base64ImagePng = "data:image/png;base64,";

  const [imageData, setImageData] = useState([]);

  const filePicker = (callback) => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled file picker");
      } else if (response.error) {
        console.log("FilePickerManager Error: ", response.error);
      } else {
        callback(response);
      }
    });
  }

  const buildBitmap = () => {
    filePicker((response) => {
      let args;
      let id = 0
      hintData.map((x) => {
        args = {
          content: x,
          type: ScanPlugin.ScanType.All,
          width: 200,
          height: 200,
          margin: 1,
          color: -16777216,
          backgroundColor: -1,
          showImage: false,
          qrLogoBitmap: response.uri
        };

        ScanPlugin.Utils.buildBitmap(args)
          .then((res) => {
            setImageData([...imageData, {
              id: id + 1,
              bitmap: res
            }]);
            console.log(imageData.length)
          })
          .catch((e) => console.log(e))
      })
    })
  }
  return (
    <View>
      <TouchableOpacity onPress={buildBitmap}>
        <Text>Build bitmap</Text>
      </TouchableOpacity>
      {console.log("yeys " + JSON.stringify(imageData))}
      {imageData &&
        <View>
          <Image style={{ height: 300, width: 300 }}
            source={{ uri: base64ImagePng + imageData }} />
        </View>
      }

    </View>
  );

};

const styles = StyleSheet.create({

});

export default App;
