import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

class Favorites extends React.Component {
    render() {
        return (
            <Text>Mes Favoris</Text>
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

})

export default connect(mapStateToProps)(Favorites)