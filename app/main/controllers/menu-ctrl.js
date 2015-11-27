'use strict';
angular.module('main')
	.controller('MenuCtrl', function ($log, $scope, $ionicLoading) {

		$log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);
		$scope.makeNavPurple = function () {
			$scope.navColor = 4;
		}
		$scope.makeNavRed = function () {
			$scope.navColor = 5;
		}
		$scope.userId = 'test@test.com';
		$scope.showLoading = function () {
			$ionicLoading.show({
				template: 'Loading...'
			});
		}
		$scope.hideLoading = function () {
			$ionicLoading.hide();
		};
		$scope.oneClinic = {
			'practiceId': 3093,
			'NameOfOrganisation': null,
			'PracticeName': 'Dental Care Centre',
			'Address1': 'Dental Care Centre',
			'Address2': '60 Dover Street',
			'Address3': null,
			'Address4': 'Canterbury Kent',
			'Postcode': 'CT1 3HD',
			'Telephone': '01227 462521',
			'DentistFirstName': 'Maarten',
			'DentistSurname': 'Tonsbeek',
			'DentistGender': null,
			'GDCRegNo': '62016',
			'Latitude': 51.2761421,
			'Longitude': 1.08400977,
			'feedback': 4,
			'treatment': null,
			'OT_Mon': '08:30 AM',
			'OT_Tue': '08:30 AM',
			'OT_Wed': 'Closed',
			'OT_Thu': '08:30 AM',
			'OT_Fri': '08:30 AM',
			'OT_Sat': '09:00 AM',
			'OT_Sun': 'Closed',
			'CT_Mon': '05:30 PM',
			'CT_Tue': '07:00 PM',
			'CT_Wed': 'Closed',
			'CT_Thu': '05:30 PM',
			'CT_Fri': '05:30 PM',
			'CT_Sat': '12:00 AM (alternate weeks)',
			'CT_Sun': 'Closed'
		}
	});
