import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const BuyAlbum = () => {
  const route = useRoute();
  const itemId = route.params.id;
  const price = route.params.price;
  const [account, setAccount] = useState("");

  //GET ACCOUNT SOLDE
  useEffect(() => {
    axios
      .get("https://api.dayahistoire.fr/api/user/")
      .then((response) => {
        setAccount(response.data.balance);
      })

      .catch((error) => Alert.alert("error", error.message));
  }, []);

  const BuyAlbum = async () => {
    Alert.alert("buying..");

    await axios
      .get(`https://api.dayahistoire.fr/api/buyAlbum/${itemId}/`)
      .then((response) => {
        Alert.alert("Note:", response.data);
      })

      .catch((error) => Alert.alert("error", error.message));
  };

  return (
    <ImageBackground
      source={require("../assets/img/aa.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>solde du points {account} points</Text>

        <View>
          <TouchableOpacity onPress={() => BuyAlbum()}>
            <Text style={styles.btn}>Acheter l'album avec {price} points</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BuyAlbum;

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  text: {
    color: "#eee",
    fontSize: 20,
    marginBottom: 50,
    textAlign: "center",
  },
  btn: {
    padding: 10,
    borderRadius: 9,
    backgroundColor: "#fe0680",
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "bold",

    marginBottom: 10,
    marginTop: 10,
  },
  btn1: {
    padding: 10,
    borderRadius: 9,
    backgroundColor: "#eee",
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "bold",

    marginBottom: 10,
    marginTop: 10,
  },
});
