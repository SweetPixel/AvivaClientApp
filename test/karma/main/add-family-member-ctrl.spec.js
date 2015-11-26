'use strict';

describe('module: main, controller: AddFamilyMemberCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var AddFamilyMemberCtrl;
	beforeEach(inject(function ($controller) {
		AddFamilyMemberCtrl = $controller('AddFamilyMemberCtrl');
	}));

	it('should do something', function () {
		expect(!!AddFamilyMemberCtrl).toBe(true);
	});

});
