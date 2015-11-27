'use strict';

describe('module: main, service: SaveStuffService', function () {

	// load the service's module
	beforeEach(module('main'));
	// load all the templates to prevent unexpected $http requests from ui-router
	beforeEach(module('ngHtml2Js'));

	// instantiate service
	var SaveStuffService;
	beforeEach(inject(function (_SaveStuffService_) {
		SaveStuffService = _SaveStuffService_;
	}));

	it('should do something', function () {
		expect(!!SaveStuffService).toBe(true);
	});

});
