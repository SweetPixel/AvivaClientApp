'use strict';

describe('module: main, controller: WellbeingCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var WellbeingCtrl;
	beforeEach(inject(function ($controller) {
		WellbeingCtrl = $controller('WellbeingCtrl');
	}));

	it('should do something', function () {
		expect(!!WellbeingCtrl).toBe(true);
	});

});
