/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");

    var Helpers = {
        // run_cmd: function(cmd, args, cb, end) {
        //     var spawn = require('child_process').spawn,
        //         child = spawn(cmd, args),
        //         me = this;
        //     child.stdout.on('data', function (buffer) { cb(me, buffer) });
        //     child.stdout.on('end', end);
        // },
        derp: function(cmd, args){
            brackets.shellAPI.executeCommand(cmd)
        }
    }

    var Granify = {
        // Github handler
        Github: function(){
            Helpers.derp("whoami")
        },

        // Recompile handler
        Recompile: function(){
            console.log("registering recompile handler")
        },

        // Run handler
        Run: function(){
            console.log("registering run handler")
        },

        // Startup handler
        Startup: function(){
            console.log("registering startup handler")
        },

        // Test handler
        Test: function(){
            console.log("registering test handler")
        },
    };

    var CMD_PREFIX = "granify.dev-tools.";   // package-style naming to avoid collisions
    var command_ids = [
        "Github",
        "Recompile",
        "Run",
        "Startup",
        "Test"
    ];

    for(var i = 0; i < command_ids.length; i++){
        CommandManager.register(command_ids[i], CMD_PREFIX + command_ids[i], Granify[command_ids[i]]);
    }

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(Menus.DIVIDER);

    for(var i = 0; i < command_ids.length; i++){
        menu.addMenuItem(CMD_PREFIX + command_ids[i]);
    }
});