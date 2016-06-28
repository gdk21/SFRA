'use strict';

/**
 * Parse querystring into an object
 * @param {string} querystring - String representing querystring
 * @returns {Object} parsed querystring object
 */
function parseQueryString(querystring) {
    const result = {};
    let pair;
    let left;
    if (querystring && querystring.length > 0) {
        const qs = querystring.substring(querystring.indexOf('?') + 1).split('&');
        for (let i = qs.length - 1; i >= 0; i--) {
            pair = qs[i].split('=');
            left = decodeURIComponent(pair[0]);
            if (left.indexOf('dwvar_') === 0) {
                const variableParts = left.split('_');
                if (variableParts.length === 3) {
                    if (!result.variables) {
                        result.variables = {};
                    }
                    result.variables[variableParts[2]] = {
                        id: variableParts[1],
                        value: decodeURIComponent(pair[1])
                    };
                    continue;
                }
            }
            result[left] = decodeURIComponent(pair[1]);
        }
    }
    return result;
}

/**
 * Translates global request object to local one
 * @param {Object} request - Global request object
 * @returns {Object} local instance of request object
 */
function Request(request) {
    this.httpMethod = request.httpMethod;
    this.host = request.httpHost;
    this.path = request.httpPath;
    this.querystring = parseQueryString(request.httpQueryString);
    this.https = request.isHttpSecure();
    this.locale = request.locale;
}

module.exports = Request;
