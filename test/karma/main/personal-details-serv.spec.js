'use strict';

describe('module: main, service: PersonalDetails', function () {

	// load the service's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate service
	var PersonalDetails;
	beforeEach(inject(function (_PersonalDetails_) {
		PersonalDetails = _PersonalDetails_;
	}));

	it('should do something', function () {
		expect(!!PersonalDetails).toBe(true);
	});

});
