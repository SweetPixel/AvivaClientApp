//
// LearningStation Backbone Loader
// =============================================================================
//
// See the require statements for the ways that we extend our Backbone.
//
// See the ls.js file to see the mainView class that works with the new
// `.close()` method. When we load a new view into the `#main` div, we run the
// close on the previous view and then render the new one.
//

// TODO: https://github.com/nervetattoo/backbone.touch

define(function (require) {
  'use strict';

  var _        = require('underscore'),
      Backbone = require('backbone');

  // Computed Model Fields from [github][cf].
  // [cf]: https://github.com/alexanderbeletsky/backbone-computedfields
  // require('backbone_computed_fields');

  // We monkey patch a problem in computed fields here to account for a change
  // in underscore behavior with `bindAll()`
  // Backbone.ComputedFields.prototype.initialize = function () {
  //   _.bindAll(
  //     this,
  //     '_bindModelEvents',
  //     '_computeFieldValue',
  //     '_dependentFields',
  //     '_isModelInitialized',
  //     '_lookUpComputedFields',
  //     '_thenComputedChanges',
  //     '_thenDependentChanges',
  //     '_toJSON',
  //     '_wrapJSON',
  //     'initialize'
  //   );
  //   this._lookUpComputedFields();
  //   this._bindModelEvents();
  //   this._wrapJSON();
  // };

  // Allow for more complicated [route management][rm]
  // [rm]: https://raw.github.com/tbranyen/backbone.routemanager
  // require('backbone_route_filter');
  require('backbone_route_manager');

  // Attach our [sync implementation][sync] to Backbone
  // [sync]: http://backbonejs.org/#Sync
  // require('lssync');

  // Bootstrap Basic functionality for the site
  // require('bootstrap/bootstrap-button');
  // require('bootstrap/bootstrap-dropdown');
  // require('bootstrap/bootstrap-tab');

  // Add [Backbone.Forms][bf] - a great collection of UI elements.
  // [bf]: https://github.com/powmedia/backbone-forms
  // require('backbone-forms');
  // require('backbone-forms-bootstrap');

  // In each of our views, we track a list of subViews, this allows us to run a
  // close method on each of the views as we unload them.
  // We won't add a subViews to the prototype, because each instance needs it's
  // own list of sub views.

  // Add a view for close handling
  Backbone.View.prototype.addSubView = function (view) {
    // If we haven't added one before, we need to create the array.
    // Create here so each instance has it's own list
    this.subViews = this.subViews || [];

    // Add the view to the array
    this.subViews.push(view);

    // Return this to make it chainable.
    return this;
  };

  // Remove a view, this will prevent our close events from running on the view.
  // Keep in mind this means that you could be creating zombie views and event
  // binding
  Backbone.View.prototype.removeSubView = function (view) {
    // If no array has been created, just return and ignore
    if (!_.isArray(this.subViews)) { return this; }

    // Call `close()` and let this remove any subviews that it may have.
    view.close();

    // Remove the view from the array using underscore
    this.subViews = _.without(this.subViews, view);

    // Return this to allow for chaining
    return this;
  };

  // This is inspired by both Marionette and
  // [Managing Page Transitions In Backbone Apps](http://goo.gl/NFgQJ).
  // When we change the contents of #main, we run a close event on the views
  // and their subviews. This prevents memory leaks and leftover bindings
  Backbone.View.prototype.close = function () {
    // Run the close method on all sub views
    _.each(this.subViews, function (subView) {
      subView.close();
    });


    // Unbind any events that our view triggers directly – that is, anytime
    // we may have called `this.trigger(…)` from within our view, in order to
    // have our view raise an event
    this.unbind();

    // Delegates to jQuery behind the scenes, by calling `$(this.el).remove()`.
    // The effect of this is 2-fold:
    //
    // * We get the HTML that is currently populated inside of `this.el`
    //   removed from the DOM (and therefore, removed from the visual portion
    //   of the application)
    // * We also get all of the DOM element events cleaned up for us. This means
    //   that all of the events we have in the `events: {…}` declaration of
    //   our view are cleaned up automatically.
    this.remove();



    // This could unbind events on ls event aggregator and do other cleanup
    // actions
    if (_.isFunction(this.onClose)) {
      this.onClose();
    }

    return this;
  };

  // We use this backbone_loader to extend Backbone, and now hand it on to our
  // AMD module system.
  return Backbone;

});

/* End of file backbone_loader.js */
