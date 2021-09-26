import React , {useEffect} from 'react'

import {Text , View , FlatList, TouchableOpacity} from 'react-native'

import {Album} from '../../types'
import AlbumComponent from '../Album'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export type AlbumCategoryProps = {
    id : string,
    title : string,
    albums :[Album]
}



const AlbumCategory = (props : AlbumCategoryProps) =>{
    const navigation = useNavigation()


    return (
        <View>
        {/* title of category */}
        <View  style={styles.albumName}>
        <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen' , {id: props.id })}>
                <Feather style={styles.arrow} name="arrow-right" size={39} color="white" />
            </TouchableOpacity>
        </View>
        
        {/* List of albums */}

        <FlatList
        data = {props.albums}
        renderItem={({item}) => <AlbumComponent album={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}

         />
 


        </View>
    )
    };

export default AlbumCategory;