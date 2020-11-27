const boom = require("@hapi/boom");

function notFoundHandler(req, res) {
  //no es necesario next

  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
