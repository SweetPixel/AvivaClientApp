/***********
AMD Configuration file
Author : Ali Raza (ali@sweetpixelstudios.com)
**********/

define(function () {
  'use strict';

  require.config({
    deps: ['init'],
    paths: {
      backbone                : '../bower_components/backbone/backbone',
      backbone_route_manager  : '../bower_components/backbone.routemanager/backbone.routemanager',
      // hammer                  : '../bower_components/hammerjs/hammer',
      handlebars              : '../bower_components/handlebars/handlebars',
      jquery                  : '../bower_components/jquery/dist/jquery',
      kinwin                  : '../bower_components/kinwin/dist/kinwin',
      // materialize             : '../bower_components/materialize/dist/js/materialize',
      underscore              : '../bower_components/underscore/underscore-min',
      underscore_string       : '../bower_components/underscore.string/lib/underscore.string',

      // Our own libraries
      backbone_loader         : 'helpers/backbone_loader',
      templates               : 'helpers/templates' // empty placeholder

    },
    shim : {
      backbone            : { deps: ['jquery', 'underscore'], exports: 'Backbone'},
      backbone_route_manager : { deps: ['backbone'] },
      handlebars          : { exports : 'Handlebars'},
      // materialize         : { deps: ['jquery', 'hammer'] },
      underscore          : { exports: '_' },
      underscore_string   : { deps: ['underscore'] }
      }
    });
  });
