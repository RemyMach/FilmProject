import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from "./Avatar";

class Favorites extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        //console.log(this.props.favoritesFilm)   
        return (
            <View style={ styles.main_container }>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <FilmList
                    films={this.props.favoritesFilm} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
                    //page={this.page}
                    //totalPages={this.total_pages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                    //loadFilms={this._loadFilms}
                />
            </View>
        );
    }
}

//StyleSheet.create() améliore les performances de l'appliaction
const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    avatar_container: {
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    //return state
    //on ne retourne que l'info du state global qui nous intéresse
    //le nom de la variable n'est pas important on peut la nommer comme on veut
        return {
            favoritesFilm: state.toggleFavorite.favoritesFilm
        }
    }

export default connect(mapStateToProps)(Favorites)