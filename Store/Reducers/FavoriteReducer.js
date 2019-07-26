const initialState = { favoritesFilm: [] };

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            //Pour savoir si le film est déjà présent dans la liste des films favoris, on utilise la fonction  
            //findIndex  en Javascript qui retourne l'index de l'élément dans le tableau s'il existe, sinon elle renvoie -1.
            //on note ici que l'on compare les id.
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                // Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    //ici favoriteFilmIndex est l'index récupérer par la fonction findIndex
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }   
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                //on fait une copie du tableau state
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            //renvoie nextState si celui n'est pas undefined
            //graçe à cela si ça se passe mal on renvoie state qui était le state de base
            return nextState || state
        
            default:
            return state
    }
}

export default toggleFavorite;