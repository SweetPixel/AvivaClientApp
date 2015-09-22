avivaApp.controller('dentalAdviceCtrl', function ($scope, $location) {
	$scope.question = "";
	$scope.submitQuestion = function () {
		if ($scope.question !== "") {
			Materialize.toast('Your question has been received.', 4000)
		}
		else {
			Materialize.toast('Please write something.', 4000)
		}
	}
});