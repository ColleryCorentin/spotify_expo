import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Image,
    FlatList,
    Pressable
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from '@expo/vector-icons';

const ConcertScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [concertsLoaded, setConcertsLoaded] = useState(false);
    const [concert, setConcert] = useState([]);
    const [city, setCity] = useState([]);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = (
        <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#00ff00"/>
        </View>
    );

    const getConcerts = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=tHj1uBDKylFO1aca6HkLwhDbHjUGAGRR&latlong=${location.coords.latitude},${location.coords.longitude}&locale=*&countryCode=FR&classificationName=Metal`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();
            setConcert(data);
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    const getCity = async () => {
        try {
            const responseCity = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
            const data = await responseCity.json();
            setCity(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    };


    if (errorMsg) {
        text = (
            <View style={styles.centeredContainer}>
                <Text>{errorMsg}</Text>
            </View>
        );
    } else if (location) {
        const renderConcerts = ({item}) => {
            const dateString = item.dates.start.localDate;
            const dateParts = dateString.split("-");
            const month = dateParts[1];
            const day = dateParts[2];
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
                    <View style={{justifyContent: "space-around", marginLeft: 20}}>
                        <Image
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 10,
                                resizeMode: "cover",
                            }}
                            source={{uri: item.images[2].url}}
                        />
                        <View style={{margin: 0, paddingBottom: 15}}>
                            <Text numberOfLines={1}
                                  style={{
                                      color: "grey",
                                      maxWidth: 100,
                                      fontSize: 10,
                                      paddingTop: 5,
                                  }}>
                                {day}/{month}
                            </Text>
                            <Text numberOfLines={1} style={{color: "white", fontWeight: "bold"}}>
                                {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                            </Text>
                            <Text numberOfLines={1}
                                  style={{color: "grey", maxWidth: 170, fontSize: 10,}}>
                                {item['_embedded'].venues[0].name + ', ' + item['_embedded'].venues[0].city.name}
                            </Text>
                        </View>
                    </View>
                </Pressable>

            )
        }
        if (location.coords && !concertsLoaded) {
            getConcerts();
            getCity()
            setConcertsLoaded(true);
        }
        text = (
            <View style={{flex: 1}}>
                <Text style={{
                    padding: 20,
                    marginLeft: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white"
                }}>Concerts proche</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#151419',
                    borderRadius: 100,
                    padding: 5,
                    marginRight: 'auto',
                    marginLeft: 20,
                    marginBottom: 20,
                    paddingRight: 10
                }}>
                    <Ionicons name="location-outline" size={20} color="white"/>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'white',
                    }}>{city.address?.city}</Text>
                </View>
                <FlatList data={concert["_embedded"]?.events} numColumns={2}
                          scrollEnabled={true} renderItem={renderConcerts}>
                </FlatList>
            </View>
        );
    }

    return (
        <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {text}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ConcertScreen;