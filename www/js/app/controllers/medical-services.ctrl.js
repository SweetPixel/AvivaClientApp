avivaApp.controller('medicalServicesCtrl', function ($scope) {
	$scope.$parent.service = 2;
	$scope.$parent.getMedicalClinics();
	$scope.$parent.navbarClass = "medical-navbar";
	$scope.loadingDone = true;
});