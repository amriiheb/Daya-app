import React , {useEffect, useState , useContext} from 'react';
import {View , Text, Image , FlatList, Alert} from 'react-native';

import styles from './styles';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

import {Audio} from 'expo-av' 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Sound } from 'expo-av/build/Audio';
import {AppContext} from '../../AppContext'
import { Song } from '../../types';
import axios from 'axios';






const PlayerWidget = () => {
    const [song , setSong] = useState<Song|null>(null);
    const [sound , setSound] = useState<Sound|null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [duration, setDuration] = useState<number|null>(null);
    const [position, setPosition] = useState<number|null>(null);

    const [hide, setHide] = useState<boolean>(false);

    const getMusic = async () =>{
      await axios.get(`https://api.dayahistoire.fr/api/music/${songId}/`)
      .then(response =>  {
        console.log('response:', response.data );
          
        setSong(response.data)
      })
  
      .catch(error => Alert.alert('error', error.message))
    }

    const {songId} = useContext(AppContext)
    const onPlaybackStatusUpdate = (status) => {
        console.log(status);
        setIsPlaying(status.isPlaying);
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);

        
      }

        
      useEffect(() => {
        const fetchSong = async () => {
          
          if(songId){
            setHide(false)

         
          try {
            getMusic();

          } catch (e) {
            console.log(e);
          }

          


        }
        }
    
        fetchSong();
      }, [songId])

      const playCurrentSong = async () => {
        if (sound) {
          await sound.unloadAsync();
        }
    
        const { sound: newSound } = await Sound.createAsync(
          { uri: song.music_link },
          { shouldPlay: isPlaying },
          onPlaybackStatusUpdate
        )
    
        setSound(newSound)
      }


      const onRemove = () => {
        sound.stopAsync();
        
        setHide(true)


     } 


    useEffect(() => {
        if (song) {
          playCurrentSong();
        }
      }, [song])



      const onPlayPausePress = async () => {
          
          
        if (!sound) {
          return;
        }
        if (isPlaying) {
          await sound.pauseAsync();
          console.log('clicked to stop sound');
        } else {
          await sound.playAsync();
          console.log('clicked to play sound');
        }
      }
      
    

      //Get the progress of the sound
      const soundProgress = () => {
        if(sound === null || position === null || duration === null ){
          return 0;
        }
        return (position / duration) * 100;

      }

      if(!song){
        return null;
      } 




     if(hide){
      return null;

     }else{
      return(


        <View style={styles.container}>
        <View style={[styles.progress, { width: `${soundProgress()}%`}]} />
        <View style={styles.row}>
          <Image source={{ uri: song.music_cover_link }} style={styles.image} />
          <View style={styles.rightContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.title}>{song.title}</Text>
              <Text style={styles.artist}>{song.artiste}</Text>
            </View>
  
            <View style={styles.iconsContainer}>
              {/* <AntDesign name="hearto" size={30} color={"white"}/> */}
              <TouchableOpacity onPress={onPlayPausePress}>
                <FontAwesome name={isPlaying ? 'pause' : 'play'} size={40} color={"white"}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={onRemove} >
                <FontAwesome name={'remove'} size={30} color={"white"}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  
        
  
      )

     }

    
}

export default PlayerWidget;
