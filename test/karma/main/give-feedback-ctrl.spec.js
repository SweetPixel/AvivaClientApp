'use strict';

describe('module: main, controller: GiveFeedbackCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var GiveFeedbackCtrl;
	beforeEach(inject(function ($controller) {
		GiveFeedbackCtrl = $controller('GiveFeedbackCtrl');
	}));

	it('should do something', function () {
		expect(!!GiveFeedbackCtrl).toBe(true);
	});

});
