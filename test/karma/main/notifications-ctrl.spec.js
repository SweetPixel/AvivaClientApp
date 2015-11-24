'use strict';

describe('module: main, controller: NotificationsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var NotificationsCtrl;
	beforeEach(inject(function ($controller) {
		NotificationsCtrl = $controller('NotificationsCtrl');
	}));

	it('should do something', function () {
		expect(!!NotificationsCtrl).toBe(true);
	});

});
