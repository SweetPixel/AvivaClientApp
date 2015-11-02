avivaApp.controller('mainCtrl', function($scope, $route, $routeParams, $location, clinicService, $log, notificationsService) {
	var history = [];
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.navbar = 'navbar.html';
	/*$scope.dentalnavbar = 'dentalnavbarColor';
	$scope.medicalnavbar = 'medicalnavbarColor';
	$scope.opticalnavbar = 'opticalnavbarColor';
	$scope.settingsnavbar = 'settingsnavbarColor';
	$scope.notificationnavbar = 'notificationnavbarColor';*/
	$scope.mapView = 1;
	$scope.service = 1;

	$scope.userId = "test@test.com";

	$scope.$on('$routeChangeSuccess', function () {
		history.push($location.$$path);
	});
	$scope.$on('$viewContentLoaded', function () {
		$(".modal-trigger").leanModal();
	});
	$scope.showNearby = function () {
		$scope.mapView = 0;
	}
	$scope.showSearch = function () {
		$scope.mapView = 2;
	}
	$scope.back = function () {
		if($route.current.templateUrl === 'find-dentist.html') {
			if($scope.mapView == 1) {
				var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
				$location.path(prevUrl);
			}
			else {
				$scope.mapView = 1;
			}
		}
		else {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			$location.path(prevUrl);
		}
	}
	$scope.clinics = [];
	//Async get clinics detail
	$scope.getClinicsInfo = function () {
		$scope.promise = clinicService.getClinic();
		$scope.medicalPromise = clinicService.getMedical();
		$scope.opticalPromise = clinicService.getOptical();

		$scope.promise.then(function (payload) {
			console.log("Got Dental Clinics");
			$scope.clinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting dental clinics info", errorPayload);
		});

		$scope.medicalPromise.then(function (payload) {
			console.log("Got Medical Clinics");
			$scope.medicalClinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting medical clinics info", errorPayload);
		});

		$scope.opticalPromise.then(function (payload) {
			console.log("Got Optical Clinics");
			$scope.opticalClinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting optical clinics info", errorPayload);
		});
	};
	$scope.getClinicsInfo();

	//Get Notifications
	$scope.notificationCount = false;
	$scope.notificationsPromise = notificationsService.getNotifications($scope.userId);
	$scope.notificationsPromise.then(function (payload) {
		$scope.notifications = payload.notifications;
		$scope.notificationCount = $scope.notifications.length;
		console.log("Got notifications: " + $scope.notificationCount);
	});
});