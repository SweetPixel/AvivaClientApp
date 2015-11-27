'use strict';
angular.module('main')
	.controller('TreatmentsCtrl', function ($log, $scope, SaveStuffService, DataService) {

		$log.log('Hello from your Controller: TreatmentsCtrl in module main:. This is your controller:', this);
		$scope.clinic = SaveStuffService.getClinic();
		$scope.promise = DataService.getData('', $scope.$parent.serviceName, $scope.clinic.practiceId, 'treatments');
		$scope.promise.then(function (payload) {
			$scope.treatments = payload.data;
			$scope.loadingDone = true;
			if ($scope.treatments.length === 0) {
				$scope.message = 'No treatments found for this practice.';
			} else {
				$scope.message = false;
			}
		});
	});
