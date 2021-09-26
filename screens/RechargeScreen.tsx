import axios from 'axios'
import React , {useEffect, useState} from 'react'
import { Alert, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Navigation from '../navigation'
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context'
const RechargeScreen = () => {
     const [recharge, setRecharge] = useState([])
     const [Data, setData] = useState([]);



    const navigation = useNavigation()
     useEffect(() => {
        
            axios.get('https://api.dayahistoire.fr/api/recharges/')
            .then(response =>{
                console.log('response:', response);
                setRecharge(response.data)
                
            })
            .catch(error =>{
                console.log(error.message);
                
            })
         
     }, [])

     useEffect(() => {
        axios
          .get("https://api.dayahistoire.fr/api/user/")
          .then((response) => {
            console.log("response:", response.data);
    
            setData(response.data.balance);
         
          })
    
          .catch((error) => Alert.alert("error", error.message));
      }, []);
    
    
 



    return (
        <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%' }}>
        <SafeAreaView style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.text}>Balance </Text>
            <Text style={styles.text}>{Data}</Text>
          </View>
 
            <Text style={styles.text}>Acheter des points</Text>

            <View>
            <Text style={styles.note}>Vous pouvez utiliser ces points pour acheter des albums sur l application</Text>
            </View>

            <FlatList
            data={recharge}
            
            renderItem={
                ({item}) => 
                <TouchableOpacity onPress={() => navigation.navigate('SubscribeScreen',  {id: item.id}) }  style={styles.card}>
                    
                    <Text style={styles.cardLeft}>{item.points} points</Text>
                    <Text style={styles.cardRight}>{item.prix} EUR</Text>
                 </TouchableOpacity>
            
            }
            keyExtractor={(item) => item.id.toString()}


            />

            
        </SafeAreaView>
        </ImageBackground>
    )
}

export default RechargeScreen

const styles = StyleSheet.create({
    container:{
        flex:1 ,
        margin:20
       }
    ,

    text:{
        color:'#ffff',
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',

        marginBottom:20
        
    },
    note:{
        backgroundColor:'#fff4',
        fontSize:18,
        paddingHorizontal:15,
        textAlign:'center',
        borderRadius:20,
        paddingVertical:5,
        marginBottom:30,
        color:'#eee'
    },
    card:{
        
        backgroundColor:'#fff4',
        paddingHorizontal:18,
        paddingVertical:5,
        fontSize:30,
        borderRadius:20,
        marginBottom:20,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: "center",
        

    },
    cardLeft:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
       


    },
    cardRight:{
        fontSize:18,
        fontWeight:'bold',
        color:'#eee'
       


    }
})
