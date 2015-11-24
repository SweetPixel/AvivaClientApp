'use strict';

describe('module: main, controller: BookingCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var BookingCtrl;
	beforeEach(inject(function ($controller) {
		BookingCtrl = $controller('BookingCtrl');
	}));

	it('should do something', function () {
		expect(!!BookingCtrl).toBe(true);
	});

});
