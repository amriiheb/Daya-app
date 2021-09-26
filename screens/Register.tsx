import React from "react";
import {connect} from 'react-redux';

import {onUserLogin , onUserRegister , userReducer } from '../redux'
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Register = (props) => {
    const navigation = useNavigation()

  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");




const register = () => {
  axios.post('https://api.dayahistoire.fr/auth/users/',  {email : email ,username: username , password: password})
  .then(response =>{

    navigation.navigate('Login')
    }
     )
    .catch(error =>{
      console.warn(error.message);
      if(error.message === 'Request failed with status code 400'){
        Alert.alert("le nom d'utilisateur ou l'email existe déjà, réessayez !")
      }
      // console.log('0000000000000000register',error);
    })
};



const RegisterHandler = () => {



    if( !username && !password ){

        console.log('username or password is missing!');


    } else {

        // navigation.navigate('Login')}
        console.log('sending data!');
        register()



    }
  }


  return (
    <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%' }}>

    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/img/Daya.png')}

      />

      <View style={{
        flexDirection:'row',
        justifyContent:'space-between'
      }}>
      <Text style={styles.text1}>INSCRIPTION</Text>
      <TouchableOpacity


            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.text2} >Deja inscrit ? </Text>
          </TouchableOpacity>

      </View>

      <SafeAreaView>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Adresse e-mail"
        />
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
        <Text style={styles.text}>en cliquant sur S'inscrire, j'accepte <Text onPress={()=> navigation.navigate('Condition')}>les conditions générales</Text></Text>

        <View>
          <TouchableOpacity

            onPress={() => RegisterHandler() }
          >
            <Text style={styles.btn1}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View>

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  text: {
    fontSize: 20,

    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginBottom: 10,

  },
  text1: {
    fontSize: 20,
    marginBottom:20,

    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  text2: {
    fontSize: 15,
    marginBottom:20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },


  container: {
    margin:20,
    flex: 1,
    color: "white",
  },
  input: {

    padding: 10,
    marginBottom:20,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 9,
    backgroundColor: "white",
  },

  btn1: {
    padding:10,
    borderRadius: 9,
    backgroundColor: "#fe0680",
    textAlign: "center",
    fontSize:18,
    fontWeight:'bold',


    marginBottom:10,
    marginTop:10

  },


  tinyLogo:{
    height:'20%',
    width:'100%',


  },
  image: {
    width: 200,
    height: 70,

  },
});






export default Register;
