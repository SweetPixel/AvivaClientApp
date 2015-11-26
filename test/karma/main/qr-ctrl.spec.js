'use strict';

describe('module: main, controller: QrCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var QrCtrl;
	beforeEach(inject(function ($controller) {
		QrCtrl = $controller('QrCtrl');
	}));

	it('should do something', function () {
		expect(!!QrCtrl).toBe(true);
	});

});
