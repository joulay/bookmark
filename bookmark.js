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
    api.getBookmark((bookmarks) => {
      store.list = bookmarks;
      $('.output').html(generateBookmarkIntoString(bookmarks));
      // bindEventListeners();
    });

  }

  function generateBookmark(bookmark) {
    return `
    <li class="bookmark-list" id="bookmark-item-${bookmark.id}" data-bookmark-id="${bookmark.id}">
        <h3 class="item-title">${bookmark.title}</h3>
        <div class="item">
          <p class="bookmark-descr hidden">${bookmark.desc}</p>
          <div class="item-info">
          <a href="${bookmark.url}" target="_blank" class="bookmark-url">
          Go To Site</a>
          <p class="rating">${bookmark.rating}</p>
          <button class="bookmark-toggle" id="details-toggle" data-bookmark-id="${bookmark.id}">details</button>
          <button class="bookmark-delete" id="detail-delete" data-bookmark-id="${bookmark.id}">delete</button>
        </div>
    </li>`;
  }

  function handleNewBookmark(){
    $('.search').on('submit', function(event) {
      event.preventDefault();
      let cleanURL = $('#url').val().startsWith('http://') ? $('#url').val() : 'http://' + $('#url').val();
      const newBookmark = {
        title: $('#title').val(),
        desc: $('#description').val(),
        rating: $('input[name=rating]:checked').val(),
        url: cleanURL,
        id: cuid(),
      };
      $('#title').val('');
      $('#description').val('');
      $('input[name=rating]').prop('checked',false);
      $('#url').val('');
      api.createBookmark(newBookmark, function(data) { // 2 data is coming from .ajax
        store.addBookmark(data); 
        render();
        // handleDeleteOneItem(newBookmark.id);
      })
        .fail(renderError);
    });
  }
  
  function handleDeleteOneItem(){
    $('.bookmarks-list').on('click', event => {
      const id = event.target.dataset.bookmarkId;
      if(id){
        api.deleteBookmark(id, render);
      }
    });
  }


  function filterByRating(){
    $('#rating').change(event => {
      const rating = $(event.currentTarget).val();
      store.setRatingFilter(rating);
      render();
    });
  }


  function renderError(error) {
    alert(error.responseJSON.message);
  }


  function bindEventListeners() {
    handleNewBookmark();
    handleDeleteOneItem();
  }

  return {
    render,
    bindEventListeners,
    generateBookmark,
    renderError,
    filterByRating
  };
}());