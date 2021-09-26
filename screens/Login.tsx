import React from "react";
import { connect } from "react-redux";
// import {onUserLogin , userReducer } from '../redux'
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../components/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_OAUTH_ANDROID, GOOGLE_OAUTH_IOS } from "../constants/config";
import * as Google from 'expo-google-app-auth';
import * as Facebook from "expo-facebook";

const Login = (props) => {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
// const result: any = await Google.logInAsync({
//             androidClientId: '159267229466-mn66hirotjqh9vr3ks1g8qb56bs9tpes.apps.googleusercontent.com',
//             androidStandaloneAppClientId: '159267229466-6v3vjsme0g0nc7ut17hh91stboa0r7f4.apps.googleusercontent.com',
//             iosClientId: '159267229466-i60hqlijo4arpoc9b0slk4nafe5sbgeg.apps.googleusercontent.com',
//             iosStandaloneAppClientId: '159267229466-3na245p8nngeds9v52j0fnvs52aehc0j.apps.googleusercontent.coms',
//             scopes: [
//                 'profile',
//                 'email'
//             ]
//         });
//         if (result.type !== 'cancel') {
//             const response = await api.post('/auth/social_network', { type: SocialNetworkType.GOOGLE, token: result.accessToken });
//             await localAuthentication(response, dispatch);
//         }
  const handleGoogleLogin = async () => {
    const config = {
      iosClientId: GOOGLE_OAUTH_IOS,
      androidClientId: GOOGLE_OAUTH_ANDROID,
      scopes: ["profile", "email"],
    };
    console.log('-------------handle google login', config);
    await Google.logInAsync(config)
      .then((res) => {
        console.log("logInAsync", JSON.stringify(res, null, 2));

        axios.defaults.headers.common["Authorization"] = "";
        axios
          .post("https://api.dayahistoire.fr/auth_api/social/google", {
            access_token: res.idToken,
          })
          .then(async (response) => {
            const token = response.data.data.auth_token;
            await AsyncStorage.setItem('token', token);
            console.log("response", JSON.stringify(response, null, 2));

            const AuthStr = "Token " + token;
            axios.defaults.headers.common["Authorization"] = AuthStr;

            signIn(response.data);
            navigation.replace("Root");
          })

          .catch((error) => {
            console.log("error", error);
            alert(JSON.stringify(error, null, 2));
            if (error.message === "Request failed with status code 400") {
              Alert.alert("Username ou Mot de passe incorrect");
            } else {
              console.log("error", error.message);
              alert(JSON.stringify(error, null, 2));
            }
          });

        //alert(JSON.stringify(res, null, 2));
      })

      .catch((err) => {
        console.log("err", err);
        alert(JSON.stringify(err, null, 2));
      });
  };

  const handleFacebookLogin = async () => {
    try {
      // 2430404723670906
      await Facebook.initializeAsync({ appId: '2430404723670906' });
      const result: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      });
      console.log('result =>', result);
      const elem = await Facebook.initializeAsync({
        appId: "634340494215372",
      });
      console.log('elem', elem);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      });
      console.log('---------type', type);
      console.log('------token', token);
      if (type === "success") {
        axios.defaults.headers.common["Authorization"] = "";
        axios
          .post("https://api.dayahistoire.fr/auth_api/social/facebook", {
            access_token: token,
          })
          .then(async (response) => {
            const token = response.data.data.auth_token;
            await AsyncStorage.setItem('token', token);
            console.log("response", JSON.stringify(response, null, 2));

            const AuthStr = "Token " + token;
            axios.defaults.headers.common["Authorization"] = AuthStr;

            signIn(response.data);
            navigation.replace("Root");
          })

          .catch((error) => {
            console.log("error", error);

            if (error.message === "Request failed with status code 400") {
              Alert.alert("Username ou Mot de passe incorrect");
            } else {
              console.log("error", error.message);
            }
          });

        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      console.log(error);
      alert(`Facebook Login Error: ${error.message}`);
    }
  };
  const loginHandle = () => {
    axios.defaults.headers.common["Authorization"] = "";

    const foundUser = axios
      .post("https://api.dayahistoire.fr/auth/token/login/", {
        username,
        password,
      })
      .then(async (response) => {
        const token = response.data.auth_token;
        const AuthStr = "Token " + token;
        axios.defaults.headers.common["Authorization"] = AuthStr;
        await AsyncStorage.setItem('token', token);
        signIn(response);
        navigation.replace("Root");
      })

      .catch((error) => {
        console.log("error", error);

        if (error.message === "Request failed with status code 400") {
          Alert.alert("Username ou Mot de passe incorrect");
        } else {
          console.log("error", error.message);
        }
      });
  };

  return (
    <ImageBackground
      source={require("../assets/img/aa.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <KeyboardAvoidingView style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/img/Daya.png")}
        />

        <View>
          <Text style={styles.text}>
            Connectez-vous pour accéder a des audios dédiés a l'Afrique ,
            l'histoire, l'actualité ..
          </Text>

          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Mot de passe"
            />
            <View>
              <TouchableOpacity onPress={() => loginHandle()}>
                <Text style={styles.btn1}>Se connecter</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={styles.btn}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
                <Text style={styles.btn}>Mot de passe oublié ? </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity onPress={() => handleGoogleLogin()}>
                <Text style={styles.btn}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => handleFacebookLogin()}
              >
                <Text style={styles.btn}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,

    color: "gray",
    textAlign: "left",
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 70,
  },

  tinyLogo: {
    marginVertical: 45,
    height: "20%",
    width: "100%",
  },
  btnO: {
    margin: 12,
    height: 40,
    borderRadius: 15,
    backgroundColor: "white",
  },

  container: {
    marginTop: 40,
    margin: 20,
    flex: 1,
    color: "white",
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 9,
    backgroundColor: "white",
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 9,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    marginBottom: 10,
    marginTop: 10,
  },
  btn1: {
    padding: 10,
    borderRadius: 9,
    backgroundColor: "#fe0680",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    marginBottom: 10,
    marginTop: 10,
  },
});

export default Login;
