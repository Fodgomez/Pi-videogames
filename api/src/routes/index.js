const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogames');
const videogame = require('./videogame');
const genres = require('./genres');
const platforms = require('./platforms') 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/videogame', videogame);
router.use('/platforms', platforms)


module.exports = router;
