/**
 * Author: Ying Zuo
 * Date: 12/26/2012
 */

define([
   "dojo/_base/declare",
   "dojo/_base/array",
   "dojo/dom-construct",
   "dojo/on",
   "dijit/form/Button",
   "dijit/form/ValidationTextBox",

   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",

   "dojo/text!./templates/BookDetails.html"
],
   function (declare, array, domConstruct, on, Button, ValidationTextBox, WidgetBase, TemplatedMixin, template) {
      return declare("nesj/BookDetails", [WidgetBase, TemplatedMixin], {

         templateString:template

   });

});