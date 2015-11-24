'use strict';

describe('module: main, controller: SupportCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var SupportCtrl;
	beforeEach(inject(function ($controller) {
		SupportCtrl = $controller('SupportCtrl');
	}));

	it('should do something', function () {
		expect(!!SupportCtrl).toBe(true);
	});

});
