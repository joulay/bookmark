'use strict';
/* global $ */


const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jules';

  const getBookmark = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback); 
  };
  const createBookmark = function(bookmarkData, callback) {
    const newEntry = JSON.stringify(bookmarkData);
    console.log(newEntry);
    return $.ajax({
      'url': BASE_URL + '/bookmarks',
      'method': 'POST',
      'contentType': 'application/json',
      'data': newEntry,
      'success': callback,
    });
  };

  return {
    getBookmark,
    createBookmark
  }; 
  

}());


