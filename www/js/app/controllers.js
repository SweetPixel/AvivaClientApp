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
avivaApp.controller('advanceSearchCtrl', function($scope, $log, advanceSearchService) {
    $scope.data = {
        location: '',
        gender: '',
        treatment: ''
    }
    $scope.createMapPromise = advanceSearchService.createMap();
    $scope.getTreatmentsPromise = advanceSearchService.getTreatments($scope.$parent.service);
    $scope.getTreatmentsPromise.then(function (payload) {
    	$scope.treatments = payload.treatments;
    });

    $scope.search = function() {
    	$scope.showAdvanced = false;
    	if ($scope.data.location == '') {
    		alert("Please provide a location.");
    	}
    	else {
    		advanceSearchService.removeDrawings($scope.markers, $scope.circle);
	    	console.log("for treatment: " + $scope.data.treatment);
	    	$scope.getClinicsPromise = advanceSearchService.getClinics($scope.data.treatment);
	    	$scope.getClinicsPromise.then(function (payload) {
	            $scope.allPractices = payload.clinics;
	            console.log("Got practices for treatment: " + $scope.data.treatment + " - " + $scope.allPractices.length);
	            $scope.createMapPromise.then(function(payload) {
	                $scope.map = payload.map;
                    $scope.filterPracticesPromise = advanceSearchService.filterPractices($scope.data, $scope.allPractices);
                    $scope.filterPracticesPromise.then(function(payload) {
                        $scope.practices = payload.practices;
                        $scope.geocodePromise = advanceSearchService.geocode($scope.data.location);
                        $scope.geocodePromise.then(function(payload) {
                            $scope.coords = payload.coords;

                            advanceSearchService.centerMap($scope.map, $scope.coords);

                            $scope.getBoundsPromise = advanceSearchService.getBounds($scope.map, $scope.coords);
                            $scope.getBoundsPromise.then(function(payload) {
                                $scope.bounds = payload.bounds;
                                $scope.circle = payload.circle;
                                $scope.drawMarkersPromise = advanceSearchService.drawMarkers($scope.map, $scope.coords, $scope.bounds, $scope.practices);
                                $scope.drawMarkersPromise.then(function(payload) {
                                    $scope.nearbyClinics = payload.nearbyClinics;
                                    $scope.markers = payload.markers;
                                    $scope.distances = payload.distances;
                                    var clinicsCount = $scope.clinics.length;
                                    if (clinicsCount > 0) {
                                        $scope.countMessage = "The following " + clinicsCount + " practices were found within 30 kms of your location.";
                                    } else {
                                        $scope.countMessage = "No practices were found within 30 kms of your location";
                                    }
                                });
                            });
                        });
                    });
	            });
	    		
	    	});
    	}
    };
    $scope.$watch('value', function (changed) {
    	if (changed) {
    		$scope.searchResult = [];
    		$scope.getTreatmentsPromise.then(function (payload) {
    			$.each($scope.treatments, function (index, item) {
    				if (item.TreatmentName.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
    					$scope.gotSearchResult = true;
    					if ($scope.searchResult.length < 4) {
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
	$scope.gotTreatment = function (treatment) {
        $scope.gotSearchResult = false;
        $scope.data.treatment = treatment.TreatmentName;
        $scope.value = treatment.TreatmentName;
    };
    $scope.setTreatment = function (value) {
    	$scope.gotSearchResult = false;
    	$scope.data.treatment = value;
    }
    $scope.resetPosition = function() {
        $scope.createMapPromise.then(function() {
            $scope.drawMarkersPromise.then(function() {
                // advanceSearchService.removeDrawings($scope.markers, $scope.circle);
                advanceSearchService.centerMyPosition($scope.map);
            });
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
	switch ($scope.$parent.service) {
		case 1:
			$scope.$parent.promise.then(function () {
				corrections($scope.$parent.clinics);
			});
			break;
		case 2:
			$scope.$parent.medicalPromise.then(function() {
				corrections($scope.$parent.medicalClinics);
			});
			break;
		case 3:
			$scope.$parent.opticalPromise.then(function () {
				corrections($scope.$parent.opticalClinics);
			});
			break;
	}
	corrections = function (clinics) {
		$.each(clinics, function (index, item) {
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
				switch ($scope.$parent.service) {
					case 1:
						$scope.doctorFirstName = item.DentistFirstName;
						$scope.doctorLastName = item.DentistSurname;
						break;
					case 2:
						$scope.doctorFirstName = item.DoctorFirstName;
						$scope.doctorLastName = item.DoctorSurname;
						break;
					case 3:
						$scope.doctorFirstName = item.OpticalFirstName;
						$scope.doctorLastName = item.OpticalSurname;
						break;
				}
			}
		});
		var destination = $scope.address;
		$scope.getDistancePromise = mapService.getDistance(destination);
		$scope.getDistancePromise.then(function (distancePayload) {
			$scope.distance = distancePayload.distance;
			$scope.loadingDone = true;
		})
	}
});
avivaApp.controller('dentalServicesCtrl', function ($scope) {
	$scope.$parent.service = 1;
	if($scope.$parent.clinics.length > 0) {

	}
	else {
		$scope.$parent.getDentalClinics();
	}
	$scope.$parent.navbarClass = "dental-navbar";
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
avivaApp.controller('feedbackCtrl', function($http, $scope, feedbackService, $routeParams) {
	$scope.feedback = {};
	$scope.practiceId = $routeParams.param;
	console.log("getting feedback: " + $scope.$parent.service);
	$scope.loadingDone = false;
	$scope.$parent.promise.then(function () {
		$.each($scope.$parent.clinics, function (index, item) {
			if (item.practiceId == $scope.practiceId) {
				$scope.clinic = item;
			}
		});
		$scope.loadingDone = true;
	});
	$scope.submit = function () {
		$scope.feedback.practiceid = $scope.clinic.practiceId;
		$scope.feedback.username = $scope.$parent.userId;
		
		$scope.feedback.Practicecc = parseInt($scope.feedback.Practicecc, 10);
		$scope.feedback.sentertainment = parseInt($scope.feedback.sentertainment, 10);
		$scope.feedback.healthcareitem = parseInt($scope.feedback.healthcareitem, 10);
		$scope.feedback.friendlyapprochable = parseInt($scope.feedback.friendlyapprochable, 10);
		$scope.feedback.comfortlevel = parseInt($scope.feedback.comfortlevel, 10);
		$scope.feedback.practiceid = parseInt($scope.feedback.practiceid, 10);
		if ($scope.feedback.happywithproduct == "true") {
			$scope.feedback.happywithproduct = true;
		}
		else {
			$scope.feedback.happywithproduct = false;
		}
		$scope.promise = feedbackService.postFeedback($scope.feedback, $scope.$parent.service);
		$scope.promise.then(function (payload) {
			console.log("Feedback status: " + payload.status);
			$scope.$parent.back();
		})
	}
})
avivaApp.controller('findDentistCtrl', function($scope, $http, mapService, $log, $location){
	$scope.clinics = [];
	$scope.sortBy = '+distance';
	$scope.countMessage = "Searching for practices";
	$scope.loadingDone = false;
	$scope.loadNearbyDone = false;
	$scope.advancedSearch = false;
	var setNearbyClinics;

	switch ($scope.$parent.service) {
		case 1:
			console.log("case: "+1)
			$scope.$parent.promise.then(function (payload) {
				$scope.allClinics = payload.data
				beginMapping();
			},
			function (errorPayload) {
				alert("Failed to get information of clinics. Please check your connection and try again.");
				$log.error("Failure getting clinics info", errorPayload);
			});
			break;
		case 2:
			console.log("case: "+2)
			$scope.$parent.medicalPromise.then(function (payload) {
				$scope.allClinics = payload.data
				beginMapping();
			},
			function (errorPayload) {
				alert("Failed to get information of clinics. Please check your connection and try again.");
				$log.error("Failure getting clinics info", errorPayload);
			});
			break;
		case 3:
			console.log("case: "+3)
			$scope.$parent.opticalPromise.then(function (payload) {
				$scope.allClinics = payload.data
				beginMapping();
			},
			function (errorPayload) {
				alert("Failed to get information of clinics. Please check your connection and try again.");
				$log.error("Failure getting clinics info", errorPayload);
			});
			break;
	}

	beginMapping = function () {
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
						$scope.drawMarkersPromise = mapService.drawMarkers($scope.map, $scope.bounds, $scope.allClinics);
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
	}
	
	$scope.searchResult = [];
	$scope.$watch('value', function (changed) {
		if (changed) {
			$scope.searchResult = [];
			switch ($scope.$parent.service) {
				case 1:
					$scope.$parent.promise.then(function (payload) {
						$.each($scope.$parent.clinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							}
						});
					});
					break;
				case 2:
					$scope.$parent.medicalPromise.then(function (payload) {
						$.each($scope.$parent.medicalClinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							}
						});
					});
					break;
				case 3:
					$scope.$parent.opticalPromise.then(function (payload) {
						$.each($scope.$parent.opticalClinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							}
						});
					});
					break;
			}
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
avivaApp.controller('getFeedbackCtrl', function($http, $scope, feedbackService, $routeParams) {
	$scope.loadingDone = false;
	$scope.practiceId = $routeParams.param;
	$scope.$parent.promise.then(function () {
		$.each($scope.$parent.clinics, function (index, item) {
			if (item.practiceId == $scope.practiceId) {
				$scope.clinic = item;
			}
		});
		$scope.loadingDone = true;
	});
	$scope.getFeedbackPromise = feedbackService.getFeedbacks($scope.$parent.userId, $scope.practiceId, $scope.$parent.service);
	$scope.getFeedbackPromise.then(function (payload) {
		$scope.feedbacks = payload.feedbacks;
		if ($scope.feedbacks.length > 1) {
			$.each($scope.feedbacks, function (index, item) {
				var total = item.Practicecc + item.sentertainment + item.healthcareitem + item.friendlyapprochable + item.comfortlevel;
				if (item.happywithproduct) {
					total = total + 5;
				}
				var mean = total / 6;
				item.totalScore = Math.floor(mean);
				$scope.isArray = true;
			});
		}
		else {
			var total = $scope.feedbacks.Practicecc + $scope.feedbacks.sentertainment + $scope.feedbacks.healthcareitem + $scope.feedbacks.friendlyapprochable + $scope.feedbacks.comfortlevel;
			if ($scope.feedbacks.happywithproduct) {
				total = total + 5;
			}
			var mean = total / 6;
			$scope.totalScore = Math.floor(mean);
			console.log( "Should show: " + $scope.totalScore);
			$scope.isArray = false;
		}
	});
})
avivaApp.controller('helpCtrl', function ($http, $scope, helpService) {
	$scope.data = {
		help: '',
		username: $scope.$parent.userId
	};
	$scope.loadingDone = true;
	$scope.submit = function () {
		$scope.ASyncStarted = true;
		$scope.promise = helpService.getHelp($scope.data);
		$scope.data.help = '';
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			$scope.status = payload.status;
			Materialize.toast('Someone will get to you soon.', 2000);
			$scope.$parent.back();
			console.log($scope.status);
		});
	};
})
avivaApp.controller('loginCtrl', function ($scope, $location, loginService) {
	$scope.credentials = {
		username: '',
		password: ''
	}
	$scope.status = '';
	$scope.login = function () {
		ProgressIndicator.showSimple(true);
		$scope.ASyncStarted = true;
		$scope.promise = loginService.login($scope.credentials);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			$scope.ASyncStarted = false;
			$scope.$parent.userId = $scope.credentials.username;
			$scope.$parent.checkNotifications();
			ProgressIndicator.hide();
			if($scope.status.Status == true) {
				$location.path('/services');
			}
			
		})
	}
});
avivaApp.controller('mainCtrl', function($scope, $route, $routeParams, $location, clinicService, $log, notificationsService, $window) {
	var history = [];
	$scope.navbar = 'navbar.html';
	$scope.mapView = 1;
	$scope.service = 1;

	$scope.userId = "";

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
			if($scope.mapView == 1) {
				// var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
				// $location.path(prevUrl);
				$window.history.back();
			}
			else {
				$scope.mapView = 1;
			}
		}
		else {
			// var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			// $location.path(prevUrl);
			$window.history.back();
		}
	}
	$scope.clinics = [];
	//Async get clinics detail
	$scope.getDentalClinics = function () {
		$scope.promise = clinicService.getClinic();
		console.log("Called get dental clinics");
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
	$scope.checkNotifications = function () {
		$scope.notificationsPromise = notificationsService.getNotifications($scope.userId);
		$scope.notificationsPromise.then(function (payload) {
			$scope.notifications = payload.notifications;
			$scope.notificationCount = $scope.notifications.length;
			console.log("Got notifications: " + $scope.notificationCount);
		});
	}
});
avivaApp.controller('medicalServicesCtrl', function ($scope) {
	$scope.$parent.service = 2;
	if($scope.$parent.medicalClinics) {

	}
	else {
		$scope.$parent.getMedicalClinics();
	}
	$scope.$parent.navbarClass = "medical-navbar";
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
	});
	$scope.emailData = {
		claimid: '',
		email: ''
	};
	$scope.sendEmail = function () {
		$scope.emailPromise = myClaimsService.emailClaims($scope.emailData, $scope.$parent.service);
		$scope.emailPromise.then(function (payload) {
			Materialize.toast('Email Sent', 2000);
			$scope.$parent.back();
			console.log(payload.status);
		});
	};
	$scope.setClaimId = function (id) {
		console.log("ID is: " + id);

		$scope.emailData.claimid = id;
	};
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
avivaApp.controller('notificationsCtrl', function ($http, $scope, notificationsService, $timeout) {
	$scope.$parent.service = 5;
	$scope.$parent.navbarClass = "notifications-navbar";
	$scope.loadingDone = false;
	$scope.$parent.notificationsPromise.then(function () {
		$scope.loadingDone = true;
		$scope.notifications = $scope.$parent.notifications;
		$scope.notificationCount = $scope.$parent.notificationCount;
	});
	$scope.seenNotifications = [{
		'id': '',
		'username': $scope.$parent.userId
	}];
	$timeout(function () {
		console.log("makeseen called");
		$scope.makeSeenPromise = notificationsService.makeSeen($scope.$parent.userId);
		$scope.makeSeenPromise.then(function (payload) {
			console.log(payload.status);
		});
	}, 5000);
	
})
avivaApp.controller('opticalServicesCtrl', function ($scope) {
	$scope.$parent.service = 3;
	if($scope.$parent.opticalClinics) {

	}
	else {
		$scope.$parent.getOpticalClinics();
	}
	$scope.$parent.navbarClass = "optical-navbar";
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
		console.log("Got QR");
		$scope.qr = payload.qr;
	})
})
avivaApp.controller('settingsCtrl', function ($http, $scope, $location, settingsService) {
	$scope.$parent.service = 4;
	$scope.$parent.navbarClass = "settings-navbar";
	$scope.loadingDone = false;
	$scope.getPromise = settingsService.getNotificationIndicator($scope.$parent.userId);
	$scope.getPromise.then(function (payload) {
		$scope.indicator = payload.indicator;
		console.log("Got indicator: " + $scope.indicator);
		$scope.loadingDone = true;
	})

	//Toggle notification indicator
	$scope.setNotification = function () {
		$scope.promise = settingsService.setNotifications($scope.indicator, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			console.log("Set notifications: " + $scope.status);
		});
	}
});
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
avivaApp.controller('supportCtrl', function ($scope, supportService) {
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
avivaApp.controller('timingCtrl', function ($http, $scope, timingService, $routeParams) {
	$scope.loadingDone = false;
	$scope.practiceId = $routeParams.param;
	$scope.promise = timingService.getTiming($scope.$parent.service, $scope.practiceId);
	$scope.promise.then(function (payload) {
		console.log("Got practice timing");
		$scope.practice = payload.practice;
		$scope.loadingDone = true;
		if ($scope.practice !== null) {
			$scope.hasTiming = true;
		}
		else {
			$scope.hasTiming = false;
		}
	});
})
avivaApp.controller('treatmentCtrl', function ($scope, treatmentService, $routeParams) {
	$scope.practiceId = $routeParams.param;
	$scope.loadingDone = false;
	$scope.message = false;
	$scope.promise = treatmentService.getTreatments($scope.practiceId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.treatments = payload.treatments;
		if ($scope.treatments.length == 0) {
			$scope.message = "No treatments found for this practice.";
		}
		else {
			$scope.message = false;
		}
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