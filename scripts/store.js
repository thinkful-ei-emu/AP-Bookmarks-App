'use strict';

const store = (function () {

    //adding bookmark function

    function addBookmark(bookmarkObj) {
        this.bookmarks.push(bookmarkObj);
    }

    //deleting bookmark by id

    function deleteBookmark(id) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    }

    //filter by rating

    function filterByRating(rating) {
        this.ratingFilter = rating;
        this.bookmarks = this.bookmarks.filter(
            bookmark => bookmark.rating >= this.ratingFilter
        );
    }

    //expand bookmark

    function expandBookmark(id) {
        const bookmarkToToggle = this.bookmarks.find(
            bookmark => bookmark.id === id
        );
        bookmarkToToggle.expanded = !bookmarkToToggle.expanded;
    }

    // Store and display error messages
    function setErrorMessage(error) {
        this.errorMessage = error;
    }

    //find by ID

    const findById = function (id) {
        return this.bookmarks.find(bookmark => bookmark.id === id)
    }

    // Function for toggling adding bookmark property
    function toggleAddingBookmarkStatus(id) {
        this.adding = !this.adding;
    }




    return {
        bookmarks: [],
        adding: false,
        //expanded: null,
        ratingFilter: 0,
        errorMessage: '',
        addBookmark,
        findById,
        expandBookmark,
        filterByRating,
        deleteBookmark,
        setErrorMessage,
    };



}());