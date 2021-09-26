/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {NavigationContainer, DefaultTheme, DarkTheme, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {DayaNB} from '../assets/img'
import NotFoundScreen from '../screens/NotFoundScreen';
import Login from '../screens/Login'
import Register from '../screens/Register'
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import loginReducer from '../App'
import initialLoginState from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentScreen from '../screens/PaymentScreen';
import RechargeScreen from '../screens/RechargeScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import welcome from '../screens/welcome';
import Condition from '../screens/Condition';
import ResetPassword from '../screens/ResetPassword';


export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal


// CHECK IF THE USER IS LOGGED IN


const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {

    const userToken = AsyncStorage.getItem('userToken');
    console.log('tok:', userToken);

    return (
        <Stack.Navigator>

            <Stack.Screen options={{headerShown: false}} name="welcome" component={welcome}/>
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
            <Stack.Screen name="Root" options={{headerShown: false}} component={BottomTabNavigator}/>

            <Stack.Screen name="register" options={{title: 'Inscription'}} component={Register}/>
            <Stack.Screen options={{title: 'Réinitialisation de mot de passe'}} name="Reset" component={ResetPassword}/>

            <Stack.Screen name="Condition" options={{title: 'Condition'}} component={Condition}/>


        </Stack.Navigator>
    );


}





