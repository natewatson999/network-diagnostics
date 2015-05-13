var imap = require("imap-simple");
var test = function(useTLS, config, callback) {
	var internalConfig = {};
	if (!config.user) {
		throw "NoUser";
	}
	internalConfig.user = config.user;
	internalConfig.password = "";
	if (config.password) {
		internalConfig.password = config.password;
	}
	internalConfig.tls = false;
	internalConfig.port = 143;
	if (useTLS == true) {
		internalConfig.tls = true;
		internalConfig.port = 993;
	}
	if (config.port) {
		internalConfig.port = config.port;
	}
	internalConfig.host = "localhost";
	if (config.host) {
		internalConfig.host = config.host;
	}
	internalConfig.authTimeout = 10000;
	imap.connect(config, function(err, connection) {
		if (err) {
			callback(false);
		} else {
			callback(true);
			connection.end();
		}
		return;
	});
	return;
};
var SecureImapWorks = function(config, callback) {
	test(true, config, callback);
	return;
};
var InsecureImapWorks = function(config, callback) {
	test(false, config, callback);
	return;
};

var output = {};
output.secureImapWorks = SecureImapWorks;
output.insecureImapWorks = InsecureImapWorks;
module.exports = exports = output;