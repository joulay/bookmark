'use strict';
/* global $, api, store, cuid */

//eslint -disable-next-line no-unused-vars
const bookmarkList = (function(){
  function generateBookmarkIntoString(bookmarkArray) {
    const bookmarks = bookmarkArray.map((bookmark) => generateBookmark(bookmark));
    return bookmarks.join('');
  }

  function render() { //be involved with getting stuff on screen
    //works immediately to work with w/e there by default
    console.log('rendering');
    api.getBookmark((bookmarks) => {
      store.list = bookmarks;
      $('.output').html(generateBookmarkIntoString(bookmarks));
      console.log(bookmarks);
    });
  }

  function generateBookmark(bookmark) {
    return `
    <li class="bookmark-list" data-bookmark-id="${bookmark.id}">
        <h3 class="item-title">${bookmark.title}</h3>
        <div class="item">
          <p class="bookmark-descr hidden">${bookmark.desc}</p>
          <div class="item-info">
          <a href="${bookmark.url}" target="_blank" class="bookmark-url">
          Go To Site</a>
          <p class="rating">${bookmark.rating}</p>
        </div>
        <div class="bookmark-item-controls">
          <button class="bookmark-toggle" id="details-toggle" data-bookmark-id="${bookmark.id}">details</button>
          <button class="bookmark-delete" id="details-delete" data-bookmark-id="${bookmark.id}">delete</button>
        </div>
    </li>`;
  }

  function handleNewBookmark(){
    $('.search').on('submit', function(event) {
      event.preventDefault();
      const newBookmark = {
        title: $('#title').val(),
        desc: $('#description').val(),
        rating: $('input[name=rating]:checked').val(),
        url: $('#url').val(),
        // id: cuid(),
      };
      $('#title').val('');
      $('#description').val('');
      $('input[name=Choose]').attr('checked',false);
      $('#url').val('');
    
      api.createBookmark(newBookmark, function(data) {
        console.log(data);
        store.addBookmark(data); 
      });
      // .fail(renderError);
    });
  }


  function bindEventListeners() {
    handleNewBookmark();
  }

  return {
    render,
    bindEventListeners,
    generateBookmark
  };
}());