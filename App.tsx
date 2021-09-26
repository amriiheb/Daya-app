import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import PlayerWidget from "./components/PlayerWidget";
import { AppContext } from "./AppContext";
// import { Provider } from 'react-redux';
// import {store} from './redux'
import { AuthContext } from "./components/context";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [songId, setSongId] = useState<string | null>(null);

  //LOGIN AUTH
  const initialLoginState = {
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
        };
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.token,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const [mytoken, setMytoken] = useState("");

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = foundUser.data.auth_token;
        setMytoken(userToken);

        try {
          console.log("initialLoginState:", initialLoginState);
          await AsyncStorage.setItem("userToken", userToken);

          console.log("token :", userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        console.log("initialLoginState2:", initialLoginState);
        dispatch({ type: "LOGIN", token: userToken });
      },
      signOut: async () => {
        try {
          const userToken = await AsyncStorage.getItem("userToken");
          console.log("token1 :", userToken);
          await AsyncStorage.removeItem("userToken");
          console.log("token2 :", userToken);
          console.log("removed token");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log("userToken use effect:", userToken);
        if (userToken) {
          useNavigation().replace("Root");
        }

        //
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StripeProvider publishableKey="pk_live_51J6lj7ClKTQr7IzOYlYAyCCVrGursNQ14R2LKkBYulStCW00nHVGsZZ0QdJfEIQMOOg04zOosVwo69dXB8SJWS6H00JecNRjwj">
        <AuthContext.Provider value={authContext}>
          <SafeAreaProvider>
            <AppContext.Provider
              value={{
                songId,
                setSongId: (id) => setSongId(id),
              }}
            >
              <Navigation colorScheme={"dark"} />
              <PlayerWidget />
              <StatusBar backgroundColor="gray" />
            </AppContext.Provider>
          </SafeAreaProvider>
        </AuthContext.Provider>
      </StripeProvider>
    );
  }
}
