'use strict';
angular.module('main')
	.controller('ClaimsCtrl', function ($log, $scope, DataService, SaveStuffService, $ionicModal, $ionicHistory, $ionicLoading) {

		$log.log('Hello from your Controller: ClaimsCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('claims', $scope.$parent.serviceName);
		$scope.promise.then(function (payload) {
			$scope.claims = payload.data;
			if ($scope.claims.length !== 0 || $scope.claims.length) {
				$scope.loadingDone = true;
			}
		});
		$scope.promise = DataService.getData($scope.$parent.userId, $scope.$parent.serviceName, '', 'claims');
		$scope.promise.then(function (payload) {
			$scope.claims = payload.data;
			$scope.loadingDone = true;
			SaveStuffService.setStoredData('claims', $scope.claims, $scope.$parent.serviceName);
		});
		$scope.emailData = {
			claimid: '',
			email: ''
		};
		$scope.setClaimId = function (id) {
			$scope.emailData.claimid = id;
			$scope.openModal();
		};
		$ionicModal.fromTemplateUrl('my-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function () {
			$scope.modal.show();
		};
		$scope.closeModal = function () {
			$scope.modal.hide();
		};
		$scope.sendEmail = function () {
			if ($scope.emailData !== '') {
				$scope.asyncStarted = true;
				$scope.emailPromise = DataService.postData('', $scope.$parent.serviceName, '', 'claims', $scope.emailData);
				$scope.emailPromise.then(function (payload) {
					$scope.status = payload.data;
					$scope.closeModal();
					if ($scope.status === true) {
						$ionicLoading.show({
							template: 'Email claim complete.',
							noBackdrop: true,
							duration: 2000
						});
						$scope.asyncStarted = false;
						$ionicHistory.goBack();
					} else {
						$ionicLoading.show({
							template: 'Something went wrong. Please check your connection.',
							noBackdrop: true,
							duration: 3000
						});
						$scope.asyncStarted = false;
					}
				});
			} else {
				$scope.asyncStarted = false;
				sweetAlert("Missing...", "Please provide an email address.", "error");
			}
		};
	});
