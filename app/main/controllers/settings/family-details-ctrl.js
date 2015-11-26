'use strict';
angular.module('main')
	.controller('FamilyDetailsCtrl', function ($log, $scope, DataService, PersonalDetailsService, $state) {

		$log.log('Hello from your Controller: FamilyDetailsCtrl in module main:. This is your controller:', this);
		$scope.promise = DataService.getData($scope.$parent.userId, '', '', 'familyDetails');
		$scope.promise.then(function (payload) {
			$scope.family = payload.data;
		});
		$scope.update = function (familyId) {
			$.each($scope.family, function (index, value) {
				if (value.FamilyID === familyId) {
					var familyMember = value;
					PersonalDetailsService.setFamilyMember(familyMember);
					$state.go('main.updateFamilyMember');
				}
			})
		}
	});
