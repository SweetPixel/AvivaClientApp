avivaApp.controller('familyDetailsCtrl', function ($log, $http, $scope, $location, familyDetailsService) {
	$scope.family = [
		{
			FirstName: '...',
			LastName : '',
			Email: '...',
			Dob: '...',
			Gender: '...',
			Relation: '...'
		}
	];
	$scope.loadingDone = false;
	$scope.promise = familyDetailsService.getDetails($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.family = payload.data;

	});
	$scope.updateMember = function(familyID) {
		$.each($scope.family, function (index, value) {
			if (value.FamilyID == familyID) {
				var familyMember = value;
				familyDetailsService.setMember(familyMember);
				$location.path('/settings/family/update-family');
			}
		})
		
	}
})