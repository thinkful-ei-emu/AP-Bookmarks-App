/* eslint-disable no-console */
'use strict';
/* global store, $, api*/

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  function serializeJson(form) {
    const formData = new FormData(form);
    let jsonObj = {};
    formData.forEach((val, name) => jsonObj[name] = val);
    return jsonObj;
  }

  //Generate list element
  function generateBookmarkListElement(bookmark) {

    const detailed = bookmark.expanded ? '' : 'hidden';

    const expand = bookmark.expanded ? 'Close' : 'Detailed';

      return `
        <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">

            <div class='list-header'>

                <h2><p class="bookmark-title title">${bookmark.title}</p></h2>
                <h3><p class="ratings-text title">Rating: ${bookmark.rating}</p></h3>
                <button type="button" class="js-expand" id="js-expand">${expand}</button>
                <button class="bookmark-remove js-bookmark-delete">Delete
                </button>
            </div>

            <div class="${detailed} js-expand-collapse">
    
                <h4 class='description-title'>Description: ${bookmark.desc}</h4>

                <div class="bookmark-controls">

                <button class="bookmark-site js-visit-site" target="_blank" onclick="window.open('${bookmark.url}','newwindow');">
                    <span class="button-label">Visit Site</span>
                </button>      

                </div>

            </div>

        </li>`;
    }

    //generate string of list
  function generateBookmarkListString(bookmarkList) {
    const items = bookmarkList.map((bookmark) => generateBookmarkListElement(bookmark));
    return items.join('');
  }

  //render
  function render() {
    if(store.errorKey){
      $('.error-message').html(`<p> ${api.error}</p>
            <button type="button" id="js-error-close" class="js-error-close">Click to Close</button>`
      );
      
      $('.error-message').removeClass('hidden');
    }

    let bookmarks = [ ...store.bookmarks ];

    if (store.filterTerm) {
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filterTerm);
    }

    const bookmarkListString = generateBookmarkListString(bookmarks);

    //add to list in html
    $('.js-bookmark-list').html(bookmarkListString);

  }

  //handle add bookmark form click
  function handleAddNewBookmarkFormClicked() {
    $('#js-bookmark-button-form').click(function(event){
      event.preventDefault();
      $('#js-submit-bookmark-form').removeClass('hidden');
      $('#js-bookmark-button-form').addClass('hidden');
    });
  }

  //handle close new bookmark button button click
  function handleCloseAddNewForm() {
    $('#close-button').click(function(event){

      event.preventDefault();

      $('#js-bookmark-button-form').removeClass('hidden');
      $('#js-submit-bookmark-form').addClass('hidden');
      $('#js-submit-bookmark-form')[0].reset();
    });
  }

  //handle new bookmark form submit
  function handleAddBookmarkSubmit() {
    $('#js-submit-bookmark-form').submit(function(event) {
      event.preventDefault();
      let formElement = $('#js-submit-bookmark-form')[0];
      let addingNew = serializeJson(formElement);
      $('#js-bookmark-button-form').removeClass('hidden');
      $('#js-submit-bookmark-form').addClass('hidden');
      $('#js-submit-bookmark-form')[0].reset();
      
      api.createBookmark(addingNew)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);          
          render();
        })
        .catch(error => {
          store.errorKey = `Error, try again. ${api.error}`;
          render();
        });
    });
  }

  //get id from element
  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  //handle delete bookmark button
  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', function(event) {

      const id = getBookmarkIdFromElement(event.currentTarget);
      
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();        
        })
        .catch(error => {
          store.errorKey = `Error, try again. ${api.error}`;
          render();
        });

    });

  }

   //handle expand button clicked
   function handleBookmarkDetailedClicked() {
    $('.js-bookmark-list').on('click', '.js-expand', function(event){
      
      const id = getBookmarkIdFromElement(event.target);
      let bookmark = store.findById(id);
      let opposite = {
        expanded: !bookmark.expanded
      };      
      store.findAndUpdate(id, opposite);
      render();    
    });

  }

  
  //handle filter
  function handleFilter() {
    $('#rating-filter').on('change', function(event) {
      const rating = $(event.currentTarget).val();
      store.setFilterTerm(rating);
      render();
    });
  }

  //handle error message
  function handleErrorMessageClose() {
    $('.error-message').on('click','#js-error-close', function(event){
      event.preventDefault();
      $('.error-message').addClass('hidden');
    });
  }


  function bindEventListeners() {
    handleAddNewBookmarkFormClicked();
    handleCloseAddNewForm();
    handleAddBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleBookmarkDetailedClicked();
    handleFilter();
    handleErrorMessageClose();
  }

  return {
    render,
    bindEventListeners
  };

}());