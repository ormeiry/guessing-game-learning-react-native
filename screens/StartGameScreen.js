import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import Colors from '../constants/colors'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNum, setSelectedNum] = useState()
    
    const numInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number must be between 1 and 99.', [{text: 'Okay', style: 'destractive', onPress: resetInputHandler}])
            return
        };
        setConfirmed(true);
        setSelectedNum(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
    confirmedOutput = (
        <Card style={styles.confirmedCard}>
        <Text>You Selected</Text>
            <NumberContainer>{selectedNum}</NumberContainer>
            <Button color={Colors.accent} title="START GAME" onPress={() => props.onStartGame(selectedNum)}/>
        </Card>)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} blurOnSubmit autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numInputHandler} value={enteredValue}/>
                <View style={styles.buttonContainer}>
                <View  style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        marginTop: 30
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    confirmedCard: {
        marginTop: 70,
        backgroundColor: Colors.primary,
        alignItems: "center"
    },
})

export default StartGameScreen;