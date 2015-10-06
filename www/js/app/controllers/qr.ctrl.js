avivaApp.controller('qrCtrl', function ($scope, qrService) {
	$scope.qr = [{
			allowancedate: '...',
			allowancelimit: '...',
			allowanceused: '...'
		}];
	
	$scope.promise = qrService.getQR($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.qr = payload.qr;
	})
})