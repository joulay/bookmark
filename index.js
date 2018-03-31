'use strict';

/* global $, bookmarkList */

$(document).ready(function() {
  console.log(bookmarkList);
  bookmarkList.bindEventListeners();
  bookmarkList.render();
});