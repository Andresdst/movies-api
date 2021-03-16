const express = require('express')

const UserMovieService = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')

//const {userMovieIdSchema} = require('../utils/schemas/userMovies')
const {userIdSchema} = require('../utils/schemas/users')
//const {movieIdSchema} = require('../utils/schemas/movies')

function UserMoviesApi(app) {
    const router = express.Router()
    app.use('/api/user-movies', router)

    const userMovieService = new UserMovieService()

    router.get('/', validationHandler({userIdSchema},'query'), async function(req,res,next){
        const  {userId} = req.query

        try {
            const userMovies = await userMovieService.getUserMovies({userId})

            res.status(200).json({
                data: userMovies,
                message: 'user movies listed'
            })
        } catch(error) {
            next(error)
        }
    })
}