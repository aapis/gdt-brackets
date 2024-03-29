/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */

(function () {
    "use strict";
    
    //var os = require("os");
    var Cli         = require("./cli");
        
    /**
     * @private
     * Handler function for the simple.getMemory command.
     * @param {boolean} total If true, return total memory; if false, return free memory only.
     * @return {number} The amount of memory.
     */
    function cmdGetMemory(total) {
        if (total) {
            return os.totalmem();
        } else {
            return os.freemem();
        }
    }

    function cmdExecCommand(cmd, args, cb) {
        if(!cmd){
            cmd = 'whoami'
        }

        Cli.execCommand(cmd, args, cb);
    }
    
    /**
     * Initializes the test domain with several test commands.
     * @param {DomainManager} domainManager The DomainManager for the server
     */
    function init(domainManager) {
        if (!domainManager.hasDomain("simple")) {
            domainManager.registerDomain("simple", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "simple",       // domain name
            "getMemory",    // command name
            cmdGetMemory,   // command handler function
            false,          // this command is synchronous in Node
            "Returns the total or free memory on the user's system in bytes",
            [{name: "total", // parameters
                type: "string",
                description: "True to return total memory, false to return free memory"}],
            [{name: "memory", // return values
                type: "number",
                description: "amount of memory in bytes"}]
        );

        domainManager.registerCommand(
            "simple",       // domain name
            "execCommand",    // command name
            cmdExecCommand,   // command handler function
            true,          // this command is NOT synchronous in Node
            "Returns the total or free memory on the user's system in bytes",
            [{name: "total", // parameters
                type: "string",
                description: "True to return total memory, false to return free memory"}],
            [{name: "memory", // return values
                type: "number",
                description: "amount of memory in bytes"}]
        );
    }
    
    exports.init = init;
    
}());