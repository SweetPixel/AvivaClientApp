'use strict';
angular.module('main')
	.controller('UpdateFamilyMemberCtrl', function ($log, $scope, $ionicHistory, SaveStuffService, DataService, $ionicLoading) {

		$log.log('Hello from your Controller: UpdateFamilyMemberCtrl in module main:. This is your controller:', this);
		$scope.member = SaveStuffService.getFamilyMember();
		$scope.datepickerObject = {
			callback: function (val) {
				console.log(val);
				$scope.datepickerObject.inputDate = val;
			}
		};
		$scope.datepickerObject.inputDate = $scope.member.Dob;
		$scope.update = function () {
			$scope.loadingDone = false;
			$scope.member.Dob = $scope.datepickerObject.inputDate;
			$scope.promise = DataService.postData($scope.$parent.userId, '', '', 'updateFamilyMember', $scope.member);
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
			});
		};
	});
