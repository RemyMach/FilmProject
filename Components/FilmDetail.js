import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator,ScrollView, Image, Share, Platform, Button} from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

class FilmDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const {params} = navigation.state
        //On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if (params.film != undefined && Platform.OS === 'ios'){
            return {
                //on a besoin d'afficher une image, il faut donc passe par une Touchabe une fois
                headerRight: <TouchableOpacity 
                                style={styles.share_tochable_headerrightbutton}
                                onPress={() => params.shareFilm()} >
                                <Image
                                    style={styles.share_image}
                                    source={require('../Images/ic_share.png')} />
                            </TouchableOpacity>
            }
        }
    }

    constructor(props){
        super(props);
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: false // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
        this._shareFilm = this._shareFilm.bind(this)
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

    //display poster_path if the film doesn't have backdrop_path
    _displayLinkImage(film) {
        if(film.backdrop_path === null){
            return film.poster_path
        }else{
            return film.backdrop_path
        }
    }

    _displayFilm() {
        //console.log("j'aime");
        const film = this.state.film
        if(film != undefined){
        //<Text>{this.state.film.title}</Text>
        //console.log(this.state.film.title)
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(this._displayLinkImage(film))}}
                    />
                    <Text style={styles.title_film}>{film.title}</Text>
                    <TouchableOpacity 
                        style={styles.favorite_container} 
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
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

    // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    // Dès que le film est chargé, on met à jour les paramètres de la navigation (avec la fonction _updateNavigationParams) pour afficher le bouton de partage
    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
            // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
            this.setState({
              film: this.props.favoritesFilm[favoriteFilmIndex]},
              () => {this._updateNavigationParams()}
            )
            return
          }else{
            // Le film n'est pas dans nos favoris, on n'a pas son détail
            // On appelle l'API pour récupérer son détail
            this.setState({ isLoading: true })
            getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
                this.setState({
                    film: data,
                    isLoading: false},
                    () => {this._updateNavigationParams()}
                )
            })
        }
    }


    componentDidUpdate() {
        //fonction qui fait partie du cycle de vie update d'un film
        //console.log(this.props.favoritesFilm)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
            //Film dans nos favoris
            sourceImage = require('../Images/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image_heart}
                source={sourceImage}
            />
        )
    }
    _toggleFavorite(){
        //Définition de l'action ici
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    //la fonction de partage
    _shareFilm() {
        //équivaut à const film = this.state.film
        const {film} = this.state
        Share.share({title: film.title, message: film.overview})
    }

    //création du bouton de partage
    _displayFloatingActionButton() {
        const {film} = this.state
        console.log(film)
        if (film !== undefined && Platform.OS === 'android') {
            console.log("histoire")
            return (
                //obligé de rajouter une view sinon le position absolute ne fonctionne pas
                <View
                    style={styles.share_touchable_floatingactionbutton} >
                    <TouchableOpacity
                        onPress={() => this._shareFilm()} >
                        <Image 
                            style={styles.share_image}
                            source={require('../Images/ic_share.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        //console.log(this.props)
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
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
    favorite_container: {
        alignItems: 'center',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollview_container: {
        flex: 1,
    },
    image: {
        height: 180,
        margin: 2
    },
    favorite_image_heart: {
        width: 45,
        height: 40
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
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        //pour aligner le contenu à l'intérieur qui est l'image share
        justifyContent: 'center',
        alignItems: 'center',
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_tochable_headerrightbutton: {
        margin: 8
    }
})

export default connect(mapStateToProps)(FilmDetail)