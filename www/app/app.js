//
// Aviva Client App
// ===============================
// Namespaces and Core configuration
// Author : [Ali Raza](ali@sweetpixelstudios.com)
//


define([
  'jquery',
  'underscore',
  'backbone_loader',
  'handlebars',
  'templates'
], function (
  $, _, Backbone, Handlebars, JST
) {

  'use strict';


  //Attach template object to global scope
  window.JST = JST;



  var app = {
    root : '/'
  };
  // Load a template from the server, compile it, and return
  // through the callback. In production mode, we have a
  // templates.js file that we precompile. This file will prepopulate
  // the JST var and so we won't have to async load the templates.
  app.fetchTemplate = function (path, done) {
    var self = this,
    JST = window.JST = window.JST || {},
    def = new $.Deferred();

    // Should be an instant synchronous way of getting the template, if it
    // exists in the JST object.
    if (JST[path]) {
      if (_.isFunction(done)) {
        done(JST[path]);
      }
      return def.resolve(JST[path]);
    }

    // Fetch it asynchronously if not available from JST
    // Note that some bugs pop up if the views ask for paths
    // with a leading slash. The precompiled JST object won't find
    // them, but the webserver will.
    $.ajax({
      type     : 'GET',
      dataType : 'text',
      url      : '/app/templates/' + path + '.html'
    })
    .done(function (response) {
      // The request returns the template, compile it and cache it for use
      JST[path] = Handlebars.compile(response);
      // If there is a callback return the template through it
      if (_.isFunction(done)) { done(JST[path]); }
      // Resolve the template deferred
      def.resolve(JST[path]);
    })
    .fail(function () {
      // In production, we ship with a stripped down Handlebars that doesn't
      // have the compile method, so we have to make this conditional.
      if (_.isFunction(Handlebars.compile)) {
        JST[path] = Handlebars.compile(
          '<span class="badge badge-warning">404: ' +
          path +
          '.html was not found.</span>'
        );
        if (_.isFunction(done)) { done(JST[path]); }
        def.resolve(JST[path]);
      }
      else {
        // In production, we don't have a `compile()` method in production
        JST[path] = function () {};
        // self.analytics.trackEvent('Errors', '404 Template', path);
        // self.logError('Unable to load template: ' + path, {type: '404'});
        def.reject(JST[path]);
      }
    });

    // Ensure a normalized return value (Promise)
    return def.promise();
  };

  app.setTitle = function (title) {
    title = (title) ? title += ' : ' : '';
    window.document.title = title + 'HealthPick';
    return this;
  };

  // This is a simple class to manage the Backbone view that is currently
  // in the #main container. This will track and close a previous view before
  // it loads the new view
  app.mainView = {
    // Reference to our main application container
    $el: $('#main'),

    // This is a reference to a Backbone.View that is in the #main container
    currentView: undefined,

    // Render and display a main view
    show: function (view) {
      var promise;
      // Reset the title so that it can't get out of sync
      app.setTitle();

      // If we've got a view from a previous call to this code, close it
      // See the backbone_loader for more information about this.
      if (!_.isUndefined(this.currentView)) {
        this.currentView.close();
      }

      // Scroll to the top of the page
      window.scrollTo(0, 0);

      // Save a reference and render the view in a _detached_ el, the view
      // shouldn't have an `el` set.
      this.currentView = view;
      promise = this.currentView.render();

      // Place the node into the current main container after emptying
      this.$el.html('').append(this.currentView.el);

      return promise;
    }
  };

  // Application wide code, this is the ls namespace object
  return _.extend({}, app, Backbone.Events);
});

// end of file app.js
