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
      backbone_loader         : 'helpers/backbone_loader',
      backbone_route_manager  : '../bower_components/backbone.routemanager/backbone.routemanager',
      handlebars              : '../bower_components/handlebars/handlebars',
      jquery                  : '../bower_components/jquery/dist/jquery',
      kinwin                  : '../bower_components/kinwin/dist/kinwin',
      // materialize             : '../bower_components/materialize/dist/js/materialize',
      templates               : 'helpers/templates', // empty placeholder
      underscore              : '../bower_components/underscore/underscore-min',
      underscore_string       : '../bower_components/underscore.string/lib/underscore.string'
    },
    shim : {
      backbone            : { deps: ['jquery', 'underscore'], exports: 'Backbone'},
      backbone_route_manager : { deps: ['backbone'] },
      handlebars          : { exports : 'Handlebars'},
      underscore          : { exports: '_' },
      underscore_string   : { deps: ['underscore'] }
      }
    });
  });
