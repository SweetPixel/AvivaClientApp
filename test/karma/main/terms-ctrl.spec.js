'use strict';

describe('module: main, controller: TermsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var TermsCtrl;
	beforeEach(inject(function ($controller) {
		TermsCtrl = $controller('TermsCtrl');
	}));

	it('should do something', function () {
		expect(!!TermsCtrl).toBe(true);
	});

});
