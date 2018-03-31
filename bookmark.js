'use strict';
/* global $, api, store */

//eslint -disable-next-line no-unused-vars

const bookmarkList = (function(){
  function addBookmarkForm(bookmark) {
    return `
   <section class="bookmarks-list">
    <form action="#" name="bookmark" class="search">
      <fieldset>
        <legend>Tell us about your bookmark</legend>
            <input type="text" name="title" id="title" aria-label="title" placeholder="title">
            <input type="text" name="url" id="url" aria-label="url" placeholder="url">
            <input type="text" name="description" id="description" aria-label="description" placeholder="description">
            
      </fieldset>
      <fieldset>
        <legend>Rate the bookmark</legend>
        <label for="rating-0">0</label>
        <input type="radio" name="rating" id="rating-0">
        <label for="rating-1">1</label>
        <input type="radio" name="rating" id="rating-1">
        <label for="rating-2">2</label>
        <input type="radio" name="rating" id="rating-2">
        <label for="rating-3">3</label>
        <input type="radio" name="rating" id="rating-3">
        <label for="rating-4">4</label>
        <input type="radio" name="rating" id="rating-4">
        <label for="rating-5">5</label>
        <input type="radio" name="rating" id="rating-5">
        <button type="submit">Add</button>
      </fieldset>
    </form>
    <ul class="output"></ul>
  </section> `;
  }

  function generateBookmarkIntoString(bookmarkArray) {
    const bookmarks = bookmarkArray.map((bookmark) => generateBookmark(bookmark));
    return bookmarks.join('');
  }

  function render() { //be involved with getting stuff on screen
    api.getBookmark((bookmarks) => {
      store.list = bookmarks;
      $('.bookmarks').html(generateBookmarkIntoString(bookmarks));

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
        // id: cuid()
      };
      $('#title').val('');
      $('#description').val('');
      $('input[name=Choose]').attr('checked',false);
      $('#url').val('');
    });
  }

  function renderNewBookmark(data) {
    const bookmark = generateBookmark(data);
    console.log(bookmark);
    $('.output').prepend(bookmark);
  }

  function bindEventListeners() {
    renderNewBookmark();
    handleNewBookmark();
  }

  return {
    render,
    bindEventListeners,
    generateBookmark
  };
}());