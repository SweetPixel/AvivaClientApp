'use strict';

describe('module: main, controller: ContactCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var ContactCtrl;
	beforeEach(inject(function ($controller) {
		ContactCtrl = $controller('ContactCtrl');
	}));

	it('should do something', function () {
		expect(!!ContactCtrl).toBe(true);
	});

});
