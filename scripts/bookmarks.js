'use strict';
/* global store, API */

const bookmarkList = (function () {

    //Handle add new button click
    function handleaddNewBookmarkClicked() {
        $("#js-new-bookmark").on('click', function () {
            store.toggleAddingBookmarkStatus();
            render();
        })
    }

    //handle add new bookmark form submit
    function handleaddBookmarkSubmit() {
        $("#js-form-container").on('click', '#js-add-bookmark', function (event) {
            event.preventDefault();
            const title = $('#js-form-title').val();
            const url = $('#js-form-url').val();
            const rating = $('#js-form-rating').val();
            const description = $('#js-form-description').val();

            const newBookmarkObj = {
                title,
                url,
                rating,
                desc: description,
            }

            api.createNewBookmark(

            )
        });
    };


    //handle delete bookmark
    function handledeleteBookmark() {

}

//handle filter by ratings
function handlefilterRatings() {

}

//handle expanding bookmark in list with condensed default
function handleexpandingBookmark() {

}

//generate list for single bookmark
function generateBookmarkList() {
    return `
      <li>
        Title: ${bookmark.title} - URL: ${bookmark.url} - Rating: ${
        bookmark.rating
        } Description: ${bookmark.description}
      </li>
    `;
}


//generate HTML for multiple bookmarks
function generateFullBookmarksList(bookmarkArray) {
    return bookmarkArray.map(generateFullBookmarksList);

}

//render 
function render() {
    // Store bookmarks as a variable
    const bookmarks = store.bookmarks;
    // Get the HTML for the list from the store
    const bookmarkList = generateFullBookmarksList(bookmarks);
}

function bindEventListeners() {
    handleaddNewBookmarkClicked();
    handleaddBookmarkSubmit();
    handledeleteBookmark();
    handlefilterRatings();
    handleexpandingBookmark();

}


return {
    render,
    bindEventListeners,
};

}());

