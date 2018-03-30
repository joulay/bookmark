'use strict';
/* global $*/

//eslint -disable-next-line no-unused-vars

const bookmarkList = (function(){
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
        rating: $('input[name=rating]:checked'),
        url: $('#url').val(),
        // id: cuid()
      };

    });
  }

  function renderNewBookmark(data) {
    const bookmark = generateBookmark(data);
    $('.output').prepend(bookmark);
  }

  function bindEventListeners() {
    renderNewBookmark();
  }

  return {
    generateBookmark,
  };
}());