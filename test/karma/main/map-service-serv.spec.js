'use strict';

describe('module: main, service: MapService', function () {

	// load the service's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate service
	var MapService;
	beforeEach(inject(function (_MapService_) {
		MapService = _MapService_;
	}));

	it('should do something', function () {
		expect(!!MapService).toBe(true);
	});

});
