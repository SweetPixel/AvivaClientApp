//
// Index Router
// =============================================================================
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var app       = require('app'),
      Backbone  = require('backbone_loader'),
      IndexView = require('views/index/index');

  return Backbone.Router.extend({

    routes: {
      '': 'index'
    },

    initialize: function () {
      Backbone.history.start();
    },

    index: function () {
      var view = new IndexView({});
      app.mainView.show(view);
    }
  });
});

/* End of file index.js */
