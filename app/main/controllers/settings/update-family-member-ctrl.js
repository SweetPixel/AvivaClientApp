'use strict';
angular.module('main')
	.controller('UpdateFamilyMemberCtrl', function ($log, $scope, $ionicHistory, PersonalDetailsService, DataService) {

		$log.log('Hello from your Controller: UpdateFamilyMemberCtrl in module main:. This is your controller:', this);
		$scope.member = PersonalDetailsService.getFamilyMember();
		$scope.datepickerObject = {
			callback: function (val) {
				console.log(val);
				$scope.datepickerObject.inputDate = val;
			}
		}
		$scope.datepickerObject.inputDate = $scope.member.Dob;
		$scope.update = function () {
			$scope.member.Dob = $scope.datepickerObject.inputDate;
			$scope.promise = DataService.postData($scope.$parent.userId, '', '', 'updateFamilyMember', $scope.member);
			$scope.promise.then(function (payload) {
				console.log("Got Response: " + payload.data);
				$ionicHistory.goBack();
			})
		}
	});
