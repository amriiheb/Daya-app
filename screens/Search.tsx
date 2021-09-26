import * as React from 'react';

import { ImageBackground, StyleSheet , TextInput  } from 'react-native';
import { Text, View } from '../components/Themed';
import SongListItem from '../components/SongListItem'
import { FlatList } from "react-native-gesture-handler";
import AlbumHeader from '../components/AlbumHeader'
import { SafeAreaView } from 'react-native-safe-area-context';
import AlbumComponent2 from '../components/Album2';
import AlbumComponent from '../components/Album';
import AlbumComponent3 from '../components/Album3';


export default function Search() {
  const [text, setText] = React.useState('')
  const [Results, setResults] = React.useState([])
  React.useEffect(() => {

      fetch(`https://api.dayahistoire.fr/api/list/?search=${text}`, {method : 'GET'})
      .then(response => response.json())
      .then(Details =>  
        setResults(Details)
    
      )
      
  }, [text])

  return (
    <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%' }}>
    <SafeAreaView  >
      <Text style={styles.title}>Rechercher</Text>
    
      <TextInput

              style={styles.search}
              placeholder="commencer la recherche!"
              onChangeText={text => setText(text)}
              defaultValue={text}>

      </TextInput>

      <FlatList 
      data = {Results}
      style={styles.flat}
      

      renderItem={({item}) => <AlbumComponent3 album={item} />}
      keyExtractor={(item) => item.id.toString()}
      />


        




  

    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {

    
    margin:5,


  },
  flat:{
    marginTop:25,
    paddingHorizontal:20,

    
  },
  title: {
    fontSize: 20,
    padding:15,
    fontWeight: 'bold',
    color:'white',
    textAlign:'center',
    marginBottom:10
  },
  separator: {
   
    height: 1,
    width: '80%',
    color:'white'
  },
  search:{
    padding: 10,
    paddingLeft: 20,
    
    borderRadius:50,

    fontSize:18,
    backgroundColor:'#eee',
    fontWeight:'bold',
    color:'black'
  }
});
