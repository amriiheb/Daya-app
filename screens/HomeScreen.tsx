import axios from 'axios';
import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet , Text, View , FlatList , Alert , Image, SafeAreaView, ImageBackground} from 'react-native';
import AlbumCategory from '../components/AlbumCategory'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function HomeScreen() {
  const navigation = useNavigation()

  const [Data, setData] = useState([])
  const [slide, setSlide] = useState([])

  const  getSlides = async () =>{
   await axios.get('https://api.dayahistoire.fr/api/slides/')
    .then(response =>  {
      console.log('response:##################////////', response.data );
        
      setSlide(response.data)
    })

    .catch(error => Alert.alert('error', error.message))

  }

  const getCat = () =>{
    fetch('https://api.dayahistoire.fr/api/categories/', {method : 'GET'})
    .then(response => response.json())
    .then(Data =>  
      // console.log(Data)
      setData(Data)
    )
    .catch(error => Alert.alert('error', error.message))

  }

  



  useEffect(() => {
    getSlides();
    getCat()
  }, []);
  

  return (
    <ImageBackground source={require('../assets/img/aa.png')} style={{width: '100%', height: '100%' }}>
    
    
      <View style={styles.container}>

      <FlatList
      style={styles.slider}
      horizontal
      
      data={slide}
      renderItem={({item}) => <TouchableOpacity  >
        {/* onPress={()=>navigation.navigate('AlbumScreen' , {id: item.id , name: item.name})} */}
        <Image
      
      style={styles.image}
      
      source={{uri: item.slide_cover_link}}
    />
        </TouchableOpacity>}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}

      />

      <FlatList
      data={Data}
      renderItem={({item}) => <AlbumCategory id={item.id} title={item.name} albums={item.albums} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}

      />

</View>
</ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    



  },
  image:{
    width:300,
    height:200,
    marginHorizontal:10,
    marginVertical:5,

    borderRadius:20,

    

    
  },
  slider:{
 

    height:'50%',
    
    
    
    
    

  }


});
