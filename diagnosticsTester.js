var diagnostics = require("./diagnostics");
var diagnoseProcedure = diagnostics.diagnose(function(result){
	console.dir(result);
	for (var index = 0; index< result.length; index++) {
		console.log(diagnostics.getError(result[index]));
	}
});
