import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, FlatList } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors' 
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

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

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText style={styles.guessStyle}>{itemData.item}</BodyText>
            <View>
                <BodyText style={styles.numStyle}>#{listLength - itemData.index}</BodyText>
            </View>
        </View>
    )
}

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    
    const { userChoice, onGameOver } = props;
    useEffect(() => {
        if ( currentGuess === userChoice ) {
            props.onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t Cheat!', 'Give the oponent the right hint!', [{text: 'Sorry', style: 'cancel'}])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else { 
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };

    return (
        <View style={styles.screen}>
            <TitleText style={styles.guessText}>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button color={Colors.accent} title="Lower" onPress={() => nextGuessHandler("lower")}/>
                <Button color={Colors.accent} title="Greater" onPress={() => nextGuessHandler('greater')}/>
            </Card>
            <View style={styles.listContainer}>
                <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this,pastGuesses.length)} contentContainerStyle={styles.list}/>
            </View>
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
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: Colors.accent,
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.26,
        elevation: 5,
    },
    numStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5
    },
    guessStyle: {
        backgroundColor: Colors.accent,
        borderRadius: 5,
        padding: 5,
        color: 'white'
    }
});

export default GameScreen
