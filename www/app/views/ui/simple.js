
//
// Simple View
// =============================================================================
//
// Render a view __without__ a model. This will hand the initialization
// `options` to the template. The view implements a promise interface based
// on the completion of the `render()` completion
// `view.render().done(function () { ... });`
//
// * Author: [Ali Raza](ali@sweetpixelstudios.com)
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var app      = require('app'),
      $        = require('jquery'),
      _        = require('underscore'),
      Backbone = require('backbone_loader');

  return Backbone.View.extend({
    attributes: {},

    initialize: function (options) {
      // Attach a promise to this view that we can hook for a complete callback
      this.deferred = $.Deferred();
      // Extend this object with the promise interface
      this.deferred.promise(this);
      // Keep the template if it's been assigned
      if (!_.isUndefined(options.template)) {
        this.template = options.template;
      }
    },

    render: function () {
      app.fetchTemplate(this.template).done(_.bind(function (tmpl) {
        // See this? No model, just rendering with the options from initialize.
        this.$el.html(tmpl(this.options));
        this.deferred.resolve();
      }, this));
      return this;
    }
  });

});

/* End of file simple.js */
