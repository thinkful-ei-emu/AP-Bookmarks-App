'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const bookmark = (function() {

  const validateTitle = function(title) {
    if(!title) throw new TypeError('Title must not be blank');
  };

  const validateURL= function(URL) {
    if(!URL) throw new TypeError('URL must not be blank');
  };
    
  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating,      
      expanded: false,
    };
  };

  return {
    validateTitle,
    validateURL,
    create
  };
}());