import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View , Image, Button, ImageBackground} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";

const welcome = () => {
    const navigation = useNavigation()

    const goHome = () =>{
      navigation.replace('Login')
    }
    useEffect(() => {
        tryLocalAuthenticate()
    }, []);
    const tryLocalAuthenticate = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log('----------tryLocal Authentication');
        console.log(token);
        if (token) {
            navigation.navigate('Root')
        }
    };
    return (
      <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%' }}>
        <View style={styles.container}>
        <Image
        style={styles.image}
        source={require('../assets/img/Daya.png')}

      />

        <TouchableOpacity

            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.btn}>Commencez l' aventure</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>

    )
}

export default welcome

const styles = StyleSheet.create({

      tinyLogo:{
        height:'17%',
        width:'100%',
        marginBottom:30
      },
      container: {

        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        margin:30,
        opacity:1
      },
      image: {
        width: 200,
        height: 70,
      },

      btn: {
        padding:10,
        borderRadius: 9,
        backgroundColor: "#fe0680",
        textAlign: "center",
        fontSize:18,
        fontWeight:'bold',


        marginBottom:10,
        marginTop:10


      },
})
