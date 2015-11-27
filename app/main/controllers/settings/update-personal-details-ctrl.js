'use strict';
angular.module('main')
	.controller('UpdatePersonalDetailsCtrl', function ($log, $scope, $ionicHistory, SaveStuffService, DataService) {

		$log.log('Hello from your Controller: UpdatePersonalDetailsCtrl in module main:. This is your controller:', this);
		$scope.user = SaveStuffService.getPersonalDetails();
		$scope.datepickerObject = {
			callback: function (val) {
				console.log(val);
				$scope.datepickerObject.inputDate = val;
			}
		}
		$scope.datepickerObject.inputDate = $scope.user.Dob;
		$scope.update = function () {
			$scope.loadingDone = false;
			$scope.user.Dob = $scope.datepickerObject.inputDate;
			$scope.promise = DataService.postData('', '', '', 'updatePersonalDetails', $scope.user);
			$scope.promise.then(function (payload) {
				console.log('Got Response: ' + payload.data);
				$scope.loadingDone = true;
				$ionicHistory.goBack();
			})
		}
	});
