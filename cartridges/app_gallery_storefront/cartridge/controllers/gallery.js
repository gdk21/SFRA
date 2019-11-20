'use strict';

/**
 * Get the Attribute 'Gallery'
 *
 * @param {Object} querystring - query string parameters
 */

var ProductFactory = require('*/cartridge/scripts/factories/product');

function showGallery(querystring) {
  var params = querystring;
  var product = ProductFactory.get(params);
  if(product.attributes){
    var gallery = product.attributes[0]; 
  } else {
    var gallery = 'Je suis dans le controller Gallery';
  }

  return {
    gallery: gallery
  };
}
module.exports = {
  showGallery: showGallery
};
