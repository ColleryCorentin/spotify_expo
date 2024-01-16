import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ScrollView
} from "react-native";
import React, {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ArtistCard from "../components/ArtistCard";
import PlaylistCard from "../components/PlaylistCard";
import RecommendationCard from "../components/RecommendationCard";

const HomeScreen = () => {
    const [userProfile, setUserProfile] = useState();
    const [recentlyPlay, setRecentlyPlay] = useState([]);
    const [favoritesArtists, setFavoritesArtists] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const navigation = useNavigation()

    const getProfile = async () => {
        const accessToken = await AsyncStorage.getItem("token")
        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = await response.json();
            setUserProfile(data);
            return data;
        } catch (err) {
        }
    }

    const getRecentlyPlayed = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=6", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setRecentlyPlay(data.items);
            return data.items;
        } catch (err) {
        }
    };

    const renderItem = ({item}) => {
        return (
            <Pressable style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 7,
                marginVertical: 6,
                backgroundColor: "#282828",
                borderRadius: 4,
                elevation: 3,
                flexWrap: 'wrap',
                maxHeight: 55
            }}>
                <Image style={{
                    height: 55,
                    width: 55,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                }} source={{uri: item.track.album.images[0].url}}/>
                <View style={{flex: 1, marginHorizontal: 8, justifyContent: "center"}}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: "white",
                            borderRadius: 4,
                        }}>
                        {item.track.name}
                    </Text>
                </View>
            </Pressable>
        )
    }


    const getFavoritesArtists = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        const type = "artists"
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setFavoritesArtists(data.items);
            return data.items;
        } catch (err) {
            console.log(err)
        }
    }

    const getUserPlaylist = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setUserPlaylist(data.items);
            return data.items;
        } catch (err) {
            console.log(err)
        }
    }

    const getRecommendation = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`https://api.spotify.com/v1/recommendations?market=FR&seed_genres=metal`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setRecommendation(data);
            return data;
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getProfile()
        getRecentlyPlayed()
        getFavoritesArtists()
        getUserPlaylist()
        getRecommendation()
    }, []);


    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{flex: 1}}>
            <SafeAreaView style={{marginTop: 50}}>
                <ScrollView>
                    <View
                        style={{
                            padding: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Image style={{height: 40, width: 40, borderRadius: 20, resizeMode: "cover"}}
                                   source={{uri: userProfile?.images[0].url}}/>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white"
                            }}>Bonjour</Text>
                        </View>
                        <MaterialCommunityIcons name="lightning-bolt-outline" size={24}
                                                color="white"></MaterialCommunityIcons>
                    </View>
                    <View>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 27,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 30
                        }}> Écoutés
                            récemment</Text>
                        <FlatList data={recentlyPlay} renderItem={renderItem} numColumns={2}
                                  columnWrapperStyle={{justifyContent: "space-between"}}
                                  scrollEnabled={false}></FlatList>


                        <Text style={{
                            marginLeft: 10,
                            fontSize: 27,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 30
                        }}>Vos artistes préférés</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {favoritesArtists.map((item, index) => (
                                <ArtistCard item={item} key={index}/>
                            ))}
                        </ScrollView>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 27,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 30
                        }}>Vos playlists</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {userPlaylist.map((item, index) => (
                                <PlaylistCard item={item} key={index}/>
                            ))}
                        </ScrollView>

                        <Text style={{
                            marginLeft: 10,
                            fontSize: 27,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 30
                        }}>Recommandations</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {recommendation && recommendation?.tracks.map((item, index) => (
                                <RecommendationCard item={item} key={index}/>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({});