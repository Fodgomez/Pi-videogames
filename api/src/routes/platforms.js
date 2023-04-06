require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Platform } = require('../db');

router.get('/', async (req, res) => {
    try {
        // si ya los tengo cargados en la DB los consumo desde alli.
        const platformDb = await Platform.findAll();
        if (platformDb.length) return res.json(platformDb)
        //else --> los voy a buscar a la API
        const response = await axios.get(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`);
        const platforms = response.data.results; // recibo un array de objetos, con los juego filtrados por GENERO
        //los guardo en la DB filtrando solo el nombre
        platforms.forEach(async p => {
            await Platform.findOrCreate({
                where: {
                    name: p.name
                }
            })
        })
        //SOLO ENVIO AL FRONT LA INFO NECESARIA (nombre de los generos)
        const platformsREADY = platforms.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });
        res.json(platformsREADY)
    } catch (err) {
        return console.log(err)
    }
})

module.exports = router;