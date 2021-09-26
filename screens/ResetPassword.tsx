import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ImageBackground, Alert,
} from "react-native";
import {useNavigation} from "@react-navigation/native";

const ResetPassword = (props: any) => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const reset = () => {
        console.log('Reset password action');
    };
    const resetHandler = () => {
      if (!email || !password || !passwordConfirmation) {
        return;
      } else {
        if (!validateEmail(email)) {
          Alert.alert("Le format de l'email saisi est incorrect")
        } else if (password !== passwordConfirmation) {
          Alert.alert("Le mot de passe saisie et la confirmation ne sont pas identiques !")
        }
      }
        // if( !username && !password ){
        //     console.log('username or password is missing!');
        // } else {
        //     // navigation.navigate('Login')}
        //     console.log('sending data!');
        //     register()
        // }
    };
    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    return (
        <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%'}}>

            <KeyboardAvoidingView style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/img/Daya.png')}

                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.text1}>Réinitialisation de mot de passe</Text>
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
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Mot de passe"

                    />
                  <TextInput
                      style={styles.input}
                      onChangeText={(text) => setPasswordConfirmation(text)}
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      placeholder="Confirmer votre mot de passe"

                  />
                    <View>
                        <TouchableOpacity
                            onPress={() => resetHandler()}
                        >
                            <Text style={styles.btn1}>Confirmer</Text>
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
        marginBottom: 20,

        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },

    text2: {
        fontSize: 15,
        marginBottom: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },


    container: {
        margin: 20,
        flex: 1,
        color: "white",
    },
    input: {

        padding: 10,
        marginBottom: 20,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 9,
        backgroundColor: "white",
    },

    btn1: {
        padding: 10,
        borderRadius: 9,
        backgroundColor: "#fe0680",
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',


        marginBottom: 10,
        marginTop: 10

    },


    tinyLogo: {
        height: '20%',
        width: '100%',


    },
    image: {
        width: 200,
        height: 70,

    },
});


export default ResetPassword;
