import React from 'react';
import {View, Image , Text, TouchableOpacity} from 'react-native';
import styles from './styles'
import {Album} from '../../types';
import { useNavigation } from '@react-navigation/native';

export type Albumprops = {
    album : Album,


}


const AlbumComponent = (props : Albumprops) => {
    const navigation = useNavigation()

    const onPress = () => {
    
        navigation.navigate('AlbumScreen' , {id: props.album.id , name: props.album.name})
        
   
        
    }

    return (
        <TouchableOpacity onPress={onPress} >
        <View style={styles.container}>

       

                <Image source={{uri: props.album.album_cover_link}} style={styles.image}/>

                <Text style={styles.text} >{props.album.name} </Text>

         
        
        </View> 
        </TouchableOpacity>
    )

}

export default AlbumComponent;