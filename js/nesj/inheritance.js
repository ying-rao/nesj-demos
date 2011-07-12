/**
 * Sample code to demo inheritance
 * User: Ying
 * Date: 7/10/11
 */

//provide: specify module name
dojo.provide("yz.Test");
dojo.require("dojo.parser");


dojo.declare("Test", [dijit._Templated], {
    constructor: function() {
        console.log("Test constructor ", arguments);
    },
    other: function() {
        console.log("Test other", arguments);
    }
});

dojo.declare("JsTest", [Test,dijit._Templated], {
    constructor: function() {
        console.log("JsTest constructor ", arguments);
    },
    other: function() {
        this.inherited(arguments);
        console.log("JsTest other", arguments);
    }

});

/*

Output in the console:

Test constructor ["one", "two"]
Test other ["three"]
Test constructor ["four", "five"]
JsTest constructor ["four", "five"]
Test other ["six"]
JsTest other ["six"]

*/
