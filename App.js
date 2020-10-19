import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'

export default function App() {
  
  const [userNumber, setUserNumber] = useState();
  const [numOfguesses, setNumOfGuesses] = useState(0);

  const configNewGameHandler = () => {
    setNumOfGuesses(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = guessNum => {
    setNumOfGuesses(guessNum)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>
  
  if(userNumber && numOfguesses <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if (numOfguesses > 0) {
    content = <GameOver numOfrounds={numOfguesses} userNumber={userNumber} onRestart={configNewGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
