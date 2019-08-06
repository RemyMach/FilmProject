// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing } from 'react-native'

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //on définit l'animated value dans le state
            topPosition: new Animated.Value(0),
            leftPosition: new Animated.Value(0)
        }
    }
    //appelé quand notre component est monté
    componentDidMount() {
        Animated.parallel([
            Animated.spring(
              this.state.topPosition,
              {
                toValue: 100,
                tension: 8,
                friction: 3
              }
            ),
            Animated.timing(
              this.state.leftPosition,
              {
                toValue: 100,
                duration: 1000,
                easing: Easing.elastic(2)
              }
            )
          ]).start()
    }

    render() {
        //Animated.View est obligatoire pour faire une animation avec Animated
        return (
        <View style={styles.main_container}>
            <Animated.View style={[styles.animation_view, {top: this.state.topPosition, left: this.state.leftPosition}]}>
            </Animated.View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subview_container: {
        ...Platform.select({
            ios: {
                backgroundColor: 'red'
            },
            android: {
                backgroundColor: 'blue'
            }
        }),
        height: 50,
        width: 50
    },
    animation_view: {
        backgroundColor: 'red',
        width: 100,
        height: 100
    }
})

export default Test