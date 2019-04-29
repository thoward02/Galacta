//express webserver

//Express
var express = require("express");
var app = express();

//Body Parse
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//File System
var fs = require("fs");

//Child proc
const { spawn } = require('child_process')
child = null;

app.use("/source/core", express.static("source/core"));
app.use("/source/core/Engine", express.static("/source/core/Engine"));
app.use("/source/core/Engine/Objects", express.static("/source/core/Engine/Objects"));
app.use("/source/core/Engine/scenes", express.static("/source/core/Engine/scenes"));

app.use("/source/core/Resources/Audio", express.static("/source/core/Resources/Audio"));
app.use("/source/core/Resources/CssSheets", express.static("/source/core/Resources/CssSheets"));
app.use("/source/core/Resources/Images", express.static("/source/core/Resources/Images"));

app.use("/source/core/api/Discord" , express.static("/source/core/api/Discord"));

app.get("/", function(request, response){
  //Sets up our home page, to grab all requests.
  fs.readFile("index.html", function(err, data){
    if(err) {
      console.log("error: "+String(err));
      response.end("error: "+String(err));
    }
    else {
      console.log("[-- Loading Main Page For User --]")
      response.end(data); //.end so that the pc stops
    }
  });

});


app.get("/source/api/isOnline.json", function(request, response){

  response.end('{ "online" : true}');

});


//Start app on port 80, local host
app.listen("80", "127.0.0.1", function(){

  console.log("[-- Started --]");


});
