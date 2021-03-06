const express = require("express");
const app = express();

const { config } = require("./config/index");
const moviesAPI = require("./routes/movies");
const authAPI = require("./routes/auth");
const UserMoviesApi = require('./routes/userMovies')

const {
  logErrors,
  wrapError,
  errorHandler,
} = require("./utils/middleware/errorHandlers");

const notFoundHandler = require("./utils/middleware/notFoundHandler");

//body parser
app.use(express.json());

//rutas
authAPI(app)
moviesAPI(app);
UserMoviesApi(app);
//catch 404
app.use(notFoundHandler);

//middlewares
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
