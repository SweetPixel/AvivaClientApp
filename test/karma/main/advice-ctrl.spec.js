'use strict';

describe('module: main, controller: AdviceCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var AdviceCtrl;
	beforeEach(inject(function ($controller) {
		AdviceCtrl = $controller('AdviceCtrl');
	}));

	it('should do something', function () {
		expect(!!AdviceCtrl).toBe(true);
	});

});
