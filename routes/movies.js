const express = require("express");
const passport = require('passport')
const MoviesService = require("../services/movies");

const {movieIdSchema,createMovieSchema,updateMovieSchema} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

//JWT strategy
require('../utils/auth/strategy/jwt')

function moviesAPI(app) {
  const router = express.Router();
  app.use("/api/movies", router);

  const moviesService = new MoviesService();

  router.get("/", async function (req, res, next) {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });
      //throw new Error("error de prueba");

      res.status(200).json({
        data: movies,
        message: "movies listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:movieId", passport.authenticate('jwt', {session:false})/*,
  validationHandler({id: movieIdSchema}, 'params')*/, async function (req, res, next) {
    const { movieId } = req.params;

    try {
      const movie = await moviesService.getMovie({ movieId });

      res.status(200).json({
        data: movie,
        message: "movie retrieved",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", passport.authenticate('jwt', {session:false}),
  validationHandler(createMovieSchema), async function (req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: "movie created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:movieId", passport.authenticate('jwt', {session:false}),
  validationHandler({id: movieIdSchema}, 'params') ,validationHandler(updateMovieSchema), async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie,
      });

      res.status(200).json({
        data: updatedMovieId,
        message: "movie updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:movieId", passport.authenticate('jwt', {session:false}),
  validationHandler({id: movieIdSchema}, 'params'), async function (req, res, next) {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovieId,
        message: "movie deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesAPI;
