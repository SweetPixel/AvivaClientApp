'use strict';

describe('module: main, controller: ClinicDetailsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var ClinicDetailsCtrl;
	beforeEach(inject(function ($controller) {
		ClinicDetailsCtrl = $controller('ClinicDetailsCtrl');
	}));

	it('should do something', function () {
		expect(!!ClinicDetailsCtrl).toBe(true);
	});

});
