//
// Index view of the app
// =============================================================================
//
// * Author: [Ali Raza](ali@sweetpixelstudios.com)
// 
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var $                   = require('jquery'),
      BasicView             = require('views/ui/basic');

  return BasicView.extend({
    template: 'indexTemplate'
  });
});

/* End of file index.js */
