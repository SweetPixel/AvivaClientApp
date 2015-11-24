'use strict';

describe('module: main, controller: StaffCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var StaffCtrl;
	beforeEach(inject(function ($controller) {
		StaffCtrl = $controller('StaffCtrl');
	}));

	it('should do something', function () {
		expect(!!StaffCtrl).toBe(true);
	});

});
