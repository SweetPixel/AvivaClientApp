avivaApp.controller('dentalServicesCtrl', function ($scope) {
	$scope.$parent.service = 1;
	if($scope.$parent.clinics.length > 0) {

	}
	else {
		$scope.$parent.getDentalClinics();
	}
	$scope.$parent.navbarClass = "dental-navbar";
	$scope.loadingDone = true;
});