'use strict';
/* global  */
// eslint-disable-next-line no-unused-vars
const store = (function(){

  const addBookmark = function(bookmark) {
    bookmark.expanded = false;
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const toggleExpand = function(id, expand) {
    const bookmark = this.findById(id);
    bookmark.expanded = expand;
  };

  function findAndUpdate(id, newData){
    const target = this.findById(id);
    return Object.assign(target, newData);
  }

  const setFilterTerm = function(term) {
    this.filterTerm = term;
  };

  return {
    bookmarks: [],
    filterTerm: 1,
    errorKey: '',
    addBookmark,
    findById,
    findAndDelete,
    toggleExpand,
    findAndUpdate,
    setFilterTerm,
  };

}());