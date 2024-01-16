import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const PlaylistCard = ({item}) => {
    return (
        <View style={{margin: 5}}>
            <Image style={{width: 130, height: 130}} source={{uri: item.images[0].url}}/>
            <Text style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                marginTop: 10,
            }}>{item.name}</Text>
            <Text style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "grey",
                marginTop: 2
            }}>Playlist</Text>
        </View>
    );
};

export default PlaylistCard;
const styles = StyleSheet.create({});