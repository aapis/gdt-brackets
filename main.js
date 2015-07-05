/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");


    // Github handler
    function Github() {
        alert('woop')
        console.log("registering github handler")
    }

    // Recompile handler
    function Recompile() {
        console.log("registering recompile handler")
    }

    // Run handler
    function Run() {
        console.log("registering run handler")
    }

    // Startup handler
    function Startup() {
        console.log("registering startup handler")
    }

    // Test handler
    function Test() {
        console.log("registering test handler")
    }


    // First, register a command - a UI-less object associating an id to a handler
    var CMD_PREFIX = "granify.dev-tools.";   // package-style naming to avoid collisions
    var command_ids = [
        "Github",
        "Recompile",
        "Run",
        "Startup",
        "Test"
    ];

    for(var i = 0; i < command_ids.length; i++){
        CommandManager.register(command_ids[i], CMD_PREFIX + command_ids[i], commands_ids[i]);
    }
    // CommandManager.register("Github", MY_COMMAND_ID, github);
    // CommandManager.register("Recompile", MY_COMMAND_ID, recompile);
    // CommandManager.register("Run", MY_COMMAND_ID, run);
    // CommandManager.register("Startup", MY_COMMAND_ID, startup);
    // CommandManager.register("Test", MY_COMMAND_ID, test);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(Menus.DIVIDER);

    for(var i = 0; i < command_ids.length; i++){
        menu.addMenuItem(CMD_PREFIX + command_ids[i]);
    }

    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});