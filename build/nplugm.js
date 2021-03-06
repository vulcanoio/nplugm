
/*
The MIT License

Copyright (c) 2015 Resin.io, Inc. https://resin.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

/**
 * @module nplugm
 */
var resolver, _;

_ = require('lodash');

resolver = require('./resolver');


/**
 * @summary List matching installed plugins
 * @function
 * @public
 *
 * @description
 * If `regex` is a `String`, it will match all the plugins that start with it.
 *
 * @param {(RegExp|String)} [regex=\/.*\/] - plugin matcher
 * @returns {Promise<String[]>} plugins
 *
 * @example
 * nplugm.list(/^my-plugin-(\w+)$/).map (plugin) ->
 * 	import = require(plugin)
 * 	console.log("Registering: #{plugin}")
 */

exports.list = function(regex) {
  if (regex == null) {
    regex = /.*/;
  }
  if (_.isString(regex)) {
    regex = new RegExp("^" + regex + "(.*)$");
  }
  return resolver.lookup().filter(function(plugin) {
    return regex.test(plugin);
  });
};
