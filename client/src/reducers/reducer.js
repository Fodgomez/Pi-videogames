import { CREATED_FILTER, VIDEOGAMES, GENRES_FILTER, ORDER_BY_NAME, GET_BY_NAME, POST_VIDEOGAME, GET_GENRES, GET_PLATFORMS, GET_DETAILS } from "../actions/index";

const initialState = {
    videogames: [],
    allGames: [],
    vgfilter : [],
    genres: [],
    platforms: [],
    details: []
};

function rootReducer (state = initialState, action){
    switch(action.type){
        case VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allGames: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GENRES_FILTER:
            const allGames = state.allGames
            const genresFilter = action.payload==='All' ? allGames 
            : allGames.filter(el=>el.genres.includes(action.payload))
            return{
                ...state,
                videogames: genresFilter
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case POST_VIDEOGAME:
            return {
                ...state,
            }
        case CREATED_FILTER:
            const games = state.allGames;
            const createdFilter = action.payload === 'DB' ?
                games.filter(el => el.createdInDb) :
                games.filter( el => !el.createdInDb )
            return {
                ...state,
                videogames: action.payload === 'All' ?
                state.allGames: createdFilter
            }
        case ORDER_BY_NAME:
            if (action.payload === 'rating') {
                let sortedArr  = state.videogames.sort(function (a,b) {
                    if(a.rating > b.rating) {
                        return -1;
                    }
                    if(b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                }) 
                return {
                    ...state,
                    videogames: sortedArr
                }            
            } 
            else {
                let sortedArr  = action.payload === 'asc' ?
                    state.videogames.sort(function (a,b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                    }) :
                    state.videogames.sort(function (a,b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                    })
                return {
                    ...state,
                    videogames: sortedArr
                }
            }       
        default: 
        return state
    }
}

export default rootReducer;