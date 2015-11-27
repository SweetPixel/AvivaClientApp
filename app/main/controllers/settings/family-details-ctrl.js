'use strict';
angular.module('main')
	.controller('FamilyDetailsCtrl', function ($log, $scope, DataService, SaveStuffService, $state) {

		$log.log('Hello from your Controller: FamilyDetailsCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('family', '');
		$scope.promise.then(function (payload) {
			$scope.family = payload.data;
			if ($scope.family) {
				$scope.loadingDone = true;
			}
		});
		$scope.promise = DataService.getData($scope.$parent.userId, '', '', 'familyDetails');
		$scope.promise.then(function (payload) {
			$scope.family = payload.data;
			$scope.loadingDone = true;
			SaveStuffService.setStoredData('family', $scope.family, '');
		});
		$scope.update = function (familyId) {
			$.each($scope.family, function (index, value) {
				if (value.FamilyID === familyId) {
					var familyMember = value;
					SaveStuffService.setFamilyMember(familyMember);
					$state.go('main.updateFamilyMember');
				}
			})
		}
	});
