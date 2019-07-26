import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator,ScrollView, Image, Button} from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
             // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
    _displayFilm() {
        console.log("j'aime");
        const film = this.state.film
        if(film != undefined){
        //<Text>{this.state.film.title}</Text>
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_film}>{film.title}</Text>
                    <Button title="Favoris" onPress={() => this._toggleFavorite()}></Button>
                    <Text style={styles.description_film}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average}</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00$')}</Text>
                    <Text style={styles.default_text}>Genre(s) : 
                    {film.genres.map(function(genre){
                        return genre.name;
                    }).join(" / ")
                    }</Text>
                    <Text style={styles.default_text}>Companie(s) : 
                    {film.production_companies.map(function(company){
                        return company.name;
                    }).join(" / ")
                    }</Text>
                </ScrollView>
            );
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
          this.setState({
            film: data,
            isLoading: false
          })
        })
    }

    componentDidUpdate() {
        //fonction qui fait partie du cycle de vie update d'un film
        console.log(this.props.favoritesFilm)
    }

    _toggleFavorite(){
        //Définition de l'action ici
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    render() {
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
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
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview_container: {
        flex: 1,
    },
    image: {
        height: 180,
        margin: 2
    },
    title_film: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft:5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: "#000000",
    },
    container_description: {
        flex: 7
    },
    description_film: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        fontWeight: "bold",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    }
})

export default connect(mapStateToProps)(FilmDetail)
