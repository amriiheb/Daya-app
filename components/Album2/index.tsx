import React from 'react';
import {View, Image , Text, TouchableOpacity , StyleSheet} from 'react-native';

import {Album} from '../../types';
import { useNavigation, useRoute } from '@react-navigation/native';

export type Albumprops = {
    album : Album,


}


const AlbumComponent2 = (props : Albumprops) => {
    const navigation = useNavigation()
    const route = useRoute();
  
    

    const onPress = () => {
        navigation.navigate('AlbumScreen' , {id: props.album.id , name: props.album.name, lib: 'true'})

 
     
        
        
   
        
    }

    return (
        <TouchableOpacity onPress={onPress} >
        <View style={styles.container}>

                <View>

       

                <Image source={{uri: props.album.album_cover_link}} style={styles.image}/>
                </View>

                <View style={styles.card} >
                    <Text style={styles.text} >{props.album.name} </Text>
                    <Text style={styles.text2} >Categorie : {props.album.cat} </Text>
                   
                </View>

                

         
        
        </View> 
        </TouchableOpacity>
    )

}


export default AlbumComponent2;


const styles = StyleSheet.create({
    container :{



        borderRadius:29,
        display:'flex',
        flexDirection:'row',
        marginBottom:15


    },
    image:{
        width: 100 ,
        height: 100,
        borderRadius: 10,


    },
    text:{
        color: 'white',
        margin: 6,
        fontSize: 18,
        fontWeight: 'bold',
        margin:15
        

    },
    text2:{
        color: '#fff4',
        margin: 6,
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft:15
        

    }
    
})