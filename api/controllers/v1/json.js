/**
 * Json request controller.
 *
 * @param request
 * @param reply
 * @param config
 * @returns {{}}
 * @constructor
 */
function JsonController(request, reply, config) {
  var that = {};

  that.request = request;
  that.reply = reply;
  that.config = config;

  /**
   * Gets the value of a parameter passed via the URL.
   *
   * @param name
   * @returns {*}
   */
  that.getParam = function(name) {
    return that.request.params[name];
  };

  /**
   * Outputs the response with metadata.
   *
   * @param data
   * @param responseMeta
   * @returns {{statusCode: *}}
   */
  that.response = function(data, responseMeta) {
    var meta = responseMeta ? responseMeta : {};

    var meta = {
      statusCode: 200
    };

    //meta = _.defaults(meta, defaultMeta);

    var response = {
      statusCode: meta['statusCode']
    };

    if (meta.count != null) {
      response.count = meta.count;
    }

    if (meta.error != null) {
      response.error = meta.error;
    }

    if (meta['statusCode'] == 200) {
      response['response'] = data;
    }

    that.reply(response).code(meta['statusCode']);
  };

  return that;
}

module.exports = JsonController;