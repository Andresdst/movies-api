const express = require("express");
const app = express();

const { config } = require("./config/index");
const moviesAPI = require("./routes/movies");

//body parser
app.use(express.json());

moviesAPI(app);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
