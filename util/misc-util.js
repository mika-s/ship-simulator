const chalk = require('chalk');

/**
* Colors the request string in the terminal depending on request type.
* @param {string} response    - A type of requst (GET, POST, PUT, PATCH, DELETE)
* @returns {string}           - The request string with colors.
*/
module.exports.colorRequest = (request) => {
  let coloredRequest;

  switch (request) {
    case 'GET':
      coloredRequest = chalk.redBright(request);
      break;
    case 'POST':
      coloredRequest = chalk.greenBright(request);
      break;
    case 'PUT':
      coloredRequest = chalk.yellowBright(request);
      break;
    case 'PATCH':
      coloredRequest = chalk.magentaBright(request);
      break;
    case 'DELETE':
      coloredRequest = chalk.whiteBright(request);
      break;
    default:
      coloredRequest = request;
      break;
  }
  return coloredRequest;
};
