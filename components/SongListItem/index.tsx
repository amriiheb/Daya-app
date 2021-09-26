import React , {useContext} from 'react';
import {View , Text, Image , FlatList} from 'react-native';

import styles from './styles';
import { TouchableOpacity,  } from 'react-native-gesture-handler';

import {AppContext} from '../../AppContext'

export type SongListItemProps = {
    song: Song,

}

const SongListItem = (props: SongListItemProps) => {
    const { song } = props;
    const library = props.lib
  
    const { setSongId } = useContext(AppContext);
  
    const onPlay = () => {
      setSongId(song.id);
    }


    return(
        <View>
            { library ?  
                        <TouchableOpacity onPress={onPlay}>
                        <View  style={styles.container} >
                        
                        <Image source={{ uri: props.song.music_cover_link }}  style={styles.image} />
                            <View style={styles.rightContainer}>
                         
                            <Text  style={styles.title}>{props.song.title}</Text>
                           
        
                            </View>
                        </View>
                 
                    </TouchableOpacity>
            
        
        
        
        :
    
                        <View  style={styles.container} >
                        
                        <Image source={{ uri: props.song.music_cover_link }}  style={styles.image} />
                            <View style={styles.rightContainer}>
                            {/* <Text  style={styles.title}>Episode: {props.song.episode}</Text> */}
                            <Text  style={styles.title}>{props.song.title}</Text>
                           
        
                            </View>
                        </View>
                 
        
        
        
        
        
        }


        </View>

            

     
    )
    
}

export default SongListItem
