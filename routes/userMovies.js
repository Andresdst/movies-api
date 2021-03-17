const express = require('express')

const UserMovieService = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')

const {createUserMovieSchema} = require('../utils/schemas/userMovies')
const {userIdSchema} = require('../utils/schemas/users')
const {movieIdSchema} = require('../utils/schemas/movies')

function UserMoviesApi(app) {
    const router = express.Router()
    app.use('/api/user-movies', router)

    const userMovieService = new UserMovieService()

    router.get('/', validationHandler({userId: userIdSchema},'query'), async function(req,res,next){
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
    });

    router.post('/',validationHandler(createUserMovieSchema), async function(req,res,next){
        const {body: userMovie} = req

        try{
            const createduserMovieId = await userMovieService.createUserMovie({ userMovie })

            res.status(201).json({
                data: createduserMovieId,
                message: 'user movie created'
            })
        } catch(error) {
            next(error)
        }
    })

    router.delete('/:userMovieId',validationHandler({userMovieId : movieIdSchema},'params'), async function(req,res,next){
        const {userMovieId} = req.params

        try{
            const deletedUserMovieId = await userMovieService.deleteUserMovie({ userMovieId })

            res.status(200).json({
                data: deletedUserMovieId,
                message: 'user movie deleted'
            })
        } catch(error) {
            next(error)
        }
    })
}

module.exports = UserMoviesApi