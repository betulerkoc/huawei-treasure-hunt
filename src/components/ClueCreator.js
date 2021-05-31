import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image
} from 'react-native';
import ScanPlugin from '@hmscore/react-native-hms-scan';

const ClueCreator = () => {

  const [buildBitmapRequest, setBuildBitmapRequest] = useState({
    content: "What has 4 legs but can’t walk and has hair at night? You saw it this morning. The next clue is hiding under it.",
    type: ScanPlugin.ScanType.All,
    width: 200,
    height: 200,
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
    <View style={styles.setup}>
      <View style={styles.barcode}>
        <Text style={styles.text}>Barcode Content : </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setBuildBitmapRequest({
            ...buildBitmapRequest,
            content: text
          })}
          value={buildBitmapRequest.content}
        />
      </View>
      <TouchableOpacity onPress={buildBitmap} style={styles.button}>
        <Text style={styles.buttonText}>Build bitmap</Text>
      </TouchableOpacity>
      {imageData &&
        <View style={styles.barcode}>
          <Image style={styles.image}
            source={{ uri: base64ImagePng + imageData }} />
        </View>
      }
    </View>
  );

};

const styles = StyleSheet.create({
  setup: {
    padding: 30,
    flexDirection: "column"
  },
  barcode: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200,
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray'
  },
  button: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white'
  }
});

export default ClueCreator;

