'use strict';

describe('module: main, controller: AdvanceSearchCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var AdvanceSearchCtrl;
	beforeEach(inject(function ($controller) {
		AdvanceSearchCtrl = $controller('AdvanceSearchCtrl');
	}));

	it('should do something', function () {
		expect(!!AdvanceSearchCtrl).toBe(true);
	});

});
