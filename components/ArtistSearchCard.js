import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import ArtistDetailsScreen from "../screen/ArtistDetailsScreen";

const ArtistSearchCard = ({item}) => {

    const navigation = useNavigation()

    return (
        <View>
            <Pressable
                onPress={() => navigation.navigate('ArtistDetailsScreen', {
                    item: item,
                })}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 7,
                    marginVertical: 6,
                    marginLeft: 15,
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
                        borderRadius: 50,
                    }}
                    source={{uri: item.images[0]?.url}}
                />
                <View style={{
                    flex: 1,
                    marginHorizontal: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 20,
                    flexDirection: "row",
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 15,
                                color: 'white',
                                borderRadius: 4,
                            }}
                        >
                            {item.name}

                        </Text>
                        <Text style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: "grey",
                            borderRadius: 4,
                        }}>
                            {item.type.toUpperCase().charAt(0) + item.type.slice(1)}
                        </Text>
                    </View>
                    <AntDesign name="right" size={24} color="grey"/>
                </View>
            </Pressable>
        </View>
    );
};

export default ArtistSearchCard;
const styles = StyleSheet.create({});
