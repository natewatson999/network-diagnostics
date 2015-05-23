var imap = require("imap-simple");
var pop3 = require("poplib");
var IMAPtest = function(useTLS, config, callback) {
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
	IMAPtest(true, config, callback);
	return;
};
var InsecureImapWorks = function(config, callback) {
	IMAPtest(false, config, callback);
	return;
};
var defaultPopURL = "pop.gmail.com";
var popTest = function(useSecurity, server, callback) {
	var port = 110;
	if (useSecurity == true) {
		port = 995;
	}
	var fired = false;
	var client = new pop3(port, server, {
		tlserrs: false,
		enabletls: useSecurity,
		debug: false
	});
	client.on("connect", function(){
		if (fired==false) {
			fired = true;
			client.quit();
			callback(true);
		}
	});
	var fail = function(screwUp) {
		if (fired==false) {
			fired = true;
			callback(false);
		}
	};
	client.on("error", fail);
	client.on("invalid-state", fail);
	client.on("locked", fail);
	return;
};
var insecurePopTest = function(callback, url) {
	var internalURL = defaultPopURL;
	if (url) {
		internalURL = url;
	}
	popTest(false, internalURL, callback);
	return;
};
var securePopTest = function(callback, url) {
	var internalURL = defaultPopURL;
	if (url) {
		internalURL = url;
	}
	popTest(true, internalURL, callback);
	return;
};
var output = {};
output.SecureImapWorks = SecureImapWorks;
output.InsecureImapWorks = InsecureImapWorks;
output.insecurePopTest = insecurePopTest;
output.securePopTest = securePopTest;
module.exports = exports = output;