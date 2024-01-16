import {StyleSheet, Text, View, SafeAreaView, Pressable, Vibration} from "react-native";
import React, {useEffect} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {Entypo} from "@expo/vector-icons";
import {makeRedirectUri, ResponseType, useAuthRequest} from 'expo-auth-session';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const LoginScreen = () => {
    const navigation = useNavigation()
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: '872ebf2a27f3496d9764cc97eff3e5ea',
            /*
                        clientId: 'a3f872ecf7334bc0b36000d3ed873fec',
            */
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            usePKCE: false,
            redirectUri: "exp://localhost:19000/--/callback",
        },
        discovery,
    );

    useEffect(() => {
        if (response?.type === "success") {
            Vibration.vibrate();
            const {access_token} = response.params;
            AsyncStorage.setItem('token', access_token)
                .then(() => {
                    console.log("Token saved successfully");
                    Vibration.vibrate()
                    navigation.navigate("Main", {screen: "Main"});
                })
                .catch(error => {
                    console.log("Error saving token:", error);
                });
        }
    }, [response]);

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{flex: 1}}>
            <SafeAreaView>
                <View style={{height: 80}}/>
                <Entypo
                    style={{
                        textAlign: "center",
                        marginTop: 150
                    }}
                    name="spotify"
                    size={80}
                    color="white"
                />
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 40,
                    }}
                >
                    My_Spotify
                </Text>
                <View style={{height: 80}}/>
                <Pressable
                    onPress={() => {
                        promptAsync({navigation}).then(r => console.log(r));
                    }}

                    disabled={!request}
                    style={{
                        backgroundColor: "#1DB954",
                        padding: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 300,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10
                    }}
                >
                    <Text>Sign In with spotify</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});