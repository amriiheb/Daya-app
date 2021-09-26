import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    cover:{
        height: 250,
        width: 250,
        borderRadius: 9,
        

    },

    center:{
        alignItems:'center'

    },
    container:{
        
        padding: 30,
        color:'white'


    },
    by:{
        color:'gray',
        marginTop:10
        

    },
    subname:{
        color:'gray'

    },
    name:{
        fontSize: 18,
        paddingTop: 20,
        paddingBottom:5,
        textTransform: 'uppercase',
        fontWeight:'bold',
        textAlign:'left',
        color:'white'

    },
    btn: {
        padding:10,
        borderRadius: 9,
        backgroundColor: "white",
        textAlign: "center",
        fontSize:18,

    
       
        marginBottom:10,
        marginTop:10
    
      },

      btn1: {
        padding:10,
        borderRadius: 9,
        backgroundColor: "#fe0680",
        textAlign: "center",
        fontSize:18,
  
    
       
        marginBottom:10,
        marginTop:10
    
      },
    play:{
        color: 'gray',
        fontSize: 40 ,
        fontWeight: 'bold',
        backgroundColor: 'gray',
        width: 160,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color:'white',
        
  
        borderRadius: 999,
        marginTop: 20


    },
    playText:{
        color: 'white',
        

    },

})

export default styles;