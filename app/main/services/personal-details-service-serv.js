'use strict';
angular.module('main')
	.service('PersonalDetailsService', function ($log) {

		$log.log('Hello from your Service: PersonalDetailsService in module main');
		var personalDetails = '';
		var familyMember = '';
		$log.log('Hello from your Service: PersonalDetails in module main');
		return {
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
				return familyMember;
			}
		}
	});
