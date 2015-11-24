'use strict';

describe('module: main, controller: PolicyCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var PolicyCtrl;
	beforeEach(inject(function ($controller) {
		PolicyCtrl = $controller('PolicyCtrl');
	}));

	it('should do something', function () {
		expect(!!PolicyCtrl).toBe(true);
	});

});
