avivaApp.controller('personalDetailsCtrl', function ($http, $scope) {
	$scope.user = {
		UserId: '',
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: ''
	};
	var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/Personal';
	$http.put(url, $scope.user)
		.success(function (response) {
			$location.path('/settings');
			Materialize.toast("Personal Details Updated.", 4000);
		})
		.fail(function () {

		});

});