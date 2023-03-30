require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios')
const { Genre } = require('../db');  


router.get('/', async (req, res) => {
    try {
        const genresDb = await Genre.findAll();
        if (genresDb.length) 
        return res.json(genresDb)
        
        const response  = await axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
        const genres = response.data.results;
        genres.forEach(async g => {
            await Genre.findOrCreate({
            where: {
                name: g.name
            }
        })
    })                                           

    const genresReady = genres.map(game=> {
        return{
            id: game.id,
            name: game.mane
        }
    })
    res.json(gREADY)

    } catch (error) {
        return console.log(error)
    }
})

module.exports = router;