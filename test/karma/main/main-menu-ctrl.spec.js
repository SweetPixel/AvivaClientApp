'use strict';

describe('module: main, controller: MainMenuCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var MainMenuCtrl;
	beforeEach(inject(function ($controller) {
		MainMenuCtrl = $controller('MainMenuCtrl');
	}));

	it('should do something', function () {
		expect(!!MainMenuCtrl).toBe(true);
	});

});
