import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlbumComponent2 from "../components/Album2";

const Library = () => {



  
  const route = useRoute();
  //   const categoryID = route.params.id;
  const [CategoryALbums, setCategoryALbums] = useState([]);
  const [cat, setCat] = useState([]);
  // const [term, setTerm] = useState('')

  const getCats = async () => {
    await axios
      .get("https://api.dayahistoire.fr/api/Cats/")
      .then((response) => {
        //  console.log('response###############################:', response.data );

        setCat(response.data);
      })

      .catch((error) => Alert.alert("Note:", error.message));
  };

  // useEffect(() => {
    
  //   return () => {
  //     axios
  //     .get(`https://api.dayahistoire.fr/api/get/${term}`)
  //     .then((response) => {
  //       // console.log("&&&&&&&&&&&&&&&&&response:", response.data);
  //       // console.log("[[[[[[[[[[[[[[[[[[[response:", response.data);

  //       setCategoryALbums(response.data);
  //     })

  //     .catch((error) => Alert.alert("error", error.message));
      
  //   }
  // }, [term])

  const getLibrary = async () => {
    await axios
      .get("https://api.dayahistoire.fr/api/library/")
      .then((response) => {
        console.log("response:", response.data);

        setCategoryALbums(response.data);
      })

      .catch((error) => Alert.alert("error", error.message));
  };

  useEffect(() => {
    getLibrary();
    getCats();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/img/aa.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Bibliothèque</Text>

        {/* <View style={styles.scroll}>
          <FlatList
            horizontal
            data={cat}
            renderItem={({ item }) => (
              <TouchableOpacity>
              <Text onPress={() => setTerm(item.name)} style={styles.card}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
          />
        </View> */}

        <View style={styles.flat}>
          <FlatList
            data={CategoryALbums}
            renderItem={({ item }) => <AlbumComponent2 album={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Library;

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

    alignItems: "center",
    marginTop: 20,
  },
  card: {
    color: "white",
    marginLeft: 10,
    backgroundColor: "#fff4",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
  },
  scroll: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  flat: {
    padding: 15,
    display: "flex",
  },
});
