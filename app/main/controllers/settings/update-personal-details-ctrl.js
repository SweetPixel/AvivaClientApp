'use strict';
angular.module('main')
	.controller('UpdatePersonalDetailsCtrl', function ($log, $scope, $ionicHistory, SaveStuffService, DataService, $ionicLoading) {

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
				$scope.status = payload.data;
				console.log('Got Response: ' + $scope.status);
				if ($scope.status === true) {
					$ionicLoading.show({
						template: 'Personal details updated.',
						noBackdrop: true,
						duration: 2000
					});
					$scope.loadingDone = true;
					$ionicHistory.goBack();
				} else {
					$ionicLoading.show({
						template: 'Something went wrong. Please check your connection.',
						noBackdrop: true,
						duration: 3000
					});
					$scope.loadingDone = true;
				}
			})
		}
	});
