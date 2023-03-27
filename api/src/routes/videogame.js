require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

//detalle del juego por el ID
router.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params
    
    // busco si es un juego creado en la bd
    if (idVideogame.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })
        
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        
        videogameDb.genres = videogameDb.genres.map(el => el.name);
        res.json(videogameDb)
    } else {
        //sino busco en la api
        try {
            const response = await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`);
            let { 
                id, 
                name,  
                description,
                image, 
                genre,
                platforms, 
                released: releaseDate, 
                rating, 

            } = response.data;
            genres = genres.map(el => el.name); // mapeo solo el nombre del genero
            platforms = platforms.map(el => el.platform.name); // mapeo solo el nombre de la plataforma
            return res.json({
                id, 
                name,  
                description,
                image, 
                genre,
                platforms, 
                releaseDate, 
                rating, 
            })
        } catch (error) {
            return console.log(error)
        }
    }
})

router.post('/', async (req, res, next) => {
    let {  
        name,  
        description,
        image, 
        genre,
        platforms, 
        releaseDate, 
        rating, 
        createdInDb

    } = req.body;
    platforms = platforms.join(', ')
    try {
        const gameCreated = await Videogame.create({
            name,  
            description,
            image, 
            platforms, 
            releaseDate, 
            rating, 
            createdInDb,
            
        })
        const gameGenre = await Genre.findAll({
            where: {
                name: genre
            }
        })
        
        console.log(gameCreated)

        await gameCreated.addGenre(gameGenre)

    } catch (error) {
        console.log(error);
    }
    res.send('Created succesfully')
})

module.exports = router;