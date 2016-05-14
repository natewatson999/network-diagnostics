var ntpClient = require('ntp-client');
var tests = {};
var ntpTester = function(url, callback){
	ntpClient.getNetworkTime( url, 123, function(err, date) {
		if (err) {
			callback(false);
			return;
		}
		callback(true);
		return;
	});
};

tests.haveNTP = ntpTester;
module.exports = exports = tests;
