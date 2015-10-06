avivaApp.controller('wellbeingCtrl', function($scope, $routeParams, wellBeingService){
	$scope.articles = [{
		title: 'Getting articles...'
	}];
	
	$scope.promise = wellBeingService.getArticles($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.articles = payload.articles;
	})
});