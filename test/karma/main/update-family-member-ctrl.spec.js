'use strict';

describe('module: main, controller: UpdateFamilyMemberCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var UpdateFamilyMemberCtrl;
	beforeEach(inject(function ($controller) {
		UpdateFamilyMemberCtrl = $controller('UpdateFamilyMemberCtrl');
	}));

	it('should do something', function () {
		expect(!!UpdateFamilyMemberCtrl).toBe(true);
	});

});
