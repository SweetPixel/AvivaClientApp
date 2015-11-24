'use strict';

describe('module: main, controller: HelpCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var HelpCtrl;
	beforeEach(inject(function ($controller) {
		HelpCtrl = $controller('HelpCtrl');
	}));

	it('should do something', function () {
		expect(!!HelpCtrl).toBe(true);
	});

});
