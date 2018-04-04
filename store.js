'use strict';

/* global */

// eslint-disable-next-line no-unused-vars

const store = (function() {
  const addBookmark = function(item) {
    this.list.push(item);
  };

 
  return {
    list: [],
    expanded: false,
    addBookmark
  };

}());