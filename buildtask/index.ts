import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import mod = require('./badgeCreator');

async function run() {
    try {
        var name = tl.getInput("nameString");
        var version = tl.getInput("versionString");
        var destinationPath = tl.getPathInput("destinationPath", true);

        var color = tl.getInput("color");
        var style = tl.getInput("style");
        var appendDate = tl.getBoolInput("appendDate");
        var proxy = tl.getInput("proxyUrl");

         mod.createBadge(name, version, destinationPath, color, style, proxy, appendDate);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();