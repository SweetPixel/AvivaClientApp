avivaApp.controller('clinicDetailCtrl', function($scope, $routeParams, mapService){
	$scope.practiceId = $routeParams.param;
	$scope.distance = "Calculating...";
	$scope.loadingDone = false;
	switch ($scope.$parent.service) {
		case 1:
			$scope.$parent.promise.then(function () {
				corrections($scope.$parent.clinics);
			});
			break;
		case 2:
			$scope.$parent.medicalPromise.then(function() {
				corrections($scope.$parent.medicalClinics);
			});
			break;
		case 3:
			$scope.$parent.opticalPromise.then(function () {
				corrections($scope.$parent.opticalClinics);
			});
			break;
	}
	corrections = function (clinics) {
		$.each(clinics, function (index, item) {
			if (item.practiceId == $scope.practiceId) {
				$scope.clinic = item;
				$scope.address = $scope.clinic.Address1;
				if ($scope.clinic.Address2) {
					$scope.address += ", " + $scope.clinic.Address2;
				}
				if ($scope.clinic.Address3) {
					$scope.address += ", " +  $scope.clinic.Address3;
				}
				if ($scope.clinic.Address4) {
					$scope.address += ", " +  $scope.clinic.Address4;
				}
				switch ($scope.$parent.service) {
					case 1:
						$scope.doctorFirstName = item.DentistFirstName;
						$scope.doctorLastName = item.DentistSurname;
						break;
					case 2:
						$scope.doctorFirstName = item.DoctorFirstName;
						$scope.doctorLastName = item.DoctorSurname;
						break;
					case 3:
						$scope.doctorFirstName = item.OpticalFirstName;
						$scope.doctorLastName = item.OpticalSurname;
						break;
				}
			}
		});
		var destination = $scope.address;
		$scope.getDistancePromise = mapService.getDistance(destination);
		$scope.getDistancePromise.then(function (distancePayload) {
			$scope.distance = distancePayload.distance;
			$scope.loadingDone = true;
		})
	}
});