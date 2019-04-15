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

/**
*  -- Pathing --
*  protocol://host/resources/models/q?=MODELNAME = PATH for calling a model, fbx format, MODELNAME == Modelfilename
*
*  protocol://host/ = Main Page
*
*  -- Commands --
*  app.get(PathOnServer, FunctionToBeRan(usersrequest, responsetobesent); // when ever the server gets a "GET" request, the server will check and see if the path declared before matches what you declared in your script
*
**/


//Host Play file
app.get("/Galacta", function(request, response){

  console.log("[ -- A User Started Playing -- ]");
  //This will let people play home in their browser C:
  fs.readFile("./index.html", function(err, data){
    if(err){
      console.log("[ -- User Incountered an err: "+ err +" -- ]");
      response.end(err);
    }else{
      response.end(data);
    }

  });
});



/**
*
* RESOURCE SECTION
*
**/

//For Loading Core System Files files from ./source
app.get("/source/core/q&=:file", function(request, response){
  //Fetch File
  var File = request.params.file;
  var FilePath = "./source/core/"+File;

  //Load File
  fs.readFile(FilePath, function(err, data){
    if(err){
      console.log("[ -- User hit Err: "+err+", While Loading "+ FilePath +"-- ]");
    }else{
      response.end(data);
    }
  });
});

//For loading Engine files
app.get("/source/core/Engine/q&=:file", function(request, response){
  //Fetch File
  var File = request.params.file;
  var FilePath = "./source/core/Engine/"+File;

  //Load File
  fs.readFile(FilePath, function(err, data){
    if(err){
      console.log("[ -- User hit Err: "+err+", While Loading "+ FilePath +"-- ]");
    }else{
      response.end(data);
    }
  });
});

app.get("/source/core/Engine/Objects/q&=:file", function(request, response){
  //Fetch File
  var File = request.params.file;
  var FilePath = "./source/core/Engine/Objects/"+File;

  //Load File
  fs.readFile(FilePath, function(err, data){
    if(err){
      console.log("[ -- User hit Err: "+err+", While Loading "+ FilePath +"-- ]");
    }else{
      response.end(data);
    }
  });
});



//Load Models

app.get("/resources/models/q&=:scene/q&=:model", function(request, response){
  //Set up Model Vars along with pathing
  var model = request.params.model;
  var scene = request.params.scene;
  var pathing = "./source/"+ String(scene) +"/models/"+ String(model) +".fbx";

  //Fetch File and return it
  fs.readFile(pathing, function(err, data){
    if(err){
      console.log(err);
      response.end("<html>"+err+"</html>");
    }else{
      response.end(data);
    }

  });
});


/**
*
* LOAD SCENES
*
**/

//Load Core Scene Files
app.get("/source/q&=:scene/q&=:file", function(request ,response){
  //Fetch File names
  var scene = request.params.scene;
  var file = request.params.file;

  //Load File
  fs.readFile("./source/"+ scene +"/"+ file +"", function(err, data){
    if(err){
      console.log("[ -- User hit Err: "+err+", While Loading "+ scene +"/"+  file  +"-- ]");
    }else{
      response.end(data);
    }
  });
});





//If req outside bounds stated here, return to home page
app.get("*", function(request, response){
  if(String(request.url) != "/favicon.ico"){
    //Chrome trys to get websites to include icons to represent their sites. Since the icon is accessed with an http req this function picks it up
    //Basically the if statements stops clutter in the server log
    console.log("[-- User Attempted To Load Unindexed Command : Unindexed Command = "+String(request.url)+" --]")
  }

  //Will catch any unindexed get requests
  response.redirect("/"); //return home
});

//Start app on port 80, local host
app.listen("2000", "127.0.0.1", function(){

  console.log("[-- Started --]");

});
