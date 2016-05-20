var Hapi = require('hapi');
var mongoose = require('mongoose');
var Log = require('log');
var log = new Log('info');
var config = require('./config');
var routes = require('./routes');

log.info('Initializing app.');
var server = new Hapi.Server();

// Load and configure Hapi.
server.connection({
  host: config.app.host,
  port: config.app.port,
  routes: {
    cors: {
      isOriginExposed: false,
      headers: [
        'Authorization',
        'Content-Type',
        'If-None-Match',
        'Client-ID',
        'App-ID'
      ]
    }
  }
});

// Start server
log.info('Starting server');
server.start(function() {
  log.info('Server started: http://' + config.app.host + ':' + config.app.port);
});


// Load routes
routes.forEach(function(route) {
  var def = {
    method: route.method,
    path: '/v' + route.version + '/' + route.path,
    config: {
      handler: function (request, reply) {
        var controllerPath = './controllers/v' + route.version + '/' + route.controller;
        var Controller = require(controllerPath);
        var controller = new Controller(request, reply, config);

        // Preprocess the request parameters and call the handler.
        //controller.preprocessRequest();
        controller[route.config.handler]();
      }
    }
  };

  server.route(def);
  log.info('Loaded route: [' + def.method + ']', def.path);
});

// Connect to MongoDB database.
log.info('[MONGO DB] Configuring MongoDB connection');

var mongoURI = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database;
mongoose.connect(mongoURI, function(err) {
  // Set debug mode.
  mongoose.set('debug', config.db.debug);

  if (err) {
    log.error('' + err);
  } else {
    log.info('[MONGO DB] connected:', mongoURI);
    log.info('[MONGO DB] debug mode:', config.db.debug);
  }
});