avivaApp.controller('clinicDetailCtrl', function($scope, $routeParams, mapService){
	$scope.practiceId = $routeParams.param;
	$scope.distance = "Calculating...";
	$scope.$parent.promise.then(function () {
		$.each($scope.$parent.clinics, function (index, item) {
			if (item.practiceId == $scope.practiceId) {
				$scope.clinic = item;
				$scope.address = $scope.clinic.Address1;
				if ($scope.clinic.Address2) {
					$scope.address += ", " + $scope.clinic.Address2;
				}
				if ($scope.clinic.Address3) {
					$scope.address += ", " +  $scope.clinic.Address3;
				}
				if ($scope.clinic.Address4) {
					$scope.address += ", " +  $scope.clinic.Address4;
				}
			}
		});
		var destination = $scope.address;
		$scope.getDistancePromise = mapService.getDistance(destination);
		$scope.getDistancePromise.then(function (distancePayload) {
			$scope.distance = distancePayload.distance;
		})
	});
});
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
avivaApp.controller('findDentistCtrl', function($scope, $http, mapService, $log, $location){
	$scope.clinics = [];
	$scope.sortBy = '+distance';
	$scope.countMessage = "Searching for practices";
	$scope.advancedSearch = false;
	var setNearbyClinics;

	$scope.$parent.promise.then(function (payload) {
		$scope.getPositionPromise = mapService.getPosition();
		$scope.getPositionPromise.then(function (positionPayload) {
			$scope.position = positionPayload.position;

			$scope.createMapPromise = mapService.createMap($scope.position);
			$scope.createMapPromise.then(function (mapPayload) {
				$scope.map = mapPayload.map;
				$scope.latLng = mapPayload.latLng;
				setNearbyClinics = function () {
					$scope.getBoundsPromise = mapService.getBounds($scope.latLng, $scope.map);
					$scope.getBoundsPromise.then(function (boundsPayload) {
						$scope.bounds = boundsPayload.bounds;
						$scope.circle = boundsPayload.circle;
						$scope.drawMarkersPromise = mapService.drawMarkers($scope.map, $scope.bounds, $scope.$parent.clinics);
						$scope.drawMarkersPromise.then(function (markersPayload) {
							$scope.clinics = markersPayload.nearbyClinics;
							$scope.markers = markersPayload.markers;
							$scope.distances = markersPayload.distances;
							var clinicsCount = $scope.clinics.length;
							if (clinicsCount > 0) {
								$scope.countMessage = "The following " + clinicsCount + " practices were found within 30 kms of your location.";
							}
							else {
								$scope.countMessage = "No practices were found within 30 kms of your location";
							}
						});
					});
				};
				setNearbyClinics();
			});
		});
	},
	function (errorPayload) {
		alert("Failed to get information of clinics. Please check your connection and try again.");
		$log.error("Failure getting clinics info", errorPayload);
	});
	$scope.searchResult = [];
	$scope.$watch('value', function (changed) {
		if (changed) {
			$scope.searchResult = [];
			$scope.$parent.promise.then(function () {
				$.each($scope.$parent.clinics, function (index, item) {
					if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > 0) {
						$scope.gotSearchResult = true;
						if ($scope.searchResult.length < 5) {
							$scope.searchResult.push(item);
						}
					}
				});
			});
		}
		else {
			$scope.gotSearchResult = false;
		}
	});
	$scope.drawSearchMarker = function (clinic) {
		console.log(clinic.Postcode);
		$scope.gotSearchResult = false;
		$scope.createMapPromise.then(function () {
			$scope.drawMarkersPromise.then(function () {
				mapService.removeDrawings($scope.markers, $scope.circle);
				$scope.markers = mapService.drawSearchMarker($scope.map, $scope.markers, clinic);
			});
		});
	};
	$scope.resetPosition = function () {
		$scope.createMapPromise.then(function () {
			$scope.drawMarkersPromise.then(function () {
				mapService.removeDrawings($scope.markers, $scope.circle);
				setNearbyClinics();
			});
		});
	}
});
avivaApp.controller('loginCtrl', function ($scope, $location) {
	$scope.username;
	$scope.password;
	$scope.login = function () {
		$location.path('/services');
		/*if ($scope.username == '' && $scope.password == '') {
			
		}
		else {
			Materialize.toast("Wrong username or password.", 4000);
		}*/
	}
});
avivaApp.controller('mainCtrl', function($scope, $route, $routeParams, $location, clinicService, $log) {
	var history = [];
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.dentalnavbar = 'dental-navbar.html';
	$scope.medicalnavbar = 'medical-navbar.html';
	$scope.opticalnavbar = 'optical-navbar.html';
	$scope.settingsnavbar = 'settings-navbar.html';
	$scope.notificationnavbar = 'notification-navbar.html';
	$scope.mapView = 1;
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
		$scope.promise.then(function (payload) {
			console.log("Got Payload");
			$scope.clinics = payload.data;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting clinics info", errorPayload);
		});
	};
	$scope.getClinicsInfo();
});
avivaApp.controller('wellbeingCtrl', function($scope, $routeParams){
	$scope.articles = [
	{
		'title': 'Corpora Dental Plan',
		'content': 'We are a dedicated provider of dental care aimed at the corporate market. We offer individual dental plans that individual employees can sign up to, with the main focus based on disease prevention and maintenance. We also offer corporate dental plans which can be used as a benefit within a company\'s remuneration package or can be integrated and used in conjunction with a company\'s existing dental insurance. Our plans can either be company paid or as a part of a flexible benefit. Corpora Dental Plans are underwritten by Hiscox Insurance Company Ltd.'
	},
	{
		'title': 'How are we different to other Dental Plans?',
		'content': 'Corpora Dental Plans have a preferred network of dentists that are handpicked nationally. This ensures that we can find your employee\'s a same day appointment nearby to their work or home.\nCorpora Dental Plans also offer direct reimbursement so the employee does not have to pay dental fees upfront.\nCorpora Dental Plans have negotiated special prices with our dental practice network to ensure value for money for your employee\'s but they are free to take the dental plan anywhere.\nEmployee\'s can track in real time their claims being handled.\nCorpora Dental Plans provide data to HR departments so you can track how often the plans are being used which ensure employee\'s oral health is kept at an optimum level reducing their time away from work for dental emergencies.\nCorpora Dental Plans can organise onsite dentists if required.\nWe have a 24 hour helpline for your employee\'s in case of a dental emergency.\nFree oral health packs will be given to each of your staff when they join.'
	},
	{
		'title': 'At the heart of any dental plan is employee well being and reducing lost work hours',
		'content': 'Access to a dental payment plan can help support employees dental health and wellbeing as part of a company\'s health and well being strategy. Dental payment plans arranged by Corpora Dental Plan encourage regular dental attendance, to ensure employees remain dentally healthy and limits dental emergencies. Regular visits to the dentist are important not only to maintain dental health but also to ensure dental and gum disease can be found and treated quickly and simply, before they cause pain or need costly treatment. Links are being discovered between oral hygiene and health issues such as diabetes and heart conditions (Source: British Medical Journal, Department of Epidemiology and Public Health, University of London - BDHF website 28th May 2010). Serious conditions, such as oral (mouth) cancer, can be spotted early by dentists during examinations and may be prevented from developing.'
	},
	{
		'title': 'Services for employees',
		'content': 'We have a set of unique services to help employees get the most out of their chosen dental payment plan:\nThe Find a Branch service gives employees access to our link to of preferred network of dental practices.\nThe 24-Hour Worldwide Dental Emergency Helpline gives assistance to employees in times of dental emergency, wherever they are.'
	},
	{
		'title': 'An effective partnership',
		'content': 'Clients are looked after by our dedicated Account Managers, who all have significant experience in setting up and servicing dental payment plans. If you need help with any marketing such as producing leaflets, posters, handbooks and writing copy for the web or your intranet site we have experienced staff who will be able to help you do this. Corpora is very proud of its excellent customer service. Our Customer Service team are always happy to help employees with any questions they may have whether it is about finding a dentist or making a claim.'
	}
	];
});