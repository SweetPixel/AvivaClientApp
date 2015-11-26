'use strict';

describe('module: main, controller: UpdatePersonalDetailsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var UpdatePersonalDetailsCtrl;
	beforeEach(inject(function ($controller) {
		UpdatePersonalDetailsCtrl = $controller('UpdatePersonalDetailsCtrl');
	}));

	it('should do something', function () {
		expect(!!UpdatePersonalDetailsCtrl).toBe(true);
	});

});
