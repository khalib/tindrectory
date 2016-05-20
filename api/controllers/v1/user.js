var async = require('async');
var JsonController = require('./json');
var User = require('../../models/v1/user');

function UserController(request, reply, config) {
  var that = new JsonController(request, reply, config);

  /**
   * Get a list of users.
   */
  that.list = function() {
    var options = {};
    User.getUsers({}, function(err, users) {
      that.response(users);
    });
  };


  /**
   * Get a user by id.
   */
  that.get = function() {
    var id = that.getParam('id');

    User.getUsers({ _id: id }, function(err, users) {
      that.response(users);
    });
  };

  /**
   * Save user data.
   */
  that.put = function() {
    console.log('put()');
    var data = that.request.payload;

    User.updateOrCreate(data, function(err, user) {
      console.log(user);
      that.response({success: true});
    });
  };

  /**
   * Save user data in bulk.
   */
  that.bulkPut = function() {
    console.log('bulkPut()');
    var data = that.request.payload;

    async.each(data, function(user, callback) {
      User.updateOrCreate(user, function(err, user) {
        callback(err);
      });
    }, function(err) {
      that.response({ success: true });
    });
  };

  /**
   * User search.
   */
  that.search = function() {
    console.log('search()');

    var q = that.getParam('q');
    User.search(q, function(err, results) {
      that.response(results);
    });
  };

  /**
   * User delete.
   */
  that.delete = function() {
    console.log('delete()');

    var data = that.request.payload;

    User.delete(data.id, function(err, results) {
      that.response(results);
    });
  };

  return that;
}

module.exports = UserController;