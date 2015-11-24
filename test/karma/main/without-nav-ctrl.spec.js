'use strict';

describe('module: main, controller: WithoutNavCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var WithoutNavCtrl;
  beforeEach(inject(function ($controller) {
    WithoutNavCtrl = $controller('WithoutNavCtrl');
  }));

  it('should do something', function () {
    expect(!!WithoutNavCtrl).toBe(true);
  });

});
