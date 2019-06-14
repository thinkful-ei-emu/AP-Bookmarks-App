'use strict';

/* global bookmarkList, store */

$.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

let api = (function () {

    function listApiFetch(...args) {
        let error;
        return fetch(...args)
            .then(res => {
                if (!res.ok) {
                    // Valid HTTP response but non-2xx status - let's create an error!
                    error = { code: res.status };
                }

                // In either case, parse the JSON stream:
                return res.json();
            })

            .then(data => {
                // If error was flagged, reject the Promise with the error object
                if (error) {
                    error.message = data.message;
                    return Promise.reject(error);
                }

                // Otherwise give back the data as resolved Promise
                return data;
            });
    }

    //base url for API
    const BASE_URL = `https://thinkful-list-api.herokuapp.com/ADP`;

    //Access bookmarks
    function getBookmarks() {
        return listApiFetch(`${BASE_URL}/bookmarks`);
    };

    //create new bookmark 
    function createNewBookmark(bookmarkObj) {

        return listApiFetch(`${BASE_URL}/bookmarks`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: bookmarkObj.serializeJson(),
        });
    }

    //Delete bookmark
    function deleteBookmark(id) {
        return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
            method: `DELETE`,
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
        });
    }


    return {
        getBookmarks,
        createNewBookmark,
        deleteBookmark,

    };


}());