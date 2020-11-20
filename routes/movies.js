const express = require('express')
const {moviesMock} = require('../utils/mocks/movies')

function moviesAPI (app) {
  const router = express.Router()

  app.use('/api/movies', router)


  app.get('/', async (req, res, next) =>{
    try{
      const movies = await Promise.resolve(moviesMock)
      res.status(200).json({
        data: movies,
        message: 'movies getted'
      })

    }catch(err){
      console.log(err)
      next(err)

    }
  })

    app.get('/:movieId', async (req, res, next) =>{
    try{
      const movie = await Promise.resolve(moviesMock[0])
      res.status(200).json({
        data: movie,
        message: 'movie getted'
      })

    }catch(err){
      console.log(err)
      next(err)

    }
  })

    app.post('/:movieId', async (req, res, next) =>{
    try{
      const createdMovie = await Promise.resolve(moviesMock[0].id)
      res.status(201).json({
        data: createdMovie,
        message: 'movies created'
      })

    }catch(err){
      console.log(err)
      next(err)

    }
  })

    app.put('/:movieId', async (req, res, next) =>{
    try{
      const updatedMovie = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: updatedMovie,
        message: 'movie updated'
      })

    }catch(err){
      console.log(err)
      next(err)

    }
  })

    app.delete('/:movieId', async (req, res, next) =>{
    try{
      const deletedMovie = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: deletedMovie,
        message: 'movie deleted'
      })

    }catch(err){
      console.log(err)
      next(err)

    }
  })
}

module.exports = moviesAPI