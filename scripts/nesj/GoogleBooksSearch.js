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
   "dijit/_WidgetsInTemplateMixin",

   "nesj/BookDetails",

   "dojo/text!./templates/GoogleBooksSearch.html"
],
   function (declare, array, domConstruct, on, Button, ValidationTextBox, WidgetBase, TemplatedMixin, _WidgetsInTemplateMixin, BookDetails, template) {
      return declare("nesj/GoogleBooksSearch", [WidgetBase, TemplatedMixin, _WidgetsInTemplateMixin], {

         templateString:template,

         constructor:function () {
            this.searchParams = {
               //fields to return. return full information by default.
               fields:"items(volumeInfo/title, volumeInfo/authors,volumeInfo/publishedDate, volumeInfo/description, volumeInfo/imageLinks/thumbnail)",
               //maximum number of results to return. 10 by default
               maxResults:15,
               //sorting method. "relevance" by default
               orderBy:"newest"
            };
         },

         postCreate:function () {
            this.inherited(arguments);

            //specify the query parameters
            //visit https://developers.google.com/books/docs/v1/using for more information of available query parameters
            var _this = this;

            this.client.load('books', 'v1', function (data) {
               //specify your API key
               _this.client.setApiKey("AIzaSyBm-c2BCCQAjaG4jnx9MaQ0kuT0n0P7NFI");
            });

            //connect event with the search button
            on(this.searchBtn, "click", function () {
               var keywords = _this.searchBox.get("value");
               _this._searchBooks(keywords);
            });

         },

         /**
          * Search for books with user entered keywords
          * @param keywords
          * @private
          */
         _searchBooks:function (keywords) {
            var _this = this,
               params = this.searchParams,
               restRequest = this.client.request({
                  //specify the query request
                  path:"/books/v1/volumes?q=" + keywords + "&fields=" + params.fields + "&maxResults=" + params.maxResults + "&orderBy=" + params.orderBy
               });

            //sent the request
            restRequest.execute(function (resp) {
               _this._displayBooks(resp);
            });
         },

         /**
          * Display information of the books matching the search criteria
          * @private
          */
         _displayBooks:function __displayBooks(resp) {
            var _this = this,
               book,
               bookDetails;

            domConstruct.empty(_this.booksDiv);

            array.forEach(resp.items, function (item) {
               book = item.volumeInfo;
               bookDetails = new BookDetails({
                  imageLink: book.imageLinks.thumbnail || "",
                  title: book.title || "N/A",
                  authors: book.authors && book.authors.toString(", ") || "N/A",
                  pubDate: book.publishedDate || "N/A",
                  description: book.description ||"N/A"
               });
               domConstruct.place(bookDetails.domNode, _this.booksDiv, "last");
            });

         }

      });
   });