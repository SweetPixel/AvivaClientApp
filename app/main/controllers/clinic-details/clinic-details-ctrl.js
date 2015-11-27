'use strict';
angular.module('main')
	.controller('ClinicDetailsCtrl', function ($log, $scope, $stateParams, SaveStuffService, MapService) {

		$log.log('Hello from your Controller: ClinicDetailsCtrl in module main:. This is your controller:', this);
		$scope.clinic = SaveStuffService.getClinic();
		console.log($scope.clinic.practiceId);
		$scope.address = $scope.clinic.Address1;
		if ($scope.clinic.Address2) {
			$scope.address += ', ' + $scope.clinic.Address2;
		}
		if ($scope.clinic.Address3) {
			$scope.address += ', ' + $scope.clinic.Address3;
		}
		if ($scope.clinic.Address4) {
			$scope.address += ', ' + $scope.clinic.Address4;
		}
		if ($scope.$parent.serviceName === 'Dental') {
			$scope.doctorFirstName = $scope.clinic.DentistFirstName;
			$scope.doctorLastName = $scope.clinic.DentistSurname;

		} else if ($scope.$parent.serviceName === 'Medical') {
			$scope.doctorFirstName = $scope.clinic.DoctorFirstName;
			$scope.doctorLastName = $scope.clinic.DoctorSurname;

		} else if ($scope.$parent.serviceName === 'Optical') {
			$scope.doctorFirstName = $scope.clinic.OpticalFirstName;
			$scope.doctorLastName = $scope.clinic.OpticalSurname;

		}
		var destination = $scope.address;
		$scope.getDistancePromise = MapService.getDistance(destination);
		$scope.getDistancePromise.then(function (distancePayload) {
			$scope.clinic.distance = distancePayload.distance;
		})

	});
