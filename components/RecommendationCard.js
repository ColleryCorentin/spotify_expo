import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';

const RecommendationCard = ({item}) => {

    return (
        <View style={{margin: 5}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                    <Image source={{uri: item.album.images[0].url}} style={{height: 160, width: 160}}/>
                    <Text numberOfLines={1} style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "white",
                        marginTop: 10,
                        maxWidth: 160,

                    }}>
                        {item.album.name}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "grey",
                        marginTop: 2,
                        marginBottom: 50,
                        maxWidth: 160,
                    }}>Album • {item.album.artists[0].name}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default RecommendationCard;
const styles = StyleSheet.create({});