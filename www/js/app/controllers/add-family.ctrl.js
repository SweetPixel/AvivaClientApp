avivaApp.controller('addFamilyCtrl', function ($http, $scope, $location, familyDetailsService) {
	$scope.member = {
		FamilyID: '',
		UserName: $scope.$parent.userId,
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: '',
		Relation: ''
	};
	$scope.loadingDone = true;
	$scope.addMember = function () {
		$scope.ASyncStarted = true;
		$scope.promise = familyDetailsService.addMember($scope.member, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			$scope.$parent.back();
			$scope.response = payload.data;
		});
	}
});