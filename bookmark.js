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
      // console.log(bookmarks);
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
        id: cuid(),
      };
      $('#title').val('');
      $('#description').val('');
      $('input[name=rating]').prop('checked',false);
      $('#url').val('');
    
      api.createBookmark(newBookmark, function(data) { // 2 data is coming from .ajax
        store.addBookmark(data); 
        render();
        handleDeleteOneItem(newBookmark.id);
      })
        .fail(renderError);
    });
  }

  function handleDelete(){
    $('.bookmark-list').on('click', '#details-delete', event => {
      console.log('delete button');
      const id = $(event.currentTarget).closest('li').attr('data-bookmark-id');
      api.deleteBookmark(id, render);
    });
  }
  
  function handleDeleteOneItem(id){
    console.log(id, $(`#bookmark-item-${id}`));
    $(`#bookmark-item-${id}`).on('click', '#details-delete', event => {
      console.log('delete button');
      const id = $(event.currentTarget).closest('li').attr('data-bookmark-id');
      api.deleteBookmark(id, render);
    });
  }

  function renderError(error) {
    alert(error.responseJSON.message);
  }

  function bindEventListeners() {
    handleNewBookmark();
    handleDelete();
  }

  return {
    render,
    bindEventListeners,
    generateBookmark,
    renderError
  };
}());