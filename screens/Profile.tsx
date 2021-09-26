import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../components/context";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const userToken = AsyncStorage.getItem("userToken");
  console.log("userToken profile:", userToken);

  const handlesignOut = async () => {
    const userToken = AsyncStorage.getItem("userToken");
    signOut();
    await AsyncStorage.removeItem('token');
    console.log("logging out");
    console.log("userToken profile after log out:", userToken);
    navigation.replace("Login");
  };

  const [Data, setData] = useState([]);
  const [isSub, setIsSub] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.dayahistoire.fr/api/user/")
      .then((response) => {
        console.log("response:", response.data);

        setData(response.data);
        setIsSub(response.data.is_sub);
      })

      .catch((error) => Alert.alert("error", error.message));
  }, []);

  const goSubs = () => {
    navigation.navigate("SubscribeScreen");
  };

  const goUnsubscribe = () => {
    axios
      .post("https://api.dayahistoire.fr/api/cancel-subscription/")
      .then((response) => {
        //   console.log('response:', response.data );
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
        <View style={styles.c}>
          <View style={styles.card}>
            <Text style={styles.text}>Balance </Text>
            <Text style={styles.text}>{Data.balance}</Text>
          </View>

          <TouchableOpacity
            onPress={() => handlesignOut()}
            style={styles.card1}
          >
            <Text style={styles.d}>Deconnecter</Text>
          </TouchableOpacity>

          {!isSub ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("PaymentScreen")}
              style={styles.card1}
            >
              <Text style={styles.d}>Abonnez-vous </Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.subs}>Abonné</Text>
              <TouchableOpacity
                // onPress={() => goUnsubscribe()}
                style={styles.card1}
              >

              </TouchableOpacity>
              <Text style={styles.small}>vous pouvez désabonner depuis le site web</Text>
            </View>

          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  d: {
    backgroundColor: "black",
    fontSize: 25,
    padding: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderRadius: 15,
  },
  small:{
    color: "gray",
    padding:10

  },
  c: {
    alignItems: "center",
    display: "flex",
    backgroundColor: "#fff4",
    borderRadius: 15,
    marginLeft: 5,
    paddingTop: 10,
  },
  text: {
    fontSize: 25,
    padding: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    alignItems: "center",
  },
  subs: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    color: "white",

    textAlign: "center",
    // marginBottom:10
  },
  container: {
    flex: 1,
    color: "white",
    margin: 40,
    flexDirection: 'column',
  },
  card1: {
    marginVertical: 20,
    backgroundColor: "#fff4",

    borderRadius: 15,
    flexDirection: "row",
    marginHorizontal: 20,

    textAlign: "center",
    alignItems: "center",
    marginTop: 40,
  },
  card: {
    marginVertical: 20,
    backgroundColor: "#fe0680",

    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
  },
});
