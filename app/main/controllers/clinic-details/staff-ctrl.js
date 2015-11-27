'use strict';
angular.module('main')
	.controller('StaffCtrl', function ($log, $scope, DataService, SaveStuffService) {

		$log.log('Hello from your Controller: StaffCtrl in module main:. This is your controller:', this);

		$scope.clinic = SaveStuffService.getClinic();
		$scope.staff = [];
		$scope.allStaff = [];
		$scope.getStoredDataPromise = SaveStuffService.getStoredData('staff', '');
		$scope.getStoredDataPromise.then(function (payload) {
			$scope.allStaff = payload.data;
			if ($scope.allStaff && $scope.allStaff.length > 0) {
				var j = 0;
				for (var i = 0; i < $scope.allStaff.length; i++) {
					if ($scope.allStaff[i].PracticeId === $scope.clinic.practiceId) {
						$scope.staff[j] = $scope.allStaff[i];
						j++;
					}
				}
				if ($scope.staff.length !== 0) {
					$scope.loadingDone = true;
					if (!$scope.staff.length) {
						$scope.loadingDone = false;
					}
				}
			}
		});
		$scope.promise = DataService.getData('', '', '', 'staff');
		$scope.promise.then(function (payload) {
			$scope.allStaff = payload.data;
			var j = 0;
			for (var i = 0; i < $scope.allStaff.length; i++) {
				if ($scope.allStaff[i].PracticeId === $scope.clinic.practiceId) {
					$scope.staff[j] = $scope.allStaff[i];
					j++;
				}
			}
			SaveStuffService.setStoredData('staff', $scope.allStaff, '');
			$scope.loadingDone = true;
			if (j === 0) {
				$scope.message = 'No staff found for this practice.';
			} else {
				$scope.message = false;
			}
		});
	});
