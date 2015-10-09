avivaApp.controller('wellbeingCtrl', function($scope, $routeParams, wellBeingService){
	$scope.articles = [{
		title: 'Getting articles...'
	}];
	$scope.loadingDone = false;
	
	$scope.promise = wellBeingService.getArticles($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.articles = payload.articles;

	})
});