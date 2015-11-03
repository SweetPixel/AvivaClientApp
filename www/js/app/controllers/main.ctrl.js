avivaApp.controller('mainCtrl', function($scope, $route, $routeParams, $location, clinicService, $log, notificationsService, $window) {
	var history = [];
	$scope.navbar = 'navbar.html';
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
		console.log("back clicked");
		if($route.current.templateUrl === 'find-dentist.html') {
			console.log("is find clinic view");
			if($scope.mapView == 1) {
				var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
				// $location.path(prevUrl);
				$window.history.back();
			}
			else {
				$scope.mapView = 1;
			}
		}
		else {
			console.log("not find clinic view");
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			// $location.path(prevUrl);
			$window.history.back();
		}
	}
	$scope.clinics = [];
	//Async get clinics detail
	$scope.getDentalClinics = function () {
		$scope.promise = clinicService.getClinic();

		$scope.promise.then(function (payload) {
			console.log("Got Dental Clinics");
			$scope.clinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting dental clinics info", errorPayload);
		});
	};
	$scope.getMedicalClinics = function () {
		$scope.medicalPromise = clinicService.getMedical();
		$scope.medicalPromise.then(function (payload) {
			console.log("Got Medical Clinics");
			$scope.medicalClinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting medical clinics info", errorPayload);
		});
	}
	$scope.getOpticalClinics = function () {
		$scope.opticalPromise = clinicService.getOptical();
		$scope.opticalPromise.then(function (payload) {
			console.log("Got Optical Clinics");
			$scope.opticalClinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting optical clinics info", errorPayload);
		});
	}

	//Get Notifications
	$scope.notificationCount = false;
	$scope.notificationsPromise = notificationsService.getNotifications($scope.userId);
	$scope.notificationsPromise.then(function (payload) {
		$scope.notifications = payload.notifications;
		$scope.notificationCount = $scope.notifications.length;
		console.log("Got notifications: " + $scope.notificationCount);
	});
});