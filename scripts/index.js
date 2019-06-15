'use strict';
/* global bookmarkList, store, api */
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
$(document).ready(function() {

  bookmarkList.bindEventListeners();

  bookmarkList.render();

  api.getBookmarks()
    .then((bookmarks) => {

      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      
      bookmarkList.render();
      
    });
    
});