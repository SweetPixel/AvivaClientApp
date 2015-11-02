avivaApp.controller('opticalServicesCtrl', function ($scope) {
	$scope.$parent.service = 3;
	$scope.$parent.getOpticalClinics();
	$scope.$parent.navbarClass = "optical-navbar";
	$scope.loadingDone = true;
});