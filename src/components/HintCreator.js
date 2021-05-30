import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image
} from 'react-native';
import ScanPlugin from '@hmscore/react-native-hms-scan';

const App = () => {

  const [buildBitmapRequest, setBuildBitmapRequest] = useState({
    content: "Type here",
    type: ScanPlugin.ScanType.All,
    width: 150,
    height: 150,
    margin: 1,
    color: -16777216,
    backgroundColor: -1,
    qrLogoBitmap: ""
  })
  const [imageData, setImageData] = useState(null);

  const base64ImagePng = "data:image/png;base64,";

  const buildBitmap = () => {
    ScanPlugin.Utils.buildBitmap(buildBitmapRequest)
      .then((res) => {
        setImageData(res);
      })
      .catch((e) => console.log(e))
  }
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Barcode Content : </Text>
        <TextInput
          style={{ flex: 3 }}
          onChangeText={(text) => setBuildBitmapRequest({
            ...buildBitmapRequest,
            content: text
          })}
          value={buildBitmapRequest.content}
        />
      </View>
      <TouchableOpacity onPress={buildBitmap}>
        <Text>Build bitmap</Text>
      </TouchableOpacity>
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

