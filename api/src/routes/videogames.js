require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

router.get('/', async (req, res) => {
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    
    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
        ...el,
        genres: el.genres.map(el => el.name)
    }), [])
    
    if (req.query.name) {
        try {
            //busco si existe en la API
            let response = await axios(`https://api.rawg.io/api/games?search=${req.query.name}&key=${YOUR_API_KEY}`);
            if (!response.data.count){
                return res.status(204).json(`Juego no encontrado "${req.query.name}"`)
            }
            //filtro solo lo que necesito para enviarle al front
            const gamesREADY = response.data.results.map(game => {
                return{
                    id: game.id,
                    name: game.name,
                    image: game.image,
                    rating: game.rating,
                    genres: game.genres.map(el => el.name),
                    released: game.released,
                }
            });
            
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            const results = [...filteredGamesDb, ...gamesREADY.splice(0, 15)];
            return res.json(results)
        } catch (error) {
            return console.log(error)
        }
    }else {
        try {
            let pages = 0;
            let results = [...videogamesDb]; 
            let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
            while (pages < 6) {
                pages++;
                
        const gammesREADY = response.data.results.map(game => {
        let platformstr = []
        if (game.platforms) {
            for (i=0;i<game.platforms.length;i++) {
            platformstr.push(game.platforms[i].platform.name)
        } 
    }
	return{
			id: game.id,
            name: game.name,
			image: game.image,
            rating: game.rating,
            released: game.released,
            genres: game.genres.map(el => el.name),
            platforms: platformstr.map(event=>event)
	}
});
        results = [...results, ...gammesREADY]
        response = await axios(response.data.next) 
    }
    return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
});

module.exports = router;