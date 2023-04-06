require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

// consulto el detalle del juego por el ID
router.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params
    
    //Busco si es un juego creado en la bd
    if (idVideogame.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })
        //Parseo el objeto
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        
        //dejo un array con los nombres de genero solamente
        videogameDb.genres = videogameDb.genres.map(el => el.name);
        res.json(videogameDb)
    } else {
        //sino busco en la api
        try {
            const response = await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`);
            let { 
                id, 
                name, 
                background_image, 
                genres, 
                description, 
                released: releaseDate, 
                rating, platforms 
            } = response.data;
            genres = genres.map(el => el.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
            platforms = platforms.map(el => el.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
            return res.json({
                id,
                name,
                background_image,
                genres,
                description,
                releaseDate,
                rating,
                platforms
            })
        } catch (err) {
            return console.log(err)
        }
    }
})
//POST
router.post('/', async (req, res, next) => {
    let { 
        name, 
        description, 
        background_image,
        releaseDate, 
        rating, 
        genres,
        createdInDb, 
        platforms 
    } = req.body;
    platforms = platforms.join(', ')
    try {
        const gameCreated = await Videogame.create({
            
                name,
                description,
                background_image,
                releaseDate,
                rating,
                platforms,
                createdInDb,
            
        })
        const gameGenre = await Genre.findAll({
            where: {
                name: genres
            }
        })
        
        console.log(gameCreated)

        await gameCreated.addGenre(gameGenre)
       
    } catch (err) {
        console.log(err);
    }
    res.send('Created succesfully')
})

//POST DE PRUEBA PARA EL BACK: 
/*
    {
        "name": "fede", 
        "description": "juego de fede", 
        "releaseDate":"1992-04-23", 
        "rating": 9.9, 
        "genres": ["Adventure", "Action"], 
        "platforms": ["Xbox One", "PlayStation 3"]
    }
*/

 // await gameCreated[0].setGenres(genres); // relaciono ID genres al juego creado
module.exports = router;