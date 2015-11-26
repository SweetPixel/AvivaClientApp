'use strict';

describe('module: main, service: DataService', function () {

	// load the service's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate service
	var DataService;
	beforeEach(inject(function (_DataService_) {
		DataService = _DataService_;
	}));

	it('should do something', function () {
		expect(!!DataService).toBe(true);
	});

});
