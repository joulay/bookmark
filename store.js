'use strict';

/* global */

// eslint-disable-next-line no-unused-vars

const store = (function() {
  const addBookmark = function(item) {
    this.list.push(item);
  };

  const deleteBookmark = function(id) {
    this.list.splice(id, 1);
  };
 
  const setRatingFilter = function(rating) {
    if(rating ==='none') {
      this.ratingFilter = null;
    } else {
      this.ratingFilter = rating;
    }
  };

  return {
    list: [],
    expanded: false,
    addBookmark,
    ratingFilter: null,
    deleteBookmark, 
    setRatingFilter
  };

}());