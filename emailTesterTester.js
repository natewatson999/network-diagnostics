var diagnostics = require("./diagnostics.js");
var readline = require("readline");
var io = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var imapConfig = {};
io.question("imap user\n", function(answer){
	imapConfig.user = answer;
	console.log(answer);
	io.question("imap password\n", function(password){
		imapConfig.password = password;
		console.log(password);
		io.question("imap host\n", function(host){
			imapConfig.host = host;
			console.log(host);
			var resultSection = function(result){
				if (result == true) {
					console.log("imap works");
				} else {
					console.log("imap does not work");
				}
			};
			diagnostics.haveInsecureImap(imapConfig, resultSection);
			diagnostics.haveSecureImap(imapConfig, resultSection);
		});
	});
});
