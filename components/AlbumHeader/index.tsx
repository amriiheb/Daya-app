import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {Text , View , Image, TouchableOpacity} from 'react-native'
import { Album } from '../../types'
import styles from '../AlbumHeader/styles'


export type AlbumHeaderProps = {

    album : Album

}

export const AlbumHeader = (props: AlbumHeaderProps) => {
    const {album} = props
    const library = props.lib
    const navigation = useNavigation()
 
    return (
        <View style={styles.container} >
            <View style={styles.center}>
            <Image  source={{uri: album.album_cover_link}} style={styles.cover} />
            </View>
            <Text style={styles.name}>{album.name}</Text>
            <Text style={styles.subname}>Categorie: {album.cat} </Text>

            <View>
            {/* <Text style={styles.by}> By {album.by}</Text> */}

            
            </View>
            <View>

            { !library ?  
            <View>
                            <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen',  {id: album.id , price: album.prix}) }>
             
             <View  >
                 <Text style={styles.btn1}>Je m'abonne</Text>
             </View> 
     </TouchableOpacity> 




            <TouchableOpacity onPress={() => navigation.navigate('BuyAlbum',  {id: album.id , price: album.prix}) }>
             
                    <View  >
                        <Text style={styles.btn}>J'achete cet audio {album.prix} points</Text>
                    </View> 
            </TouchableOpacity>  

            </View> 
            :
            <Text></Text>          
            
            }
            </View>

            <Text style={styles.by}>{album.resume}</Text>
            
            
        </View>
    )
}

export default AlbumHeader;