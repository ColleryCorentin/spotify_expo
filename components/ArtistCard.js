import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const ArtistCard = ({item}) => {
    return (
        <View style={{margin: 5}}>
            <Image style={{width: 130, height: 130, borderRadius: 100}} source={{uri: item.images[0].url}}/>
            <Text style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                marginTop: 10,
                textAlign: "center"
            }}> {item.name}</Text>
        </View>
    );
};

export default ArtistCard;
const styles = StyleSheet.create({});