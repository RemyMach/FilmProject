import React from 'react'
import {Animated, Dimensions, StyleSheet, View} from 'react-native'
import {connect} from "react-redux";

class EnlargeShrink extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            sizeFavoriteHeart: new Animated.Value(80),
            sizeNotFavoriteHeart: new Animated.Value(40)
        }
        console.log("je suis " + this.props.shouldEnlarge)
    }

    componentDidUpdate() {
        if(this.props.shouldEnlarge === true){
            Animated.timing(
                this.state.sizeNotFavoriteHeart,
                {
                    toValue: 80,
                    duration: 5000
                }
            ).start()
        }else{
            Animated.timing(
                this.state.sizeFavoriteHeart,
                {
                    toValue: 40,
                    duration: 1000
                }
            ).start()
        }
    }



    _displayAnimation(){
        if(this.props.shouldEnlarge !== false){
            return styles.Animation_Not_Favorite_Heart
        }else{
            return styles.Animation_Favorite_Heart
        }

    }

    render() {
        return (
            <Animated.View style={this._displayAnimation()}>
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