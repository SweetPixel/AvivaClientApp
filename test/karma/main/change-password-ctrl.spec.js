'use strict';

describe('module: main, controller: ChangePasswordCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var ChangePasswordCtrl;
	beforeEach(inject(function ($controller) {
		ChangePasswordCtrl = $controller('ChangePasswordCtrl');
	}));

	it('should do something', function () {
		expect(!!ChangePasswordCtrl).toBe(true);
	});

});
