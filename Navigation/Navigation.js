import Favorites from '../Components/Favorites'
import React from 'react' // Ne pas oublier l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { StyleSheet, Image} from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';

const SearchStackNavigator = createStackNavigator({
    Search: { //Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search, //ici on définit Search comme vue principal de l'application
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { 
                    return <Image 
                                source={require('../Images/ic_search.png')}
                                style={styles.icon} //on applique un style pour les redimensionner
                            />
                }
            }
        },
        Favorites: {
            screen: Favorites,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image 
                                source={require('../Images/ic_favorite.png')}
                                style={styles.icon}
                            />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',//couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF',//couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false,//on masque les titres
            showIcon: true // on informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

//on utilise la fonction createAppContainer  de React Navigation. 
//Elle permet de formater votre navigation pour la rendre utilisable dans l'application
export default createAppContainer(MoviesTabNavigator);