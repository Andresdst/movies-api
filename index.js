const express = require("express");
const app = express();

const { config } = require("./config/index");
const moviesAPI = require("./routes/movies");

const { logErrors, errorHandler } = require("./utils/middleware/errorHandlers");

//body parser
app.use(express.json());

//rutas
moviesAPI(app);

//middlewares
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
