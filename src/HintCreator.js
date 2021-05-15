import React, {useState} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ScanPlugin from '@hmscore/react-native-hms-scan';

const hintData = ["What has 4 legs but can’t walk and has hair at night? You saw it this morning. The next clue is hiding under it.",
"It is white but it turns yellow when falls on the floor. You next clue is hiding right next to it.",
"I lose my head in the mornings and get it back at nights. What am I? The next clue is hiding under it.",
"I stand up and make your day brighter.",
"What has 4 legs but can’t walk and has hair at night? You saw it this morning. The next clue is hiding under it.",
"It is white but it turns yellow when falls on the floor. You next clue is hiding right next to it.",
"I lose my head in the mornings and get it back at nights. What am I? The next clue is hiding under it.",
"I stand up and make your day brighter."]

const App = () => {

  const [base64ImageData, setImageData] = useState([]);
  const [reqObj, setReqObj] = useState({
    content: "",
    type: ScanPlugin.ScanType.All,
    width: 200,
    height: 200,
    margin: 1,
    color: -16777216, // BLACK,
    backgroundColor: -1, // WHITE,
  })

  const buildBitmap = () => {
    hintData.map((x) => {
      setReqObj({
        ...reqObj,
        content: x
      })
  });

ScanPlugin.Utils.buildBitmap(reqObj)
.then((res) => {
  console.log(res);
  setImageData([...base64ImageData, res])
}) 
.catch((e) => {console.log(e)})
}
  return (
    <View>
    <TouchableOpacity onPress={buildBitmap}>
       <Text>Build bitmap</Text>
     </TouchableOpacity>
     {base64ImageData && console.log(base64ImageData)}
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
