import tl = require('vsts-task-lib/task');
import fs = require('fs');
import path = require('path');
import request = require('request');

export function createBadge(name : string, version:string, destinationPath:string,  color:string, style:string, proxy:string) {
    
    name = name.replace("-", "--").replace("_", "__");
    version = version.replace("-", "--").replace("_", "__");
    
    console.log("File Destination: "+destinationPath);
    ensureDirectoryExistence(destinationPath);
    var file = fs.createWriteStream(destinationPath);
    
    console.log("Destination path: "+file.path);
    var url = "https://img.shields.io/badge/"+name+"-"+version+"-"+color+".svg?style="+style;


    console.log("Downloading File: "+url);
   
        var options:request.UrlOptions = {
            url: url,
        };

        if(proxy != ""){
            options.proxy = proxy;
        }


    request.get(options)
    .on("error", (err) => {
        console.error(err);
        tl.setResult(tl.TaskResult.Failed, "Failed to download badge. Maybe you are behind a proxy and proxy settings must be provided.");        
    })
    .pipe(file);

}


function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}