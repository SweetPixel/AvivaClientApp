'use strict';

describe('module: main, controller: ReviewsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var ReviewsCtrl;
	beforeEach(inject(function ($controller) {
		ReviewsCtrl = $controller('ReviewsCtrl');
	}));

	it('should do something', function () {
		expect(!!ReviewsCtrl).toBe(true);
	});

});
