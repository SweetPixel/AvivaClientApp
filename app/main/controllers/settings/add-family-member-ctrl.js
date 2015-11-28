'use strict';
angular.module('main')
	.controller('AddFamilyMemberCtrl', function ($log, $scope, $ionicHistory, DataService, $ionicLoading) {
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
			$scope.member.Dob = $scope.datepickerObject.inputDate;
			if ($scope.member.FirstName === '' || $scope.member.LastName === '' || $scope.member.Email === '' || $scope.member.Dob === '' || $scope.member.Gender === '' || $scope.member.Relation === '') {
				sweetAlert("Missing...", "Please provide all information.", "error");
			} else {
				$scope.loadingDone = false;
				$scope.promise = DataService.postData($scope.$parent.userId, '', '', 'addFamilyMember', $scope.member);
				$scope.promise.then(function (payload) {
					$scope.status = payload.data;
					console.log('Got Response: ' + $scope.status);
					if ($scope.status === true) {
						$ionicLoading.show({
							template: 'Family member added.',
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
