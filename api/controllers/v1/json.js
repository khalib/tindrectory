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
   * Gets the value of a query string parameter.
   *
   * @param name
   * @param value
   * @param type
   * @returns {*}
   */
  that.getQuery = function(name, value, type) {
    var param = that.request.query[name];

    if (param) {
      // Handle type specified cases.
      switch (type) {
        case 'boolean':
          if (param.toLowerCase() == 'true') {
            value = true;
          } else if (param.toLowerCase() == 'false') {
            value = false;
          }
          break;

        case 'array':
          value = param.split(/[\s,]+/);
          break;

        case 'number':
          if (!isNaN(param)) {
            value = parseFloat(param);
          } else {
            value = -1;
          }
          break;

        default:
          value = param;
          break;
      }
    }

    return value;
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