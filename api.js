'use strict';
/* global $ */


const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jules';

  const getBookmark = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback); 
  };
  const createBookmark = function(title, callback) {
    const newEntry = JSON.stringify(title);
    return $.ajax({
      'url': BASE_URL + '/bookmarks',
      'method': 'POST',
      'contentType': 'application/json',
      'data': newEntry,
      'success': callback
    });
  };

  return {
    getBookmark,
    createBookmark
  }; 
  

}());