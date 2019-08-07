// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, PanResponder, Dimensions } from 'react-native'

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //on définit l'animated value dans le state
            topPosition: 0,
            leftPosition: 0
        }
        var {height, width} = Dimensions.get('window');
        console.log(height)
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if (touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height/2,
                        leftPosition: touches[0].pageX - width/2
                    })
                }
            }
        })
      }
    
        render() {
            return (
                <View style={styles.main_container}>
                    <View
                    {...this.panResponder.panHandlers}
                    style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
                    </View>
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