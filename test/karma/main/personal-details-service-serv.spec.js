'use strict';

describe('module: main, service: PersonalDetailsService', function () {

	// load the service's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate service
	var PersonalDetailsService;
	beforeEach(inject(function (_PersonalDetailsService_) {
		PersonalDetailsService = _PersonalDetailsService_;
	}));

	it('should do something', function () {
		expect(!!PersonalDetailsService).toBe(true);
	});

});
