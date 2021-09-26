import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {

    position: 'absolute',
    bottom: 49,
    backgroundColor: '#131313',
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
    
  },
  progress: {
    height: 3,
    backgroundColor: '#bcbcbc'
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-around'
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom:10,
    marginLeft:0
    
  },
  artist: {
    color: 'lightgray',
    fontSize: 10,
  }
})

export default styles;