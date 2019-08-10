import React from 'react'
import {Animated, Dimensions, StyleSheet, View} from 'react-native'
import {connect} from "react-redux";

class EnlargeShrink extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            viewSize: new Animated.Value(this._getSize())
        }
        console.log("je suis " + this.props.shouldEnlarge)
    }

    _getSize(){
        if(this.props.shouldEnlarge){
            return 80
        }else{
            return 40
        }
    }

    componentDidUpdate() {

        Animated.spring(
            this.state.viewSize,
            {
                toValue: this._getSize()
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{ width: this.state.viewSize, height: this.state.viewSize}}>
                {this.props.children}
            </Animated.View>
        )
    }
}

const mapStateToProps = (state) => {
    //return state
    //on ne retourne que l'info du state global qui nous intéresse
    //le nom de la variable n'est pas important on peut la nommer comme on veut
    return {
        favoritesFilm: state.favoritesFilm
    }
}

const styles = StyleSheet.create({
    Animation_Favorite_Heart: {
        width: 40,
        height: 40
    },
    Animation_Not_Favorite_Heart: {
        width: 80,
        height: 80
    }
})

export default connect(mapStateToProps)(EnlargeShrink)