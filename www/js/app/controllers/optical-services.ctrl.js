avivaApp.controller('opticalServicesCtrl', function ($scope) {
	$scope.$parent.service = 3;
	if($scope.$parent.opticalClinics) {

	}
	else {
		$scope.$parent.getOpticalClinics();
	}
	$scope.$parent.navbarClass = "optical-navbar";
	$scope.loadingDone = true;
});