/* global define, require */

// A basic view for dealing with inline templates
//
// Author : Ali Raza (ali@sweetpixelstudios.com)


define(function (require) {
	'use strict';
	  var app      = require('app'),
      $        = require('jquery'),
      _        = require('underscore'),
      SimpleView = require('views/ui/simple');


      return Backbone.View.extend({
      	render: function () {
      		// in this case it would be an id of the inline template
      		var tmpl = app.getTemplate(this.template);
      		this.$el.html(tmpl(this.options));
      		return this;
      	}
      });
});

