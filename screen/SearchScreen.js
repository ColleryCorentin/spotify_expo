import {
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Pressable,
    Image,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArtistSearchCard from "../components/ArtistSearchCard";

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState([]);
    const [searchOptions, setSearchOptions] = useState('artist');

    const handleSearch = (text) => {
        setSearchText(text);
    };

    useEffect(() => {
        const getSearch = async () => {
            const accessToken = await AsyncStorage.getItem('token');
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${searchText}&type=${searchOptions}&market=FR&include_external=audio&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = await response.json();
                setSearch(data);
                return data;
            } catch (err) {
                console.log(err);
            }
        };

        if (searchText !== '') {
            getSearch();
        }
    }, [searchText]);


    const renderItem = ({item}) => {
        return (

            <Pressable
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 7,
                    marginVertical: 6,
                    backgroundColor: '#282828',
                    borderRadius: 4,
                    elevation: 3,
                    flexWrap: 'wrap',
                    maxHeight: 55,
                }}
            >
                <Image
                    style={{
                        height: 55,
                        width: 55,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                    }}
                    source={{uri: item.images[0]?.url}}
                />
                <View style={{flex: 1, marginHorizontal: 8, justifyContent: 'center'}}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'white',
                            borderRadius: 4,
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </Pressable>

        );
    };

    return (
        <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
            <SafeAreaView>

                {/* <Text style={{
                    padding: 20,
                    marginTop: 7,
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Recherche</Text>*/}

                <SearchBar
                    placeholder="What do you want to listen to?"
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                    inputStyle={styles.searchBarInput}
                    searchIcon={{name: 'search', color: 'white', size: 25}}
                    clearIcon={{name: 'clear', color: 'white'}}
                    onChangeText={handleSearch}
                    value={searchText}
                    onClear={() => setSearchText('')}
                    onCancel={() => setSearchText('')}
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => {
                        setSearchOptions('artist')
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: searchOptions === "artist" ? '#1cd760' : '#242424',
                                borderRadius: 100,
                                marginBottom: 20,
                                marginLeft: 20,
                                padding: 10
                            }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>Artiste</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSearchOptions('track')
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: searchOptions === "track" ? '#1cd760' : '#242424',
                            borderRadius: 100,
                            marginBottom: 20,
                            marginLeft: 10,
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>Musiques</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSearchOptions('album')
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: searchOptions === "album" ? '#1cd760' : '#242424',
                            borderRadius: 100,
                            marginBottom: 20,
                            marginLeft: 10,
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>Albums</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSearchOptions('playlist')
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: searchOptions === "playlist" ? '#1cd760' : '#242424',
                            borderRadius: 100,
                            marginBottom: 20,
                            marginLeft: 10,
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>Playlists</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSearchOptions('show')
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: searchOptions === "show" ? '#1cd760' : '#242424',
                            borderRadius: 100,
                            marginBottom: 20,
                            marginLeft: 10,
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>Podcast & Shows</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView>

                    {/*<FlatList
                        data={search?.artists?.items}
                        renderItem={renderItem}
                        numColumns={1}
                                columnWrapperStyle={{justifyContent: 'space-between'}}
                        scrollEnabled={false}
                    ></FlatList>*/}
                    {searchOptions === 'artist' && search?.artists?.items.map((item, index) => (
                        <ArtistSearchCard item={item} key={index}/>
                    ))}

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};


export default SearchScreen;

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 0,
        paddingBottom: 20
    },
    searchBarInputContainer: {
        backgroundColor: '#242424',
        borderRadius: 6,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        height: 30,
        alignItems: 'center',
    },
    searchBarInput: {
        color: 'white',
        fontSize: 16,
    },
});
