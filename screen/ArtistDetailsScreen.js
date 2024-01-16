import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    Dimensions,
    Pressable,
    TouchableOpacity,
    FlatList, Button, Share
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av';
import { Entypo } from '@expo/vector-icons';


const ArtistDetailsScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const {item} = route.params;
    const [currentSound, setCurrentSound] = useState(null);

    let width = Dimensions.get('window').width

    const shareMusic = async (item) => {
        console.log(item)
        try {
            const result = await Share.share({
                url:item,

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const playMusic = async (previewUrl) => {
        try {
            if (currentSound) {
                await currentSound.stopAsync(); // Arrêter la lecture du son en cours
            }

            const { sound } = await Audio.Sound.createAsync({ uri: previewUrl });
            await sound.playAsync();

            setCurrentSound(sound); // Mettre à jour la référence de currentSound
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getArtistAlbums = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            try {
                const response = await fetch(`https://api.spotify.com/v1/artists/${item.id}/albums?market=FR&limit=4`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setArtistAlbums(data.items);
                return data.items;
            } catch (err) {
                console.log(err)
            }
        }
        getArtistAlbums()
    }, [item.id]);

    useEffect(() => {
        const getTopTracks = async () => {
            const accessToken = await AsyncStorage.getItem("token")
            try {
                const response = await fetch(`https://api.spotify.com/v1/artists/${item.id}/top-tracks?market=FR&limit=5`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setArtistTopTracks(data.tracks);
                return data.items;
            } catch (err) {
                console.log(err)
            }
        }
        getTopTracks()
    }, [item.id]);

console.log(artistAlbums)
const renderItem =  ({item, index})=>{
console.log(item)
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                    style={{
                        fontSize: 13,
                        margin: 15,
                        fontWeight: "bold",
                        color: "white",
                        justifyContent: "center",
                    }}
                >
                    {index + 1}
                </Text>
                <Pressable
                    onPress={() => playMusic(item.preview_url)}
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 7,
                        marginVertical: 6,
                        borderRadius: 4,
                        elevation: 3,
                        flexWrap: 'nowrap',
                    }}
                >
                    <Image
                        style={{
                            height: 55,
                            width: 55,
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                        }}
                        source={{ uri: item?.album.images[0].url }}
                    />
                    <View style={{ flex: 1, marginHorizontal: 8, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "white",
                                borderRadius: 4,
                            }}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <Pressable onPress={() => shareMusic(item.preview_url)}>
                            <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Entypo name="dots-three-horizontal" size={16} color="grey" />
                            </View>
                        </Pressable>
                    </View>

                </Pressable>
            </View>
        )
}
    const renderAlbums = ({item}) => {
       const dateString = item.release_date
        const dateParts = dateString.split("-");
        const year = dateParts[0];

if (item.album_type === 'album'){
        return (
            <Pressable

                style={{
                    flex: 1,
                    flexDirection: "row",
                    marginHorizontal: 2,
                    marginVertical: 2,
                    elevation: 3,
                    flexWrap: "wrap",
                    maxHeight: 300,
                }}
            >
                <View
                    style={{
                        justifyContent: "space-around",
                        marginLeft: 20,
                        flexDirection: "row",
                    }}
                >
                    <Image
                        style={{
                            height: 90,
                            width: 90,
                            resizeMode: "cover",
                            marginRight: 10,
                            marginBottom: 15
                        }}
                        source={{ uri: item.images[0].url }}
                    />
                    <View style={{ margin: 0, paddingBottom: 15, flexShrink: 1, maxWidth: 'auto' ,justifyContent:'center' }}>
                        <Text numberOfLines={1} style={{ color: "white", fontWeight: "bold" }}>
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                        </Text>
                        <Text numberOfLines={1} style={{ color: "grey", fontSize:13 }}>
                            {year + " • " + item.album_type.charAt(0).toUpperCase() + item.album_type.slice(1).toLowerCase()}
                        </Text>
                    </View>
                </View>
            </Pressable>

        )
}else return false
    }

    return (
        <View style={{flex: 1, backgroundColor:'black'}}>
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <View>
                    <Image style={{height: width, width: width, position: 'absolute', top: 0, left: 0}}
                           source={{uri: item.images[0].url}}/>
                </View>
                <ScrollView style={{flex: 1, paddingTop: width}}>
                    <AntDesign name="left" size={24} color="white" style={{position: 'absolute', zIndex:1, marginTop:-330, marginLeft: 10}} onPress={()=>{
                        navigation.navigate("Search")
                    }}/>
                        <Text style={{color: 'white', fontSize: 40, fontWeight: "bold", marginTop:'-31%', zIndex:1}}>{item.name}</Text>
                    <LinearGradient style={{backgroundColor: 'black'}} colors={["#040306", "#131624"]}>
                        <Text style={{color: 'white', fontSize: 12, fontWeight: "bold", marginTop:10}}>{item.followers.total} Followers</Text>
                        <TouchableOpacity>
                            <View
                                style={{
                                    marginTop:10,
                                    borderRadius: 20,
                                    paddingVertical: 5, // ajustez ces valeurs pour contrôler la taille du bouton
                                    paddingHorizontal: 20,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    alignSelf: 'flex-start',
                                    marginLeft: 20// pour aligner le bouton à gauche
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textAlign: 'center', // pour centrer le texte
                                    }}>
                                    Follow
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{color:"white", fontSize:25, fontWeight:"bold", marginLeft: 20, marginTop: 40, marginBottom: 15}}>Populaires</Text>
                        <FlatList
                            data={artistTopTracks.slice(0, 5)} // Utilisation de slice() pour obtenir les 5 premiers éléments
                            renderItem={renderItem}
                            numColumns={1}
                            scrollEnabled={false}
                        ></FlatList>
                        <Text style={{color:"white", fontSize:25, fontWeight:"bold", marginLeft: 20, marginTop: 40, marginBottom: 15}}>Albums</Text>
                        <FlatList data={artistAlbums} numColumns={1}
                                  scrollEnabled={false} renderItem={renderAlbums}>
                        </FlatList>
                    </LinearGradient>
                </ScrollView>
            </View>
        </View>
    );
};

export default ArtistDetailsScreen;
const styles = StyleSheet.create({});

