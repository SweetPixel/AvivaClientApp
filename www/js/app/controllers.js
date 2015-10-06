avivaApp.controller('addFamilyCtrl', function ($http, $scope, $location, familyDetailsService) {
	$scope.member = {
		FamilyID: '',
		UserName: $scope.$parent.userId,
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: '',
		Relation: ''
	};
	$scope.addMember = function () {
		$scope.promise = familyDetailsService.addMember($scope.member, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$location.path('/settings/family-details');
			$scope.response = payload.data;
		});
	}
});
avivaApp.controller('changePasswordCtrl', function ($log, $http) {
	
})
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
avivaApp.controller('dentalServicesCtrl', function ($scope) {
	$scope.$parent.service = 1;
	$scope.$parent.navbar = 'dental-navbar.html';
});
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
	$scope.promise = familyDetailsService.getDetails($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Should be done");
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
avivaApp.controller('feedbackCtrl', function($http, $scope, feedbackService) {
	$scope.feedback = {};
	console.log("getting feedback: " + $scope.$parent.service);
	$scope.promise = feedbackService.getFeedbacks($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		console.log("Got feedback");
		$scope.feedback = payload.feedback;
	})
})
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
avivaApp.controller('loginCtrl', function ($scope, $location, loginService) {
	$scope.credentials = {
		username: '',
		password: ''
	}
	$scope.status = '';
	$scope.login = function () {
		$scope.promise = loginService.login($scope.credentials);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			console.log("logged in as: " + $scope.credentials.username + " status: " + $scope.status);
			/*$location.path('/services');*/
		})
	}
});
avivaApp.controller('mainCtrl', function($scope, $route, $routeParams, $location, clinicService, $log) {
	var history = [];
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.navbar = 'settings-navbar.html';
	$scope.dentalnavbar = 'dental-navbar.html';
	$scope.medicalnavbar = 'medical-navbar.html';
	$scope.opticalnavbar = 'optical-navbar.html';
	$scope.settingsnavbar = 'settings-navbar.html';
	$scope.notificationnavbar = 'notification-navbar.html';
	$scope.mapView = 1;
	$scope.service = 0;


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
avivaApp.controller('medicalServicesCtrl', function ($scope) {
	$scope.$parent.service = 2;
	$scope.$parent.navbar = 'medical-navbar.html';
});
avivaApp.controller('myClaimsCtrl', function ($http, $scope, myClaimsService) {
	$scope.claims = {};
	console.log("getting claim: " + $scope.$parent.service);
	$scope.promise = myClaimsService.getClaims($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.claims = payload.claims;
	})
})
avivaApp.controller('myPolicyCtrl', function ($scope, myPolicyService) {
	$scope.policy = {
		allowancedate: '...',
		allowancelimit: '...',
		allowanceused: '...'
	};
	
	$scope.promise = myPolicyService.getPolicy($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.policy = payload.policy;
	})
})
avivaApp.controller('opticalServicesCtrl', function ($scope) {
	$scope.$parent.service = 3;
	$scope.$parent.navbar = 'optical-navbar.html';
});
avivaApp.controller('personalDetailsCtrl', function ($http, $scope, $location, getPersonalService, updatePersonalService) {
	$scope.user = {
		UserID: '',
		FirstName: '...',
		LastName : '',
		Email: '...',
		Dob: '...',
		Gender: '...'
	};
	$scope.promise = getPersonalService.getDetails($scope.user);
	$scope.promise.then(function (payload) {
		console.log("Should be done");
		$scope.user = payload.data;
		console.log($scope.user.ID);
		console.log($scope.user.UserID);
		$scope.user.Dob = new Date($scope.user.Dob);
	});
	$scope.updateDetails = function () {
		$scope.user.Dob = $scope.user.Dob.toString();
		$scope.promise = updatePersonalService.updateDetails($scope.user);
		$scope.promise.then(function (payload) {
			console.log("should be updated");
			console.log(payload.data);
			$location.path('/settings');
		});
	}

});
avivaApp.controller('treatmentCtrl', function ($scope, qrService) {
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
avivaApp.controller('staffCtrl', function ($scope, staffService) {
	$scope.staff = [{
			FirstName: '...',
			JobTitle: '...',
			GDCNumber: '...'
		}];
	
	$scope.promise = staffService.getStaff($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.staff = payload.staff;
	})
})
avivaApp.controller('supportCtrl', function ($scope, supportService) {
	$scope.phone = "";
	$scope.email = "";
	
});
avivaApp.controller('termsConditionsCtrl', function ($http, $scope, termsService) {
	$scope.terms = "Getting terms and conditions...";

	$scope.promise = termsService.getTerms();
	$scope.promise.then(function (payload) {
		$scope.terms = payload.terms;
	})
});
avivaApp.controller('treatmentCtrl', function ($scope, treatmentService) {
	$scope.treatments = [{
			allowancedate: '...',
			allowancelimit: '...',
			allowanceused: '...'
		}];
	
	$scope.promise = treatmentService.getTreatments($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.treatments = payload.treatments;
	})
})
avivaApp.controller('updateFamilyCtrl', function ($http, $scope, $location, familyDetailsService) {
	$scope.member = {
		UserId: '',
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: '',
		Relation: ''
	};
	$scope.member = familyDetailsService.getMember();
	console.log("ID is " + $scope.member.FamilyID);
	$scope.updateDetails = function () {
		$scope.promise = familyDetailsService.updateMember($scope.member, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$location.path('/settings/family-details');
			$scope.user = payload.data;
		});
	}
});
avivaApp.controller('updatePersonalCtrl', function ($http, $scope, updateDetails) {
	$scope.user = {
		UserId: '',
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: ''
	};
	$scope.updateDetails = function () {
		$scope.promise = getPersonalService.updateDetails($scope.user);
		$scope.promise.then(function (payload) {
			console.log("Should be done");
			$scope.user = payload.data;
		});
	}

});
avivaApp.controller('wellbeingCtrl', function($scope, $routeParams, wellBeingService){
	$scope.articles = [{
		title: 'Getting articles...'
	}];
	
	$scope.promise = wellBeingService.getArticles($scope.$parent.service);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.articles = payload.articles;
	})
});