/**
 *
 * User: Ying
 * Date: 7/9/11
 */

//provide: specify module name
dojo.provide("yz.Main");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dijit.form.TextBox");
//dojo.require("dijit._TemplatedMixin");
//dojo.require("dijit._WidgetsInTemplateMixin");

dojo.declare("yz.Main", [dijit._Widget, dijit._Templated], {

    constructor: function() {
        console.log("Main constructor ", arguments);
    },

    title: '',
    message:'',

    templatePath: dojo.moduleUrl("yz", "../../templates/simple.html"),

    startup: function () {
        this.title.innerHTML = "Simple Template";
        this.message.innerHTML = "Welcome to the demo code for <a  href='http://www.nesj.net'>NESJ</a>.";
        console.log(this.message.innerHTML);
    }

});
