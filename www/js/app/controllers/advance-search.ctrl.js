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
    /*$scope.resetPosition = function() {
        $scope.createMapPromise.then(function() {
            $scope.drawMarkersPromise.then(function() {
                advanceSearchService.removeDrawings($scope.markers, $scope.circle);
                setNearbyClinics();
            });
        });
    }*/
});
