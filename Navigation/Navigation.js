import { createStackNavigator, createAppContainer } from 'react-navigation';
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

//on utilise la fonction createAppContainer  de React Navigation. 
//Elle permet de formater votre navigation pour la rendre utilisable dans l'application
export default createAppContainer(SearchStackNavigator);