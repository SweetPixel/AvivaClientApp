'use strict';

describe('module: main, controller: ServicesCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var ServicesCtrl;
	beforeEach(inject(function ($controller) {
		ServicesCtrl = $controller('ServicesCtrl');
	}));

	it('should do something', function () {
		expect(!!ServicesCtrl).toBe(true);
	});

});
