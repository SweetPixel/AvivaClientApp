avivaApp.controller('dentalAdviceCtrl', function ($scope, $location, adviceService) {
	$scope.question = {
		'username': $scope.$parent.userId,
		'advice': ''
	};
	$scope.submitQuestion = function () {

		if ($scope.question.advice !== "") {
			$scope.promise = adviceService.submitQuestion($scope.question, $scope.$parent.service);
			$scope.promise.then(function (payload) {
				Materialize.toast('Your question has been received.', 4000);
				$scope.status = payload.status;
				console.log("status: " + $scope.status);
			})
			
		}
		else {
			Materialize.toast('Please write something.', 4000);
		}
	}
});