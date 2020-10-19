import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors' 

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max -min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum
    }
};

const GameScreen = (props) => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    
    const { userChoice, onGameOver } = props;
    useEffect(() => {
        if ( currentGuess === userChoice ) {
            props.onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t Cheat!', 'Give the oponent the right hint!', [{text: 'Sorry', style: 'cancel'}])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess - 1
        } else { 
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(prevRound => prevRound + 1)
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.guessText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button color={Colors.accent} title="Lower" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button color={Colors.accent} title="Greater" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '25%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        backgroundColor: Colors.primary,
    },
    guessText: {
        fontSize: 25,
        marginBottom: 30 
    }
});

export default GameScreen
