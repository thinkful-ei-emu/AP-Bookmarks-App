'use strict';

let api = (function () {

    //base url for API
    const BASE_URL = `https://thinkful-list-api.herokuapp.com/ADP`;

    //I can get all bookmarks
    function getBookmarks() {
        return fetch(`${BASE_URL}/bookmarks`);
    };

    
    return {
        getBookmarks,
    };


}());