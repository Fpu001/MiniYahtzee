import { useState, useEffect,} from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import Footer from './Footer'
import { SCOREBOARD_KEY  } from '../constants/Game'
import styles from '../style/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataTable } from 'react-native-paper';


export default Scoreboard = ({navigation, route}) => {

const [pointsRow, setPointsRow] = useState([])
const [playerName, setPlayerName] = useState('')



useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    return unsubscribe
  })
}, [navigation])

useEffect(()=>{
  if (pointsRow === '' && route.params?.points) {
    setPointsRow(route.params.points);
  }
}, []);

useEffect(()=>{
  if (playerName === '' && route.params?.player) {
    setPlayerName(route.params.player);
  }
}, []);

  return (
    <>
    <Header />
    <View> 
      <Text style={styles.playerName}>
      
       Player: {playerName} 
      </Text>
    </View>
    <Footer />
    </>
  )
}

