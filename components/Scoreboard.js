import { useState, useEffect,} from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import Footer from './Footer'
import { SCOREBOARD_KEY  } from '../constants/Game'
import styles from '../style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataTable } from 'react-native-paper';


export default Scoreboard = ({navigation, route}) => {

const [scores, setScores] = useState([])
const [playerName, setPlayerName] = useState('')



useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    return unsubscribe
  })
}, [navigation])

useEffect(()=>{
  if (scores === '' && route.params?.score) {
    setScores(route.params.score);
  }
}, []);

useEffect(()=>{
  if (playerName === '' && route.params?.player) {
    setPlayerName(route.params.player);
  }
}, []);


scores.sort((b, a) => parseFloat(b.points) - parseFloat(a.points))

  return (
    <>
    <Header />
    <View> 
      <Text style={styles.playerName}>
      
       Player: {playerName} 
       Points: {scores}
      
      </Text>
    </View>
    <Footer />
    </>
  )
}

