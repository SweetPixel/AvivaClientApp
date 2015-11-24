'use strict';

describe('module: main, controller: TimingCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var TimingCtrl;
	beforeEach(inject(function ($controller) {
		TimingCtrl = $controller('TimingCtrl');
	}));

	it('should do something', function () {
		expect(!!TimingCtrl).toBe(true);
	});

});
