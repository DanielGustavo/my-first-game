module.exports = (function() {
  Array.prototype.includesAll = function(array) {
    return array.every((currentItem) => this.includes(currentItem));
  }
})();
