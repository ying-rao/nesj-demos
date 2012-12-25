/**
 * Author: Ying Zuo
 * Date: 2/11/12
 */

define([
   "dojo/_base/declare",
   "dojo/_base/array",
   "dojo/_base/lang",
   "dojo/dom-construct",
   "dojo/json",
   "dojo/request/script",
   "dojo/on",
   "dijit/form/TextBox",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/WeatherForecast.html"
],
function(declare, array, lang, domConstruct, json, script, on, TextBox, WidgetBase, TemplatedMixin, template){
return declare("nesj/WeatherForecast", [WidgetBase, TemplatedMixin],{
   templateString: template,

   postCreate: function () {
      this.inherited(arguments);
      this.drawTable();
      this.addEventListeners();

   },

   drawTable: function (zipCode) {

      if (!zipCode || zipCode.trim().length === 0){
         var query = "http://api.wunderground.com/api/a5ce5afd89d8f85a/geolookup/forecast10day/q/CA/San_Jose.json";
      }
      else{
         var query = "http://api.wunderground.com/api/a5ce5afd89d8f85a/geolookup/forecast10day/q/" + zipCode + ".json";
      }
      script.get(query, {
      }).then(lang.hitch(this, function(data){
         if(data){
            var response = json.stringify(data);
            console.log(response);
            this.city.innerHTML = response.location.city;

            var tr = domConstruct.create("tr", {id:"titleRow"}), tr1 = domConstruct.create("tr", {id:"iconRow"}),tr2 = domConstruct.create("tr", {id:"textRow"}),tr3 = domConstruct.create("tr", {id:"temperatureRow"});

            array.forEach(response.forecast.simpleforecast.forecastday, lang.hitch(this, function (entry, index) {
               domConstruct.create("td", {innerHTML:entry.date.weekday}, tr);

               var td = domConstruct.create('td', tr1);
               var img = domConstruct.create('img', {src:entry.icon_url}, td);

               domConstruct.create("td", {innerHTML:entry.conditions}, tr2);
               var temperature = "H: " + entry.high.fahrenheit + "&#8457; <br/>L: " + entry.low.fahrenheit + "&#8457;";
               domConstruct.create("td", {innerHTML:temperature}, tr3);
            }));

            this.reportTable.appendChild(tr);
            this.reportTable.appendChild(tr1);
            this.reportTable.appendChild(tr2);
            this.reportTable.appendChild(tr3);
         }
         }),
         lang.hitch(this, function (response) {
            this.errorMesg.style.display = "inline-block";
         }));

      console.log("call made");
   },

   addEventListeners: function () {
      this.hoverHandle = on(this.changeCity, "onmouseover", function (event) {
         this.changeCity.style.color = "#ee4115";
      });
      this.hoverOutHandle = on(this.changeCity, "onmouseleave", function (event) {
         this.changeCity.style.color = "#000";
      });
      this.changeCityHandle = on(this.changeCity, "onclick", function (event) {
         this.changeCity.style.display = "none";
         this.changeCityDiv.style.display = "inline-block";

      });
      this.clickHandle = on(this.changeCityIcon, "onclick", function (event) {
         this.updateReport(this.cityName.value);
      });
      this.cancelHandle = on(this.cancelIcon, "onclick", function (event) {
         this.changeCity.style.display = "inline-block";
         this.changeCityDiv.style.display = "none";
      });

   },

   removeEventListeners: function () {
      this.hoverHandle.remove();
      this.hoverOutHandle.remove();
      this.clickHandle.remove();
      this.changeCityHandle.remove();
      this.cancelHandle.remove();
   },

   updateReport: function (zipCode) {
      this.errorMesg.style.display = "none";
      domConstruct.empty(this.reportTable);
      this.drawTable(zipCode);
   },

   destroy: function () {
      this.removeEventListeners();
      this.inherited(arguments);
   }
});
});