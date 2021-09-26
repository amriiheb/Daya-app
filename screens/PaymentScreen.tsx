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
import { ScrollView } from 'react-native-gesture-handler';
const PaymentScreen = ({}) => {



  const route = useRoute();


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
      await axios.post(`https://api.dayahistoire.fr/api/payment_sheet_subs/`)
      .then(response =>{
        const paymentIntent = response.data.clientSecret;
        
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
        Alert.alert(`Note: ${error.code}`, error.message);
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
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Abonnez-vous pour beneficier de 1000 points chaque mois</Text>
  
        <Button title="Subscribe" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>

    </ImageBackground >



    )
}



export default PaymentScreen

const styles = StyleSheet.create({
    text:{
        color:'white',
        marginBottom:40,
        fontSize:18,
        textAlign:'center',
        fontWeight:'200'
    },
    container:{
        margin:70
    }
})
