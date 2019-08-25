import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    //une property et pas une méthode
    //directement bind graçe à la déclaration
    _displayDetailForFilm = (idFilm) => { //_displayDetailForFilm(idFilm) { }
        //console.log(this.props);
            return this.props.navigation.navigate('FilmDetail', { idFilm: idFilm,favoriteList: this.props.favoriteList});
    }

    render() {
        //console.log(this.props)
        //console.log("film favories" + this.props.favoriteList);
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                renderItem={
                ({item}) => <FilmItem 
                                film={item}
                                displayDetailForFilm={this._displayDetailForFilm}
                                favoriteList={this.props.favoriteList}
                                isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                            />}
                onEndReachedThreshold={1}
                onEndReached={() => {
                    //console.log(this.props)
                    if(this.props.page < this.props.totalPages && this.props.favoriteList !== true) {
                        //On appelle la méthode loadFilm du component Search pour changer plus de films
                        this.props.loadFilms()
                    }
                }}
            /> 
        )
    }

}

const mapStateToProps = (state) => {
//return state
//on ne retourne que l'info du state global qui nous intéresse
//le nom de la variable n'est pas important on peut la nommer comme on veut
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

export default connect(mapStateToProps)(FilmList)