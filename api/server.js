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

//function Server() {
//  var that = {};
//  that.mode = process.env.CSM_API_MODE;
//  that.server = null;
//
//  /**
//   * Main process to run.
//   */
//  that.main = function() {
//
//
//    async.series([
//      async.apply(that.serverInit),
//      async.apply(that.loadRoutes),
//      async.apply(that.startServer),
//      async.apply(that.loadDatabase)
//    ], function(err, results) {
//      if (err) {
//        log.error(err);
//      }
//
//      log.info('Server startup complete');
//    });
//  };
//
//  /**
//   * Gets a list of the valid origin servers.
//   *
//   * @returns {Array}
//   */
//  that.getOriginServers = function() {
//    var originServers = [];
//    var override = process.env.GAPI_ORIGIN_SERVER;
//
//    if (override) {
//      originServers.push(override);
//      log.info('Loaded origin server:', override);
//    } else {
//      accounts.forEach(function(account) {
//        account.originServers.forEach(function(origin) {
//          originServers.push(origin);
//
//          log.info('Loaded origin server:', origin);
//        });
//      });
//    }
//
//    return originServers;
//  };
//
//  /**
//   * Server configuration.
//   *
//   * @param callback
//   */
//  that.serverInit = function(callback) {
//    log.info('Configuring NodeJS server');
//
//    that.server = new Hapi.Server();
//
//    // Load and configure Hapi.
//    that.server.connection({
//      host: config.host,
//      port: config.port,
//      routes: {
//        cors: {
//          isOriginExposed: false,
//          origin: that.getOriginServers(),
//          headers: [
//            'Authorization',
//            'Content-Type',
//            'If-None-Match',
//            'Client-ID',
//            'App-ID'
//          ]
//        }
//      }
//    });
//
//    callback();
//  };
//
//  /**
//   * Start the Hapi server.
//   *
//   * @param callback
//   */
//  that.startServer = function(callback) {
//    // Start the server.
//
//  };
//
//  /**
//   * Load database connection.
//   *
//   * @param callback
//   */
//  that.loadDatabase = function(callback) {
//
//  };
//
//  return that;
//};