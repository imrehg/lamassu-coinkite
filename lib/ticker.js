'use strict';

var request = require('request');

var CoinkiteAPIURL = "https://api.coinkite.com/"

var CoinkiteTicker = function () {

};

CoinkiteTicker.factory = function factory() {
    return new CoinkiteTicker();
};

CoinkiteTicker.prototype.ticker = function ticker(currencies, callback) {
    if (currencies.length === 0) {
	return callback(new Error('No currencies were requested.'));
    }

    var requestOptions = {
	url: CoinkiteAPIURL + 'public/rates',
	headers: {
            'User-Agent': 'lamassu-coinkite'
	}
    }

    request(requestOptions, function (error, response, body) {
	if (error) {
	    return callback(error);
	}
	try {
	    var responseJSON = JSON.parse(body);
	} catch(e) {
	    return callback(new Error('Can\'t parse response data.'));
	}
	try {
	    var rates = responseJSON.rates.BTC;
	} catch(e) {
	    return callback(new Error('Can\'t find required part of response data.'));
	}

	var tickerData = {}
	for (var i=0; i < currencies.length; i++) {
	    var currency = currencies[i];
	    if (currency in rates) {
		tickerData[currency] = { 'currency': currency, 'rate': rates[currency].rate };
	    } else {
		return callback(new Error('Unsupported currency requested: '+currency));
	    }
	}
	callback(null, tickerData);
    });
};

module.exports = CoinkiteTicker;
