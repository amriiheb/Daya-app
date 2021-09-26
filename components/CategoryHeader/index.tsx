import React from 'react'
import {Text , View , Image, TouchableOpacity} from 'react-native'
import { Album } from '../../types'
import styles from '../AlbumHeader/styles'


export type AlbumHeaderProps = {

    album : Album

}

export const AlbumHeader = (props: AlbumHeaderProps) => {
    const {album} = props
    return (
        <View style={styles.container} >
            <Image  source={{uri: album.album_cover_link}} style={styles.cover} />
            <Text style={styles.name}>{album.name}</Text>

            <View>
            {/* <Text style={styles.by}> By {album.by}</Text> */}
            <Text style={styles.by}> This is Catgeory header</Text>
            </View>

            <TouchableOpacity>
                <View style={styles.play}>
                    <Text style={styles.playText}>
                        PLAY
                    </Text>
                </View>    
            </TouchableOpacity> 

            
        </View>
    )
}

export default AlbumHeader;