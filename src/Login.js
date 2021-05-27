import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import HMSAccount, {
    HMSAccountAuthService,
    HMSAuthButton,
    HMSAuthRequestOptionConstants,
    HMSAuthScopeListConstants,
    HMSAuthParamConstants,
} from "@hmscore/react-native-hms-account";

import HMSGameService from "@hmscore/hms-js-gameservice";


const App = () => {

    // useEffect(() => {
    //     HMSGameService.init(NativeModules, DeviceEventEmitter);
    // }, []);


    const signIn = () => {
        let signInData = {
            accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM_GAME,
            authRequestOption: [HMSAuthRequestOptionConstants.ID_TOKEN, HMSAuthRequestOptionConstants.ACCESS_TOKEN, HMSAuthScopeListConstants.EMAIL]
        };
        HMSAccountAuthService.signIn(signInData)
            .then((response) => { console.log("Sign In -> ", response) })
            .catch((err) => { console.log("Sign In -> ", err) });
    };

    const silentSignIn = () => {
        let silentSignInData = {
            accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM_GAME,
        };
        HMSAccountAuthService.silentSignIn(silentSignInData)
            .then((response) => { console.log("silentSignIn -> ", response) })
            .catch((err) => {
                if (err.code === "2002") {
                    signIn()
                }
            });
    };

    const cancelAuthorization = () => {
        HMSAccountAuthService.cancelAuthorization()
            .then(() => { console.log("cancelAuthorization -> ", "Success") })
            .catch((err) => { console.log("cancelAuthorization -> ", err) });
    };

    return (
        <View>
            <TouchableOpacity onPress={cancelAuthorization}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            <HMSAuthButton
                style={styles.viewcontainer}
                colorPolicy={HMSAccount.HUAWEI_ID_AUTH_BUTTON_COLOR_POLICY_RED}
                enabled={true}
                theme={HMSAccount.HUAWEI_ID_AUTH_BUTTON_THEME_FULL_TITLE}
                cornerRadius={HMSAccount.HUAWEI_ID_AUTH_BUTTON_CORNER_RADIUS_MEDIUM}
                onPress={silentSignIn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    viewcontainer: {
        marginTop: 20,
        height: 38
      },
});

export default App;
