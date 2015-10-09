avivaApp.controller('updateFamilyCtrl', function ($http, $scope, $location, familyDetailsService) {
	$scope.member = {
		UserId: '',
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: '',
		Relation: ''
	};
	$scope.member = familyDetailsService.getMember();
	console.log("ID is " + $scope.member.FamilyID);
	$scope.updateDetails = function () {
		$scope.ASyncStarted = true;
		$scope.promise = familyDetailsService.updateMember($scope.member, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			$scope.$parent.back();
			$scope.user = payload.data;
		});
	}
});