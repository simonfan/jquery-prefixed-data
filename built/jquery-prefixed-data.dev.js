//     jquery-prefixed-data
//     (c) simonfan
//     jquery-prefixed-data is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module jquery-prefixed-data
 */

define('jquery-prefixed-data',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');


	/^prefix([A-Z$_].*$|$)/;

	/**
	 * Creates a Regular Expression to capture property name.
	 *
	 *
	 */
	function buildPrefixRegExp(prefix) {
		return new RegExp('^' + prefix + '([A-Z$_].*$)');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 */
	function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	/**
	 * Returns the string with the first letter to uppercase.
	 */
	function uppercaseFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}





	/**
	 *
	 * Removes the prefix from a given set of data.
	 *
	 *
	 */
	function parsePrefixedData(data, prefix) {

		// [1] build prefixRe RegExp
		var prefixRe = buildPrefixRegExp(prefix);

		// [2] loop through data properties
		return _.transform(data, function (results, value, key) {

			// [2.1] parse the key
			var parsedKey = key.match(prefixRe);
			// [2.2] if key matches the parser, it means it has archData
			if (parsedKey) {

				// [3] parsedKey is an array contanining
				//  0: the full key string
				//  1: the unprefixedKey name (may not be undefined)
				//
				// set results accordingly

				// [4] get unprefixedKey
				var unprefixedKey = lowercaseFirst(parsedKey[1]);

				// [5] set
				results[unprefixedKey] = value;

			} // else it is a common data attribute, so ignore

		});

	}


	var jqueryPrefixedData = module.exports = function jqueryPrefixedData(el, prefix) {


		var data = el.data();

		if (_.isArray(prefix)) {
			var results = {};

			_.each(prefix, function (p) {
				// get the data available for the prefix
				var prefixedData = parsePrefixedData(data, prefix);

				// ignore data that has no contents.
				if (_.size(prefixedData) > 0) {
					results[namespace] = prefixedData;
				}
			});

			return results;

		} else if (prefix && _.isString(prefix)) {

			// single prefix
			return parsePrefixedData(data, prefix);

		} else {
			// no prefix
			return data;
		}
	}




	$.prototype.prefixedData = function jqPrefixed(prefix) {
		return jqueryPrefixedData(this, prefix);
	};



});

