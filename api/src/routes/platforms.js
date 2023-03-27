require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Platform } = require('../db');

router.get('/', async (req, res) => {
    try {
        const platformDb = await Platform.findAll();
        if (platformDb.length) return res.json(platformDb)

        const response = await axios(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`);
        const platforms = response.data.results; 
        platforms.forEach(async p => {
            await Platform.findOrCreate({
                where: {
                name: platforms.name
                }
            })
        })
        
        const platformsREADY = platforms.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });
        res.json(platformsREADY)
    } catch (error) {
        return console.log(error)
    }
})

module.exports = router;