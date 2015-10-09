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
	$scope.loadingDone = true;
	$scope.addMember = function () {
		$scope.ASyncStarted = true;
		$scope.promise = familyDetailsService.addMember($scope.member, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			$scope.$parent.back();
			$scope.response = payload.data;
		});
	}
});
avivaApp.controller('adviceCtrl', function ($scope, $location, adviceService) {
	$scope.question = {
		'username': $scope.$parent.userId,
		'advice': ''
	};
	$scope.submitQuestion = function () {
		$scope.ASyncStarted = true;
		if ($scope.question.advice !== "") {
			$scope.promise = adviceService.submitQuestion($scope.question, $scope.$parent.service);
			$scope.promise.then(function (payload) {
				Materialize.toast('Your question has been received.', 4000);
				$scope.ASyncStarted = false;
				$scope.$parent.back();
				$scope.status = payload.status;
				console.log("status: " + $scope.status);
			})
			
		}
		else {
			Materialize.toast('Please write something.', 4000);
		}
	}
});
avivaApp.controller('changePasswordCtrl', function ($http, changePasswordService, $location, $scope) {
	$scope.data = {
		username: $scope.$parent.userId,
		oldpassword: '',
		newpassword: ''
	};
	$scope.submit = function () {
		$scope.ASyncStarted = true;
		$scope.promise = changePasswordService.changePassword($scope.data);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			console.log("Response: " + payload.status);
			Materialize.toast('Password has been changed', 2000)
			$scope.$parent.back();
		})
	}
})
avivaApp.controller('clinicDetailCtrl', function($scope, $routeParams, mapService){
	$scope.practiceId = $routeParams.param;
	$scope.distance = "Calculating...";
	$scope.loadingDone = false;
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
			$scope.loadingDone = true;
		})
	});
});
avivaApp.controller('dentalServicesCtrl', function ($scope) {
	$scope.$parent.service = 1;
	$scope.$parent.navbar = 'dental-navbar.html';
	$scope.loadingDone = true;
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
	$scope.loadingDone = false;
	$scope.promise = familyDetailsService.getDetails($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
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
	$scope.loadingDone = true;
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
	$scope.loadingDone = false;
	$scope.loadNearbyDone = false;
	$scope.advancedSearch = false;
	var setNearbyClinics;

	$scope.$parent.promise.then(function (payload) {
		$scope.getPositionPromise = mapService.getPosition();
		$scope.getPositionPromise.then(function (positionPayload) {
			$scope.position = positionPayload.position;

			$scope.createMapPromise = mapService.createMap($scope.position);
			$scope.createMapPromise.then(function (mapPayload) {
				$scope.loadingDone = true;
				$scope.map = mapPayload.map;
				$scope.latLng = mapPayload.latLng;
				setNearbyClinics = function () {
					$scope.getBoundsPromise = mapService.getBounds($scope.latLng, $scope.map);
					$scope.getBoundsPromise.then(function (boundsPayload) {
						$scope.bounds = boundsPayload.bounds;
						$scope.circle = boundsPayload.circle;
						$scope.drawMarkersPromise = mapService.drawMarkers($scope.map, $scope.bounds, $scope.$parent.clinics);
						$scope.drawMarkersPromise.then(function (markersPayload) {
							$scope.loadNearbyDone = true;
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
		$scope.value = clinic.Postcode + ' ' + clinic.PracticeName;
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
		$scope.ASyncStarted = true;
		$scope.promise = loginService.login($scope.credentials);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			$scope.ASyncStarted = false;
			if($scope.status.Status == true) {
				$location.path('/services');
			}
			
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
	$scope.loadingDone = true;
});
avivaApp.controller('myClaimsCtrl', function ($http, $scope, myClaimsService) {
	$scope.claims = {};
	$scope.loadingDone = false;
	console.log("getting claim: " + $scope.$parent.service);
	$scope.promise = myClaimsService.getClaims($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
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
	$scope.loadingDone = false;
	
	$scope.promise = myPolicyService.getPolicy($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.policy = payload.policy;
	})
})
avivaApp.controller('opticalServicesCtrl', function ($scope) {
	$scope.$parent.service = 3;
	$scope.$parent.navbar = 'optical-navbar.html';
	$scope.loadingDone = true;
});
avivaApp.controller('personalDetailsCtrl', function ($http, $scope, $location, getPersonalService, updatePersonalService) {
	$scope.user = {
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: ''
	};
	$scope.loadingDone = false;
	$scope.promise = getPersonalService.getDetails($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Should be done");
		$scope.user = payload.data;
		$scope.user.Dob = new Date($scope.user.Dob);
		$scope.loadingDone = true;
	});
	$scope.updateDetails = function () {
		$scope.ASyncStarted = true;
		$scope.user.ID = 14;
		$scope.user.Dob = $scope.user.Dob.toString();
		$scope.user.UserName = $scope.$parent.userId;
		$scope.promise = updatePersonalService.updateDetails($scope.user);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			console.log("Response: " + payload.data);
			/*$location.path('/settings/personal-details');*/
			$scope.$parent.back();
		});
	}

});
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
avivaApp.controller('staffCtrl', function ($scope, staffService) {
	$scope.staff = [{
			FirstName: '...',
			JobTitle: '...',
			GDCNumber: '...'
		}];
	$scope.loadingDone = false;
	$scope.promise = staffService.getStaff($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		$scope.staff = payload.staff;
		$scope.loadingDone = true;
	})
})
avivaApp.controller('supportCtrl', function ($scope) {
	$scope.phone = "";
	$scope.email = "";
	
});
avivaApp.controller('termsConditionsCtrl', function ($http, $scope, termsService) {
	$scope.terms = "Getting terms and conditions...";
	$scope.loadingDone = false;
	$scope.promise = termsService.getTerms();
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.terms = payload.terms;
	})
});
avivaApp.controller('treatmentCtrl', function ($scope, treatmentService) {
	$scope.treatments = [{
			allowancedate: '...',
			allowancelimit: '...',
			allowanceused: '...'
		}];

	$scope.loadingDone = false;
	
	$scope.promise = treatmentService.getTreatments($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
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
		$scope.ASyncStarted = true;
		$scope.promise = familyDetailsService.updateMember($scope.member, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			$scope.$parent.back();
			$scope.user = payload.data;
		});
	}
});
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