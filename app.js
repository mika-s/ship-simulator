const logger = require('./logger');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const compression = require('compression');
const MiscUtil = require('./util/misc-util');

const app = express();

app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
  logger.info(MiscUtil.colorRequest(req.method), req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => { logger.info(`Started on port ${server.address().port}`); });

module.exports = server;
