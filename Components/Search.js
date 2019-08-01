import React from 'react'
//on imoorte l'API StyleSheet pour que ça aille plus vite
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) 
    {
        //super(props)ajoute les porps de l'élément parent donc REACT.COMPONENT
        super(props);
        //Maintenant on peut utiliser this
        this.state = { 
            films: [],
            isLoading: false
        }
        //on initialise avec des this APPAREMENT 
        this.searchedText = "";
        this.page = 0;
        this.total_page = 0;
        //console.log('etat');
    }
    _searchFilms() {
        this.page = 0;
        this.total_page = 0;
        this.setState({films: []},
            () => {
            // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film et c'est la callback de setState
            //console.log("Page : " + this.page + " / TotalPages : " + this.total_page + " / Nombre de films : " + this.state.films.length)
            this._loadFilms() 
            }
        )
    }

    _loadFilms() {
        //getFilmsApiWithSearchedText("star").then(data => console.log(data));
        if(this.searchedText.length > 0){
            this.setState({isLoading: true})
            getFilmsApiWithSearchedText(this.searchedText,this.page+1).then(
                data => {this.setState({ 
                            films: this.state.films.concat(data.results),
                            isLoading: false 
                        }), this.total_page = data.total_pages,this.page = data.page
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
    }

    render() {
        //console.log(this.state.films);
        console.log("------------------------------------------------------------------------------------------------");
        return (
            <View style={ styles.main_container }>
                <TextInput placeholder="Titre du film" 
                            onSubmitEditing ={() => this._searchFilms()}  
                            onChangeText={(text) => this._searchTextInputChanged(text) } 
                            style={ styles.textinput } />
                <Button title="Rechercher" onPress= { () => this._searchFilms() } />
                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                    loadFilms={this._loadFilms}
                />
                {this._displayLoading()}
            </View>
        );
    }
}

//StyleSheet.create() améliore les performances de l'appliaction
const styles = StyleSheet.create({
    main_container : {
        flex: 1,
    },
    textinput : {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        /*on met un top: 100 pour que le textInput et le bouton soit toujours disponible
         vu qu'on a mit une View en absolute qui pourrait les recouvrir*/
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Search;