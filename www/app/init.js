//
//
// Initialization & Setup for the app
// ===========================
// Author: [Ali Raza](ali@sweetpixelstudios.com)
//
//
//

require([
  'app',
  'jquery',
  'underscore',
  'backbone_loader',
  'routers/index'
], function (app, $, _, Backbone, IndexRouter) {

  'use strict';

  // Organize our initializers
  var main = { init: {} };

  // Instantiate our application routers
  // Remember that these prefixes go onto the url routes in our routers
  // main.init.setupRouters = function () {
  //   var AppRouter = Backbone.RouteManager.extend({
  //     routes: {
  //       ''     : IndexRouter
  //     }
  //   });
  //   app.router = new AppRouter();
  //   return this;
  // };

  // We've proven that we're authenticated, so we can start the app.
  // enable HTML5 History API support
  main.init.startBackboneHistory = function () {
    Backbone.history.start({ pushState: true, root: app.root });
    return this;
  };

  // The jQuery ready function is the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function () {
    // In the test environment, we don't start the app since we can't connect to
    // the api, or may not be able to auth or have an auth token
    if (!!window.cordova) {
    document.addEventListener("deviceready", startApp, false);
  } else {
    startApp();
  }
    // Initialize the environment and start Backbone.
    main.init
      .setupRouters()
      .startBackboneHistory();
  });


});
