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
  "I stand up and make your day brighter.",
  "What has 4 legs but can’t walk and has hair at night? You saw it this morning. The next clue is hiding under it.",
  "It is white but it turns yellow when falls on the floor. You next clue is hiding right next to it.",
  "I lose my head in the mornings and get it back at nights. What am I? The next clue is hiding under it.",
  "I stand up and make your day brighter."]

const App = () => {

  const base64ImagePng = "data:image/png;base64,";

  const [base64ImageData, setImageData] = useState(null);
  const [reqObj, setReqObj] = useState({
    content: "",
    type: ScanPlugin.ScanType.All,
    width: 200,
    height: 200,
    margin: 1,
    color: -16777216, // BLACK,
    backgroundColor: -1, // WHITE,
  })
//    qrLogoBitmap: "content://com.android.providers.media.documents/document/image%3A76981"
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

  const buildBitmap = async () => {
    filePicker((response) => {   
      setReqObj({
        qrLogoBitmap: response.uri
      })
      console.log(reqObj)
     })

    hintData.map((x) => {
      console.log(reqObj)
      setReqObj({
        ...reqObj,
        content: x
      })
      ScanPlugin.Utils.buildBitmap(reqObj)
      .then((res) => {
        console.log(res);  
        setImageData([...base64ImageData, res])
      })
      .catch((e) => { console.log(e) })
    });


  }
  return (
    <View>
      <TouchableOpacity onPress={buildBitmap}>
        <Text>Build bitmap</Text>
      </TouchableOpacity>
      {base64ImageData && <Image
        style={{ height: 300 }}
        source={{
          uri: base64ImagePng + base64ImageData,
        }}
      />}

    </View>
  );

};

const styles = StyleSheet.create({

});

export default App;
