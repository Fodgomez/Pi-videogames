import axios from 'axios'

export const VIDEOGAMES = "VIDEOGAMES";
export const GENRES_FILTER = 'GENRES_FILTER'
export const CREATED_FILTER = "CREATED_FILTER"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_GENRES = "GET_GENRES"
export const GET_PLATFORMS = "GET_PLATFORMS"
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const GET_DETAILS = "GET_DETAILS"


export function getVideogames() {
    return async function(dispatch) {
        const result = await axios('/videogames')
        return dispatch({
            type: VIDEOGAMES,
            payload: result.data
        }); 
    };
};

export function getDetails(id) {
    return async function (dispatch) {
        try {
            const result = await axios('/videogame/' + id)
            return dispatch({
                type: GET_DETAILS,
                payload: result.data
            })
        } catch(error) {
            console.log(error)
        }
        
    }
}

export function getGenres(){
    return async function(dispatch){
        const info = await axios('/genres')
        return dispatch({
            type: GET_GENRES,
            payload: info.data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        const info = await axios('/Platforms')
        return dispatch({
            type: GET_PLATFORMS,
            payload: info.data
        })
    }
}

export function postVideogame(payload){
    return async function(){
        const response = await axios.post('/videogame', payload)
        return response
    }
}

export function genresFilter(payload) {
    return {
        type: GENRES_FILTER,
        payload
    }
}

export function createdFilter(payload){
    return{
        type: CREATED_FILTER,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload 
    }
}

export function getVideoamesByName(name){
    return async function(dispatch){
        try{
            var json = await axios('/videogames?name=' + name)
            return dispatch({
                type: GET_BY_NAME,
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}