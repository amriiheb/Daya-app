import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Alert, ImageBackground, Button } from "react-native";
// import { useRoute , useEffect } from '@react-navigation/native';

import SongListItem from "../components/SongListItem";
import { FlatList } from "react-native-gesture-handler";
import AlbumHeader from "../components/AlbumHeader";

const AlbumScreen = () => {
  const route = useRoute();
  const albumId = route.params.id;
  const library = route.params.lib;
  const navigation = useNavigation();

  const [AlbumDetails, setAlbumDetails] = useState([]);

  useEffect(() => {
    fetch(`https://api.dayahistoire.fr/api/album/${albumId}/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((AlbumDetails) => setAlbumDetails(AlbumDetails))

      .catch((error) => Alert.alert("error", error.message));
  }, []);

  return (
    <ImageBackground
      source={require("../assets/img/aa.png")}
      style={{ width: "100%", height: "100%" }}
    >
      {library ? (
        <View style={{ flex: 1 }}>
          {/* <Button onPress={() => navigation.navigate('Bibliothèque')} title="Retourner vers la bibliotheque" /> */}

          <FlatList
            data={AlbumDetails.album_musics}
            renderItem={({ item }) => <SongListItem song={item} lib={"true"} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <AlbumHeader album={AlbumDetails} lib={"true"} />
            )}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={AlbumDetails.album_musics}
            renderItem={({ item }) => <SongListItem song={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => <AlbumHeader album={AlbumDetails} />}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default AlbumScreen;
