import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import {
    CardField,
    StripeProvider,
    useStripe,
  } from '@stripe/stripe-react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View , Alert, KeyboardAvoidingView, ImageBackground } from 'react-native'
import {SafeAreaView} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const PaymentScreen = ({}) => {



  const route = useRoute();

  const itemId = route.params.id;

    const [clientSecret, setClientSecret] = useState('')

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useEffect(() => {
      fetchPaymentIntent();
     
    }, []);

    useEffect(() => {
      if (clientSecret) {
        initializePaymentSheet();
      }
    }, [clientSecret]);


    const fetchPaymentIntent = async () => {
      await axios.post(`https://api.dayahistoire.fr/api/payment-sheet/${itemId}/`)
      .then(response =>{
        const paymentIntent = response.data.paymentIntent;
        setClientSecret(paymentIntent)
        
      })
      .catch(e =>{
        Alert.alert('error' , e.message)
      })

    };



    const initializePaymentSheet = async () => {
      if (!clientSecret) {
        return;
      }
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      console.log('success');
      if (error) {
        Alert.alert('error');
      }
    };

    const openPaymentSheet = async () => {
      if (!clientSecret) {
        return;
      }
      const {error} = await presentPaymentSheet({clientSecret});
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        
        Alert.alert('Success', 'Your payment is confirmed!');
       
      }
    };
  

    const onCheckout = () => {
      // handle payments
      openPaymentSheet();
    };

    //RECEIVING PUBLIC KEY


    
    return (
      <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%' }}>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ScrollView style={styles.root}>
        <Text style={styles.title}>Acheter le credit</Text>
  
        {/* <Button style={styles.btn} title="Acheter" onPress={onCheckout} /> */}

        <TouchableOpacity  onPress={() => onCheckout() } >
                        <Text style={styles.btn}>Acheter</Text>
        </TouchableOpacity> 

      </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>

    )
}



export default PaymentScreen

const styles = StyleSheet.create({
    text:{
        color:'white'
    },
    root:{
        margin:20
    },
    title:{
      color:'white',
      fontSize:18,
      textAlign:'center',
      marginBottom:15
    },
    btn:{
      padding:10,
      borderRadius: 9,
      backgroundColor: "#fe0680",
      textAlign: "center",
      fontSize:18,
      color:'black',
      fontWeight:'bold',
  
     
      marginBottom:10,
      marginTop:10
    }
})
