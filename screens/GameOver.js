import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import BodyText from '../components/BodyText'

import Card from '../components/Card'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
            <Card style={styles.summery}>
                <TitleText>Game Over!</TitleText>      
                <BodyText>Number Of Guesses: {props.numOfrounds}</BodyText>     
                <BodyText>Number was: {props.userNumber}</BodyText>
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
