import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView
} from 'react-native';
import imageData from "../hint.json"

const WriteQr = () => {

    const base64ImagePng = "data:image/png;base64,";

    return (
        <ScrollView style={styles.scrollView}>
            {imageData &&
                imageData.map((x) => {
                    return (
                        <View key={x.id}>
                            <Image style={{ height: 200, width: 200 }}
                                source={{ uri: base64ImagePng + x.bitmap }} />
                        </View>)
                })
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 500,
        marginBottom: 800
    },
});

export default WriteQr;
