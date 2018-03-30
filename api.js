'use strict';
/* global $ */


const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jules';

  const getBookmark = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);  
  };

  return {
    getBookmark,

  }; 
  

}());