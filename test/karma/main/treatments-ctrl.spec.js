'use strict';

describe('module: main, controller: TreatmentsCtrl', function () {

	// load the controller's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate controller
	var TreatmentsCtrl;
	beforeEach(inject(function ($controller) {
		TreatmentsCtrl = $controller('TreatmentsCtrl');
	}));

	it('should do something', function () {
		expect(!!TreatmentsCtrl).toBe(true);
	});

});
