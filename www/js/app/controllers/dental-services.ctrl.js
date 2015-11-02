avivaApp.controller('dentalServicesCtrl', function ($scope) {
	$scope.$parent.service = 1;
	$scope.$parent.getDentalClinics();
	$scope.$parent.navbarClass = "dental-navbar";
	$scope.loadingDone = true;
});