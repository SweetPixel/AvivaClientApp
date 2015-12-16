'use strict';
angular.module('main')
	.controller('FindPracticeCtrl', function ($log, $scope, $state, $ionicHistory, MapService, SaveStuffService, DataService, $ionicModal, $ionicLoading, lodash) {
		console.log('In service: ' + $scope.$parent.serviceName);
		$log.log('Hello from your Controller: FindPracticeCtrl in module main:. This is your controller:', this);
		$ionicModal.fromTemplateUrl('advance-search-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function () {
			console.log('opening modal');
			$scope.modal.show();
		};
		$scope.closeModal = function () {
			$scope.modal.hide();
		};
		$scope.value = {
			value: ''
		}
		$scope.sort = {
			sortBy: '+distance'
		}
		var setNearbyClinics;
		$scope.goBack = function () {
			$ionicHistory.goBack();
		}
		$scope.doOtherStuff = function () {
			$ionicLoading.hide();
			$scope.getPositionPromise = MapService.getPosition();
			$scope.getPositionPromise.then(function (positionPayload) {
				console.log('Got position true;');
				$scope.position = positionPayload.position;
				$scope.createMapPromise = MapService.createMap($scope.position);
				$scope.createMapPromise.then(function (mapPayload) {
					$scope.loadingMap = false;;

					$scope.map = mapPayload.map;
					$scope.latLng = mapPayload.latLng;
					setNearbyClinics = function () {
						$scope.getBoundsPromise = MapService.getBounds($scope.latLng, $scope.map);
						$scope.getBoundsPromise.then(function (boundsPayload) {
							$scope.bounds = boundsPayload.bounds;
							$scope.circle = boundsPayload.circle;
							$scope.drawMarkersPromise = MapService.drawMarkers($scope.map, $scope.bounds, $scope.clinics);
							$scope.drawMarkersPromise.then(function (markersPayload) {
								$scope.nearbyClinics = markersPayload.nearbyClinics;
								$scope.markers = markersPayload.markers;
								$scope.start = 0;
								$scope.end = 24;
								if ($scope.end >= $scope.nearbyClinics.length) {

									$scope.end = $scope.nearbyClinics.length;
								}
								$scope.loadMore();
								var clinicsCount = $scope.nearbyClinics.length;
								if (clinicsCount > 0) {
									$scope.countMessage = 'The following ' + clinicsCount + ' practices were found within 30 kms of your location.';
								} else {
									sweetAlert('', 'No practices were found near you.', 'info');
									$scope.countMessage = 'No practices were found within 30 kms of your location';
								}
							});
						});
					};
					setNearbyClinics();
				});
			});
			$scope.getPositionPromise.catch(function () {
				console.log('Got position false;');
				$scope.getPositionPromise = '';
				$scope.locationOK = false;
				sweetAlert('Oops...', 'We couldn\'t get your location. Please make sure your location service is on and then try again.', 'error');
			})
		};

		$scope.servedClinics = [];
		$scope.loadMore = function () {
			$scope.nextChunk = lodash.slice($scope.nearbyClinics, $scope.start, $scope.end);
			console.log('got chunk' + $scope.nextChunk.length);

			function runGetDistance() {
				$scope.getDistancePromise = MapService.calculateDistance($scope.nextChunk, $scope.latLng);
				$scope.getDistancePromise.then(function (payload) {
					var got = payload.data;
					$.each(got, function (index, item) {
						$scope.servedClinics.push(item);
					});
					console.log('Got distances ' + $scope.servedClinics.length);
					$scope.start = $scope.end;
					$scope.end = $scope.end + 24;
					if ($scope.end >= $scope.nearbyClinics.length) {
						$scope.end = $scope.nearbyClinics;
						$scope.more = false;
					}
					$scope.loadingDone = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
				$scope.getDistancePromise.catch(function (payload) {
					runGetDistance();
				});
			}
			runGetDistance();
		}
		$scope.$parent.getStoredDataPromise.then(function (payload) {
			$scope.clinics = payload.data;
			if (!$scope.clinics) {
				$ionicLoading.show({
					template: 'Getting practices...'
				});
				$scope.$parent.getServerDataPromise.then(function () {
					$scope.clinics = $scope.$parent.clinics;
					$scope.doOtherStuff();
				})
			} else {
				$scope.doOtherStuff();
			}
		});
		$scope.searchResult = [];
		$scope.$watch('value.value', function (changed) {
			if (changed) {
				$scope.searchResult = [];
				if ($scope.clinics.length < 1) {
					$scope.$parent.getServerDataPromise.then(function () {
						$.each($scope.clinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.value.searchPostcode = true;
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							} else {
								$scope.value.searchPostcode = false;
							}
						});
					})
				} else {
					$.each($scope.clinics, function (index, item) {
						if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
							$scope.gotSearchResult = true;
							$scope.value.searchPostcode = true;
							if ($scope.searchResult.length < 5) {
								$scope.searchResult.push(item);
							}
						} else {
							$scope.value.searchPostcode = false;
						}
					});
				}
			} else {
				$scope.gotSearchResult = false;
			}
		});
		$scope.drawSearchMarker = function (clinic) {
			$scope.searchInProgress = true;
			console.log('Drawing search marker for: ' + clinic.Postcode);
			$scope.gotSearchResult = false;
			$scope.value.value = clinic.Postcode + ' ' + clinic.PracticeName;
			$scope.$parent.getServerDataPromise.then(function () {
				$scope.getPositionPromise.then(function () {
					$scope.createMapPromise.then(function () {
						$scope.drawMarkersPromise.then(function () {
							$scope.searchInProgress = false;
							MapService.removeDrawings($scope.markers, $scope.circle);
							$scope.markers = MapService.drawSearchMarker($scope.map, $scope.markers, clinic);
						});
					});
				});
			});
		};
		$scope.goToClinic = function (clinic) {
			SaveStuffService.setClinic(clinic);
			$state.go('main.clinicDetails');
		}
		$scope.getTreatmentsPromise = SaveStuffService.getStoredData('treatments', $scope.$parent.serviceName);
		$scope.getTreatmentsPromise.then(function (payload) {
			$scope.treatments = payload.data;
		})
		$scope.getTreatmentsPromise = DataService.getData('', $scope.$parent.serviceName, '', 'allTreatments');
		$scope.getTreatmentsPromise.then(function (payload) {
			$scope.treatments = payload.data;
			SaveStuffService.setStoredData('treatments', $scope.treatments, $scope.$parent.serviceName);
		});
		$scope.data = {
			location: '',
			gender: '',
			treatment: ''
		}
		$scope.search = function () {
			$scope.searchInProgress = true;
			$scope.closeModal();
			if ($scope.data.location === '') {
				sweetAlert('Missing...', 'Please provide a location.', 'error');
			} else {
				MapService.removeDrawings($scope.markers, $scope.circle);
				$scope.toSearch = {
					treatment: $scope.data.treatment
				};
				$scope.getClinicsPromise = DataService.postData('', '', '', 'advanceSearch', $scope.toSearch);
				$scope.getClinicsPromise.then(function (payload) {
					$scope.allPractices = payload.data;
					$scope.createMapPromise.then(function () {
						$scope.filterPracticesPromise = MapService.filterPractices($scope.data, $scope.allPractices);
						$scope.filterPracticesPromise.then(function (payload) {
							$scope.practices = payload.practices;
							$scope.geocodePromise = MapService.geocode($scope.data.location);
							$scope.geocodePromise.then(function (payload) {
								$scope.coords = payload.coords;

								MapService.centerMap($scope.map, $scope.coords);

								$scope.getAdvanceBoundsPromise = MapService.getBounds($scope.coords, $scope.map);
								$scope.getAdvanceBoundsPromise.then(function (payload) {
									$scope.advanceBounds = payload.bounds;
									$scope.circle = payload.circle;
									$scope.drawMarkersPromise = MapService.drawAdvanceMarkers($scope.map, $scope.coords, $scope.advanceBounds, $scope.practices);
									$scope.drawMarkersPromise.then(function (payload) {
										$scope.searchInProgress = false;
										// $scope.nearbyClinics = payload.nearbyClinics;
										$scope.markers = payload.markers;
									});
								});
							});
						});
					});

				});
			}
		};
		$scope.$watch('data.treatment', function (changed) {
			if (changed) {
				$scope.treatmentResult = [];
				$scope.getTreatmentsPromise.then(function () {
					$.each($scope.treatments, function (index, item) {
						if (item.TreatmentName.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
							if (item.TreatmentName.toLowerCase() === changed.toLowerCase()) {
								$scope.gotTreatmentResult = false;
							} else {
								$scope.gotTreatmentResult = true;
								if ($scope.treatmentResult.length < 4) {
									$scope.treatmentResult.push(item);
								}
							}
						}
					});
				});
			} else {
				$scope.gotTreatmentResult = false;
			}
		});
		$scope.searchLocation = function () {
			$scope.searchInProgress = true;
			if ($scope.value.searchPostcode === false) {
				$scope.gotSearchResult = false;
				console.log('searching by location.');
				$scope.createMapPromise.then(function () {
					MapService.removeDrawings($scope.markers, $scope.circle);
					if ($scope.value.value !== '') {
						$scope.geocodePromise = MapService.geocode($scope.value.value);
						$scope.geocodePromise.then(function (payload) {
							$scope.coords = payload.coords;
							MapService.centerMap($scope.map, $scope.coords);
							$scope.getAdvanceBoundsPromise = MapService.getBounds($scope.coords, $scope.map);
							$scope.getAdvanceBoundsPromise.then(function (payload) {
								$scope.advanceBounds = payload.bounds;
								$scope.circle = payload.circle;
								$scope.drawMarkersPromise = MapService.drawAdvanceMarkers($scope.map, $scope.coords, $scope.advanceBounds, $scope.clinics);
								$scope.drawMarkersPromise.then(function (payload) {
									$scope.searchInProgress = false;
									// $scope.nearbyClinics = payload.nearbyClinics;
									$scope.markers = payload.markers;
								});
							});
						});
					}
				});
			}
		}
		$scope.gotTreatment = function (treatment) {
			$scope.data.treatment = treatment.TreatmentName;
			$scope.gotTreatmentResult = false;
		};
		$scope.resetPosition = function () {
			$scope.createMapPromise.then(function () {
				$scope.drawMarkersPromise.then(function () {
					MapService.removeDrawings($scope.markers, $scope.circle);
					setNearbyClinics();
				})

			})
		}
		$scope.$on('$locationChangeStart', function () {
			console.log('Cleaning up maps.');
			document.getElementById('map').innerHTML = '';
		});


	});
