'use strict';
angular.module('main')
	.controller('UpdateFamilyMemberCtrl', function ($log, $scope, $ionicHistory, SaveStuffService, DataService, $ionicLoading) {

		$log.log('Hello from your Controller: UpdateFamilyMemberCtrl in module main:. This is your controller:', this);
		$scope.memberPromise = SaveStuffService.getFamilyMember();
		$scope.memberPromise.then(function (payload) {
			$scope.member = payload.familyMember;
			$scope.datepickerObject.inputDate = $scope.member.Dob;
		})
		$scope.datepickerObject = {
			callback: function (val) {
				console.log(val);
				$scope.datepickerObject.inputDate = val;
			}
		}
		
		$scope.update = function () {
			$scope.member.Dob = $scope.datepickerObject.inputDate;
			if ($scope.member.FirstName === '' || $scope.member.LastName === '' || $scope.member.Email === '' || $scope.member.Dob === '' || $scope.member.Gender === '' || $scope.member.Relation === '') {
				sweetAlert("Missing...", "Please provide all information.", "error");
			} else {
				$scope.loadingDone = false;
				$scope.promise = DataService.postData($scope.$parent.userId, '', '', 'updateFamilyMember', $scope.member);
				$scope.promise.then(function (payload) {
					$scope.status = payload.data;
					console.log('Got Response: ' + $scope.status);
					if ($scope.status === true) {
						$ionicLoading.show({
							template: 'Family details updated.',
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
			}
		};
	});
