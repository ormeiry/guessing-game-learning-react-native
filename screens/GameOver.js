import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
            <Card style={styles.summery}>
                <Text>Game Over!</Text>      
                <Text>Number Of Guesses: {props.numOfrounds}</Text>     
                <Text>Number was: {props.userNumber}</Text>
                <Button color={Colors.accent} title="Start a new game"onPress={props.onRestart}/>     
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    summery: {
        height: '40%',
        justifyContent: 'space-evenly',
        padding: 60,
        backgroundColor: Colors.primary,
    },
})

export default GameOver
