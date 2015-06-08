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
    main.init.setupRouters = function () {
    // var AppRouter = IndexRouter
    //   routes: {
    //     ''     : IndexRouter
    //   }
    // });
        app.router = new IndexRouter();
        return this;
    };

  // We've proven that we're authenticated, so we can start the app.
  // enable HTML5 History API support
    main.init.startBackboneHistory = function () {
        Backbone.history.start({ pushState: true, root: app.root });
        return this;
    };

    main.init.startApp = function () {
          // Initialize the environment and start Backbone.
        main.init
        .setupRouters()
        .startBackboneHistory();
    };

  // The jQuery ready function is the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
    $(function () {
        if (!!window.cordova) {
          document.addEventListener("deviceready", main.init.startApp, false);
        } else {
          main.init.startApp();
        }
    });


});
