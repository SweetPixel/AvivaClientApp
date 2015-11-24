'use strict';

describe('module: main, controller: FindPracticeCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var FindPracticeCtrl;
	beforeEach(inject(function ($controller) {
		FindPracticeCtrl = $controller('FindPracticeCtrl');
	}));

	it('should do something', function () {
		expect(!!FindPracticeCtrl).toBe(true);
	});

});
