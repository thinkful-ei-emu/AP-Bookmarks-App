'use strict';

/* global store, api, bookmark  */

$(document).ready(function() {
    bookmarkList.bindEventListeners();
    bookmarkList.render();
    bookmarks.getBookmarks()
      .then((bookmark) => {
        bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
        bookmarkList.render();
      });
  });