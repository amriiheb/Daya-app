import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Button , Screen } from "react-native";

    

 function PaymentTest() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`http://209.97.176.109/api/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
      // see below
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
        <Screen>
          <Button
            variant="primary"
            disabled={!loading}
            title="Checkout"
            onPress={openPaymentSheet}
          />
        </Screen>
      );
    }

export default PaymentTest