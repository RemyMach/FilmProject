import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'
import EnlargeShrink from "../Animations/EnlargeShrink"

class FilmItem extends React.Component {

  _displayFavoriteHeart(){
    if(this.props.isFilmFavorite && this.props.favoriteList !== true){
      return (
        <Image
          style={styles.favorite_image_heart}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }


    render() {
        const displayDetailForFilm = this.props.displayDetailForFilm // équivaut pour les deux lignes à const { film, displayDetailForFilm } = this.props 
        const film = this.props.film;
        return (
          <FadeIn>
            <TouchableOpacity
                style={styles.main_container} 
                onPress={() => displayDetailForFilm(film.id)} >
                <Image
                  style={styles.image}
                  source={{uri: getImageFromApi(film.poster_path)}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                          {this._displayFavoriteHeart()}
                        <Text style={styles.title_text}>{ film.title }</Text>
                        <Text style={styles.vote_text}>{ film.vote_average }</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{ film.overview }</Text>
                        {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le { film.release_date }</Text>
                    </View>
                </View>
            </TouchableOpacity>
          </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  favorite_container: {
    
  },
  favorite_image_heart: {
      width: 25,
      height: 25,
      marginRight: 5
  },
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem