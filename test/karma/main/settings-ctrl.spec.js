'use strict';

describe('module: main, controller: SettingsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var SettingsCtrl;
	beforeEach(inject(function ($controller) {
		SettingsCtrl = $controller('SettingsCtrl');
	}));

	it('should do something', function () {
		expect(!!SettingsCtrl).toBe(true);
	});

});
