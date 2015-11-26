'use strict';
angular.module('main')
	.controller('AddFamilyMemberCtrl', function ($log, $scope) {

		$log.log('Hello from your Controller: AddFamilyMemberCtrl in module main:. This is your controller:', this);
		$scope.datepickerObject = {
			callback: function (val) {
				console.log(val);
				$scope.datepickerObject.inputDate = val;
			}
		}

	});
