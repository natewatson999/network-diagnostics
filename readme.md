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

### diagnostics.haveIPv4
This function returns a boolean value which states if an IPv4 connection is usable, not counting the one for localhost.
```
if (diagnostics.haveIPv4() == false) {
	console.log("We have a problem.");
}
```

### diagnostics.haveIPv6
This function returns a boolean value which states if an IPv6 connection is usable, not counting the one for localhost.
```
if (diagnostics.haveIPv6() == false) {
	console.log("We have a bad network.");
}
```

### diagnostics.haveConnection
This function returns a boolean value which states if an IP connection of any type is usable, not counting the one for localhost.
```
if (diagnostics.haveConnection() == false) {
	console.log("This is all there is. The outside world is a myth.");
}
```

### diagnostics.haveDNS
This function returns a boolean value which states if it's possible to perform non-cached DNS lookups.
```
if (diagnostics.haveDNS() == false) {
	console.log("Start memorizing numbers. DNS isn't working.");
}
```

### diagnostics.haveHTTP
This function returns a boolean value which states if it's possible to perform non-cached HTTP requests.
```
if (diagnostics.haveHTTP() == false) {
	console.log("Don't worry, stackoverflow uses https, not http.");
}
```

### diagnostics.haveHTTPS
This function returns a boolean value which states if it's possible to perform non-cached HTTP requests.
```
if (diagnostics.haveHTTPS() == false) {
	console.log("Uh oh. Without HTTPS, we can't get to stackoverflow to solve the problem we just found!");
}
```

##Standardized Test
##Error Code Lookups
