
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    marginBottom: 15,
    backgroundColor: 'yellow',
    borderRadius: 15,
    flexDirection: 'row',
    borderColor: 'black',
    border: 'solid',
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1
    
  },

  footer: {
    marginTop: 'auto',
    backgroundColor: 'yellow',
    flexDirection: 'row',
    borderColor: 'black'
  },

  title: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },

  author: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },

  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },

  row: {
    marginTop: 20,
    padding: 10
  },

  flex: {
    flexDirection: "row"
  },

  playerNameInput: {
    alignSelf: 'center',
    borderWidth: 1,
    width: '25%',
    fontSize: 15,
    textAlign: 'center'
  },

  playerName: {
    marginTop: 10,
    alignSelf: 'center', 
  },

  buttonOK: {
    marginStart: 15,
    marginLeft: 160,
    marginTop: 10,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "yellow",
    width: '15%',
    borderRadius: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  },

  buttonPlay: {
    marginStart: 15,
    marginLeft: 150,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "yellow",
    width: 60,
    borderRadius: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  buttonText: {
    color:"black",
    fontSize: 20,
  }, 

  buttonThrowDicesSavePoints: {
    alignSelf: 'center',
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10
    
  },

  datatable: {
    height: 10
  },

  textRules: {
    backgroundColor: 'yellow',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 5
  },

  textRulesTitle: {
    backgroundColor: 'yellow',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  textName: {
    alignSelf: 'center',
    marginBottom: 10
  }, 

  textGoodLuck: {
    padding: 5,
    marginTop: 10,
    marginBottom: 10,

  },
});
