var exec = require('child_process').exec;

exec("sed -i '$ s/.$//' public/json/test.json", function(error,stdout) {
  console.log(error,stdout);
  console.log("done");
});
