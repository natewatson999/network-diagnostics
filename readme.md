#network-diagnostics
Network-diagnostics provides a library for diagnosing network problems.

This module, network-diagnostics , is published under the MIT license. It is written by Nate Watson and Oluwafunmiwo Juda Sholola. Copyright 2015.

## Installation Instructions

### Local Installation

0. Goto the directory that the module is requred in: "cd *directory*".

1. Run this instruction:

```
npm install network-diagnostics
```

2. Verify the installation

### Global Installation

0. Ensure you have the right to perform global module installations.

1. Run this instruction:

```
npm install -g network-diagnostics
```

2. Verify the installation

### Installation Verification

0. Navigate to the directory of installation.

1. Run this instruction:

```
node diagnosticsTester.js
```

2. It should print an array of numbers and a list of strings. If it does this, the installation ran smoothly. If this does not happen, reinstall.

## Example

```
var diagnostics = require("./diagnostics");
var diagnoseProcedure = diagnostics.diagnose(function(result){
	console.dir(result);
	for (var index = 0; index< result.length; index++) {
		console.log(diagnostics.getError(result[index]));
	}
});
```

## Features

network-diagnostics provides the following features:

* Individual tests for several specific network problems, such as a lack of IPv6.
* A consolidated method which performs the most common tests, and gives an array of error codes.
* A method that takes an error code, and returns what it means.

## Individual Tests
### TestURL

network-diagnostics provides two functions for changing the URL that HTTP is tested with. By default, the URL that is used for network tests is "google.com".

```
var result = diagnostics.getTestURL(); /*result would be "google.com"*/
```

```
diagnostics.setTestURL("yahoo.com");
```

### diagnostics.haveIPv4 and haveIPv4Async
This function returns a boolean value which states if an IPv4 connection is usable, not counting the one for localhost.
```
if (diagnostics.haveIPv4() == false) {
	console.log("We have a problem.");
}
diagnostics.haveIPv4Async(function(result){
	if (result==false) {
		console.log("Somone go press that button on the router!");
	}
});
```

### diagnostics.haveIPv6 and haveIPv6Async
This function returns a boolean value which states if an IPv6 connection is usable, not counting the one for localhost.
```
if (diagnostics.haveIPv6() == false) {
	console.log("We have a bad network.");
}
diagnostics.haveIPv6Async(function(result){
	if (result==true) {
		console.log("Yay! We can comply with standards from the 90s!");
	}
});
```

### diagnostics.haveConnection and diagnostics.haveConnectionAsync
This function returns a boolean value which states if an IP connection of any type is usable, not counting the one for localhost.
```
if (diagnostics.haveConnection() == false) {
	console.log("This is all there is. The outside world is a myth.");
}

diagnostics.haveConnectionAsync(function(result){
	if (result == true) {
		console.log("There's a whole world out there!");
	} else {
		console.log("This is all there is. The outside world is a myth.");
	}
});
```

### diagnostics.haveDNS
This function returns a boolean value which states if it's possible to perform non-cached DNS lookups.
```
var checkDNS = diagnostics.haveDNS(function(result){
	if (result == false) {
		console.log("Start memorizing numbers. DNS isn't working.");
	}
});
```

### diagnostics.haveHTTP
This function returns a boolean value which states if it's possible to perform non-cached HTTP requests.
```
var checkHTTP = diagnostics.haveHTTP(function(result){
	if (result == false) {
		console.log("Don't worry, stackoverflow uses https, not http.");
	}
});
```

### diagnostics.haveHTTPS
This function returns a boolean value which states if it's possible to perform non-cached HTTP requests.
```
var checkHTTPS = diagnostics.haveHTTPS(function(result){
	if (result == false) {
		console.log("Uh oh. Without HTTPS, we can't get to stackoverflow to solve the problem we just found!");
	}
});
```
### diagnostics.havePing
This function returns a boolean value which states if ping is usable. Uses a callback function.
```
var checkPing = diagnostics.havePing(function(result){
	if (result == true) {
		console.log("ping works");
	} else {
		console.log("ping does not work");
	}
});
```

