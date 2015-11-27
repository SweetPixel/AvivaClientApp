'use strict';
angular.module('main')
	.controller('AddFamilyMemberCtrl', function ($log, $scope, $ionicHistory, DataService) {
		$scope.member = {
			FamilyID: '',
			UserName: $scope.$parent.userId,
			FirstName: '',
			LastName: '',
			Email: '',
			Dob: '',
			Gender: '',
			Relation: ''
		};
		$log.log('Hello from your Controller: AddFamilyMemberCtrl in module main:. This is your controller:', this);
		$scope.datepickerObject = {
			callback: function (val) {
				console.log(val);
				$scope.datepickerObject.inputDate = val;
			}
		}
		$scope.update = function () {
			$scope.loadingDone = false;
			$scope.member.Dob = $scope.datepickerObject.inputDate;
			$scope.promise = DataService.postData($scope.$parent.userId, '', '', 'addFamilyMember', $scope.member);
			$scope.promise.then(function (payload) {
				$scope.loadingDone = true;
				console.log('Got Response: ' + payload.data);
				$ionicHistory.goBack();
			});
		};

	});
