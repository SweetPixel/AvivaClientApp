'use strict';

describe('module: main, controller: FamilyDetailsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var FamilyDetailsCtrl;
	beforeEach(inject(function ($controller) {
		FamilyDetailsCtrl = $controller('FamilyDetailsCtrl');
	}));

	it('should do something', function () {
		expect(!!FamilyDetailsCtrl).toBe(true);
	});

});
