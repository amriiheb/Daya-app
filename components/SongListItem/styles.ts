import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({

    container : {
        flexDirection: 'row',
        margin: 10,
        color:'grey',
   
     

    },

    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'white'




    },

    artist:{
        fontSize: 12,
        color:'white'


    },
    image:{
        width: 70,
        height: 70,
        borderRadius:9,

    },
    rightContainer:{
        marginLeft: 10,

        justifyContent: 'space-around',
    
       
        

    }

}) 

export default styles;