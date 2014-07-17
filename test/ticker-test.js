'use strict';

var test = require('tap').test;
var Ticker = require('../lib/ticker').factory();

// Read all supported currencies as of now
var currencies = [ 'AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'JPY', 'KRW', 'MXN', 'MYR', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'USD', 'VUV', 'ZAR' ];

test('Read ticker', function(t){
  Ticker.ticker(currencies, function(err, results) {
    t.plan(5 * currencies.length + 1);
    t.equal(err, null, 'There should be no error');
    console.log(results);
    for (var currency in results) {
      var result = results[currency];
      t.notEqual(result, null, 'There should be a result');
      t.equal(result.error, undefined, 'The result should contain no error');
      t.equal(result.currency, currency, 'The result should be ' + currency);
      t.notEqual(result.rate, undefined, 'A rate should have been returned');
      t.ok(parseFloat(result.rate, 10), 'The rate should be a float');
    }
    t.end();
  });
});

currencies.forEach( function (currency) {

    test('Read ticker just '+currency, function(t){
	Ticker.ticker([currency], function(err, results) {
	    t.plan(5 + 1);
	    t.equal(err, null, 'There should be no error');
	    for (var currency in results) {
		var result = results[currency];
		t.notEqual(result, null, 'There should be a result');
		t.equal(result.error, undefined, 'The result should contain no error');
		t.equal(result.currency, currency, 'The result should be ' + currency);
		t.notEqual(result.rate, undefined, 'A rate should have been returned');
		t.ok(parseFloat(result.rate, 10), 'The rate should be a float');
	    }
	    t.end();
	});
    });
});

test('Read ticker with EUR, ILS', function(t){
  Ticker.ticker(['EUR', 'ILS'], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();
  });
});

test('Read ticker with just ILS', function(t){
  Ticker.ticker(['ILS'], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();
  });
});

test('Read ticker with USD, EUR, ILS', function(t){
  Ticker.ticker(['USD', 'EUR', 'ILS'], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();
  });
});

test('Read ticker with empty array', function(t){
  Ticker.ticker([], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();
  });
});
