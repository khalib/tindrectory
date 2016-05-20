var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: false
  }
});

/**
 * Gets a list of users.
 *
 * @param options
 * @param callback
 */
userSchema.statics.getUsers = function(query, options, callback) {
  this.find(query, options, function(err, res) {
    callback(err, res)
  });
};

/**
 * Saves user data.
 *
 * @param options
 * @param callback
 */
userSchema.statics.updateOrCreate = function(data, callback) {
  var options = {};
  var userSave = this();

  // If ID exists update, otherwise save.
  if (data.id) {
    // Fetch user.
    this.findOne({ _id: id }, function(err, user) {
      userSave = user
    });
  }

  // Map the data to the model fields.
  userSave.firstName = data.firstName;
  userSave.lastName = data.lastName;
  userSave.title = data.title;
  userSave.image = data.image;
  userSave.department = data.department;
  userSave.description = data.description;
  userSave.keywords = data.keywords;

  userSave.save(function(err, userSave) {
    console.log(userSave);
    callback();
  });
};

/**
 * Deletes user.
 *
 * @param options
 * @param callback
 */
userSchema.statics.delete = function(id, callback) {
  this.remove({ _id: id }, function(err) {
    callback(err);
  });
};

/**
 * Mongoose JS search query wrapper to incorporate filters/conditions passed via query parameters.
 */
userSchema.statics.search = function(q, callback) {
  // Merge the conditions with the search query.
  //var conditionsMerged = _.extend(conditions, { $text: { $search: q } });
  //options.fields['score'] = { $meta: 'textScore' };
  //options.sort = _.extend(options.sort, { score: { $meta: 'textScore' } });

  var query = q == 'all' ? {} : { $text: { $search: q } };

  this.find(query, function(err, results, count) {
    callback(err, results, count);
  });
};

module.exports = mongoose.model('User', userSchema);