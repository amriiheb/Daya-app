import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  FlatList,
  Text,
  View,
  ImageBackground,
} from "react-native";
import AlbumComponent from "../components/Album";
import AlbumComponent2 from "../components/Album2";
import AlbumComponent3 from "../components/Album3";

const CategoryScreen = () => {
  const route = useRoute();
  const categoryID = route.params.id;
  const [CategoryALbums, setCategoryALbums] = useState([]);

  useEffect(() => {
    console.log("code#####################:", categoryID);
    fetch(`https://api.dayahistoire.fr/api/category/${categoryID}/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(
        (AlbumDetails) => setCategoryALbums(AlbumDetails)
        // console.log(AlbumDetails)
      )

      .catch((error) => Alert.alert("error", error.message));
  }, []);
  return (
    <ImageBackground
      source={require("../assets/img/aa.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.text}>{CategoryALbums.name}</View>

        <FlatList
          data={CategoryALbums}
          renderItem={({ item }) => <AlbumComponent3 album={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};
export default CategoryScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,

    color: "white",
    flexDirection: "row",

    alignItems: "center",
  },
});
