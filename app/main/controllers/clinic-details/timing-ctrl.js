'use strict';
angular.module('main')
	.controller('TimingCtrl', function ($log, $scope, SaveStuffService) {

		$log.log('Hello from your Controller: TimingCtrl in module main:. This is your controller:', this);
		$scope.data = {
			timing: ''
		}
		$scope.data.timing = SaveStuffService.getClinic();
		if (!$scope.data.timing.OT_Mon) {
			$scope.hasTiming = false;
		} else {
			$scope.hasTiming = true;
		}
	});
