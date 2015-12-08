'use strict';
angular.module('main')
	.service('SaveStuffService', function ($log, $window, $q) {

		$log.log('Hello from your Service: SaveStuffService in module main');
		var personalDetails = '';
		var familyMember = '';
		var clinic = '';
		return {
			setClinic: function (practice) {
				clinic = practice;
			},
			getClinic: function () {
				return clinic;
			},
			setPersonalDetails: function (details) {
				personalDetails = details;
			},
			getPersonalDetails: function () {
				return personalDetails;
			},
			setFamilyMember: function (member) {
				familyMember = member;
			},
			getFamilyMember: function () {
				var deferred = $q.defer();
				deferred.resolve({
					familyMember: familyMember
				});
				return deferred.promise;
			},
			setStoredData: function (key, data, serviceName) {
				var name;
				if (serviceName !== '') {
					name = serviceName + key;
					console.log('Saving ' + key + ' as ' + name + ' into localStorage.');
				} else {
					name = key;
					console.log('Saving ' + key + ' as ' + name + ' into localStorage.');
				}
				/*var IS_JSON = true;
				try {
					var json = JSON.parse(data);
				} catch (err) {
					IS_JSON = false;
				}
				if (IS_JSON) {
					console.log('is json');
				} else {
					console.log('not json');
					$window.localStorage[key] = data;
				}*/
				$window.localStorage[name] = JSON.stringify(data);
			},
			getStoredData: function (key, serviceName) {
				var name;
				if (serviceName !== '') {
					name = serviceName + key;
					console.log('Getting ' + key + ' as ' + name + ' from localStorage.');
				} else {
					name = key;
					console.log('Getting ' + key + ' as ' + name + ' from localStorage.');
				}
				var stuff = $window.localStorage[name];
				var deferred = $q.defer();
				var IS_JSON = true;
				try {
					var json = JSON.parse(stuff);
				} catch (err) {
					IS_JSON = false;
				}
				if (IS_JSON) {
					deferred.resolve({
						data: JSON.parse($window.localStorage[name])
					});
				} else {
					deferred.resolve({
						data: $window.localStorage[name]
					});
				}
				return deferred.promise;
			}
		}
	});
