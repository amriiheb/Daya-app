/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons , 
  Entypo , 
  Feather,
   } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {Button, Image} from 'react-native'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AlbumScreen from '../screens/AlbumScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import Library from '../screens/Library';
import RechargeScreen from '../screens/RechargeScreen';
import { AntDesign } from '@expo/vector-icons';
import PaymentScreen from '../screens/PaymentScreen';
import SubscribeScreen from '../screens/SubscribeScreen'
import BuyAlbum from '../screens/BuyAlbum';
import Condition from '../screens/Condition';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>

      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" style={{marginBottom: -3}}  size={24}  color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <Feather name="search" style={{marginBottom: -3}}  size={24}  color={color} />,
        }}
      />
            <BottomTab.Screen
        name="Bibliothèque"
        component={Library}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="library" style={{marginBottom: -3}}  size={24} color={color}/>,
        }}
      />

      <BottomTab.Screen
        name="Credit"
        component={RechargeScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="creditcard" size={24} color={color} />,
        }}
      />
    

      <BottomTab.Screen
        style={{padding: 30}}
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="logo-amplify" size={24} style={{marginBottom: -3}} color={color}/>,
        }}
      />

    </BottomTab.Navigator>
  );
}



// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
       options={{
        headerTitle: () => (
            <Image
            style={{width: 150, height: 50 , alignSelf: 'flex-start', marginBottom:5, marginTop:5}}
            source={require('../assets/img/Daya.png')}
            />
        ),
        }}
      />
         


         <TabOneStack.Screen
        name="Condition"
        component={Condition}
        options={{ headerTitle: 'Condition' }}
      />

      <TabOneStack.Screen
        name="AlbumScreen"
        component={AlbumScreen}

        options={({ route }) => ({ headerTitle: route.params.name })}
              
      />
        <TabOneStack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{ headerTitle: 'Categorie' }}
      />
      <TabOneStack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerTitle: 'Abonnement' }}
      />

      <TabOneStack.Screen
        name="SubscribeScreen"
        component={SubscribeScreen}
        options={{ headerTitle: 'Acheter le credit' }}
      />

      <TabOneStack.Screen
        name="BuyAlbum"
        component={BuyAlbum}
        options={{ headerTitle: 'Achat Album' }}
      />




    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Search' }}
      />
    </TabTwoStack.Navigator>
  );
}
