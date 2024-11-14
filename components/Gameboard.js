import { useEffect, useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import Header from './Header'
import Footer from './Footer'
import moment from 'moment'
import { 
  NBR_OF_DICES, 
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT, 
  BONUS_POINTS_LIMIT,
  BONUS_POINTS, 
  SCOREBOARD_KEY} from '../constants/Game';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Row, Col } from 'react-native-flex-grid'; 
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

let board = []
export default Gameboard = ({navigation, route}) => {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices')
  const [gameEndStatus, setGameEndStatus] = useState(false);
  // Mitkä arpakuutioista ovat valittuina?
  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));
  // Arpakuutioiden silmäluvut
  const [diceSpots, setDiceSpots] = 
    useState(new Array(NBR_OF_DICES).fill(0));
  // Valittujen arpakuutioiden kokonaispistemäärät
  const [dicePointsTotal, setDicePointsTotal] = 
    useState(new Array(MAX_SPOT).fill(0))
  // Mitkä arpakuutioiden silmäluvuista on valittu pisteisiin
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(0))
  const [playerName, setPlayerName] = useState('')
  const [scores, setScores] = useState([])

  useEffect(()=>{
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return unsubscribe
    })
  }, [navigation])
  
  const setScoreboardData = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
      if (jsonValue !== null) {
        const tmpScores = JSON.parse(jsonValue)
        // Opettajan versiossa tässä kohtaa lajittelu pistemäärä 
        // perusteella laskevassa järjestyksessä (k. harjoitustyön tehtävänanto)
        setScores(tmpScores)
        console.log('Gameboard: Read successful.')
        console.log('Gameboard: Number of Scores:' + tmpScores.length)
      }
    }
    catch (e) {
      console.log('Gameboard: Read error: ' + e)
    }
  }
  

  const savePlayerPoints = async () => {
    const newKey = scores.length + 1
    const playerPoints = {
      key: newKey,
      name: playerName,
      date: moment(new Date()).format("DD-MM-YYYY"), // Hae tänne päivämäärä 
      time: moment().format('HH:mm:ss'), // Hae tänne kellonaika 
      points: playerPoints     // Sijoita tänne pelaajan pistemäärä
    }
    try {
      const newScore = [...scores, playerPoints]
      const jsonValue = JSON.stringify(newScore)
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
      
    }
    catch(e) {
      console.log('Gameboard: Save error: ' + e) 
    }
  }

  // Arpakuutiorivi sarakkeittain (Col)
  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"dice" + dice}>
        <Pressable 
            key={"row" + dice}
            onPress={() => chooseDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50} 
            color={getDiceColor(dice)}>
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  // Pisterivi sarakkeittain (Col)
  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++){
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  //Rivi, joka kertoo, onko pisteet jo valittu silmäluvulle
  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable 
          onPress={() => chooseDicePoints(diceButton)}
          key={"buttonsRow" + diceButton}>
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            color={getDicePointsColor(diceButton)}
            size={35}>
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    )
  }
  const chooseDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
    }
    else {
      setStatus('You have to throw dices first')
    }
  }

  const chooseDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints]
      let points = [...dicePointsTotal]
      if (!selectedPoints[i]) {
        selectedPoints[i] = true
        let nbrOfDices = 
          diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0)
        points[i] = nbrOfDices * (i + 1)
      }
      else {
        setStatus("You already selected points for " + (i + 1))
        return points[i]
      }
      setDicePointsTotal(points)
      setSelectedDicePoints(selectedPoints)
      return points[i]
    }
    else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
    }
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
    }

  function getDicePointsColor(i) {
    return (selectedDicePoints[i] && !gameEndStatus) ? "black" : "steelblue";
    }

  function getSpotTotal(i) {
    return dicePointsTotal[i]
  }

  const throwDices = () => {
    let spots = [...diceSpots]
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    setDiceSpots(spots);
    setStatus('Select and throw dices again');
  }
  
  return (
    <>
      <Header />
      <View>
        <Container>
          <Row>{dicesRow}</Row>
        </Container>
        <Text style={styles.textName}>
          Throws left: {nbrOfThrowsLeft}</Text>
          <Text style={styles.textName}>{status}</Text>
          <Pressable style={styles.buttonThrowDicesSavePoints} onPress={() => throwDices()}>
            <Text>THROW DICES</Text>
          </Pressable>
          <Container>
            <Row>{pointsRow}</Row>
          </Container>
          <Container>
            <Row>{pointsToSelectRow}</Row>
          </Container>
        <Text style={styles.playerName}>Player: {playerName}</Text>
        <Pressable onPress={() => navigation.navigate('Scoreboard', {player: playerName})}>
            <Text style={styles.buttonThrowDicesSavePoints}>Save points</Text>
          </Pressable>
      </View>
      <Footer />
    </>
  )
}