### diagnostics.haveInsecureImap and diagnostics.haveSecureImap
These functions check if IMAP is usable, with and without security. Callback based. Note: These functions are not in the standard test procedure, because they need accounts. Because they need accounts, you should probably have a dedicated diagnostics account which has almost no rights, since this can result in leaked passwords.

```
var config = {
	user: "jeremie@gmail.com",
	password: "jerlita",
	host: "imap.gmail.com",
};
var checkInsecureImap = diagnostics.haveInsecureImap(config, function(result) {
	if (result == true) {
		console.log("insecure imap works");
	} else {
		console.log("insecure imap does not work");
	}
});
var checkSecureImap = diagnostics.haveSecureImap(config, function(result) {
	if (result == true) {
		console.log("secure imap works");
	} else {
		console.log("secure imap does not work");
	}
});
```

#### config specification
* user: Mandatory, account name.
* password: default is "".
* host: default is "localhost".
* port: default is 143 or 993 depending on the enabling of security.

### diagnostics.haveInsecurePop and diagnostics.haveSecurePop
These functions check if Pop3 is usable, with and without security. Callback based. Note: These functions are not in the standard test procedure, because of design consistency. 
```
var dealWithResult = function(result) {
	if (result == true) {
		console.log("This configuration is usable!");
	} else {
		console.log("This configuration is not usable! I'm going to blame comcast, even if that doesn't make sense!");
	}
};
var host = "pop.yahoo.com"; /*I just came up with this, I don't think it's real, don't use it.*/
diagnostics.haveSecurePop(dealWithResult, host);
diagnostics.haveInsecurePop(dealWithResult, host);
```

Note: if host is not defined, "pop.google.com" will be used. 

### diagnostics.haveNTP
This function takes a (URL or IP address) and a callback, and checks to see if an NTP connection is available from the address in question. "Thank you @moonpyk for porting the client to Node!". This function is not in the standard test procedure, because it requires input.
```
diagnostics.haveNTP("pool.ntp.org", function(result){
	if (result==true) {
		console.log("NTP is available from here.");
	} else {
		console.log("NTP is not available from here.");
	}
	return;
});
```

## Standardized Test
This function performs every network test in the script that does not require any complex input from the user. Tests that require complex input must be run explicitly. It then returns the results as a number array in a callback function.

```
var diagnoseProcedure = diagnostics.diagnose(function(result){
	console.dir(result);
	for (var index = 0; index< result.length; index++) {
		console.log(diagnostics.getError(result[index]));
	}
});
```

## Error Code Lookups
diagnostics.getError is a function takes a numerical error code, and returns a string that relates to it.

```
console.log(diagnostics.getError(80)); /*NoHTTPconnection*/
```

As a general rule, every error code is the default port of the protocol that was tested, with a few logical exceptions. These are the codes which the function will actually evaluate:

| Num | Error                      |
|-----|----------------------------|
| 0   | "NormalNetworkActivity"    |
| 1   | "NoConnection"             |
| 4   | "NoIPv4Connection"         |
| 6   | "NoIPv6Connection"         |
| 7   | "DiagnosticsScriptFailure" |
| 8   | "PingNotUsable"            |
| 53  | "NoDNS"                    |
| 80  | "NoHTTPconnection"         |
| 110 | "NoInsecurePOP3"           |
| 123 | "NoNTP"                    |
| 143 | "NoInsecureIMAP"           |
| 443 | "NoHTTPSconnection"        |
| 993 | "NoSecureIMAP"             |
| 995 | "NoSecurePOP3"             |

These error codes are going to be used in the future when tests are written for them. Until that point, they are not directly usable.

| Num | Error                 |
|-----|-----------------------|
| 20  | "FTPFailure"          |
| 22  | "SSHfailure"          |
| 23  | "TelnetFailure"       |
| 25  | "SMTPfailure"         |
| 37  | "TimeProtocolFailure" |
| 70  | "NoGopher"            |
| 81  | "NoTor"               |
| 88  | "NoKerberos"          |
| 161 | "NoSNMP"              |
| 194 | "NoIRC"               |
| 5222| "NoXMPP"              |
