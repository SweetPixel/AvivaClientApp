var avivaApp = angular.module('avivaApp', ['ngRoute']);

avivaApp.config(function($routeProvider) {
	$routeProvider
		//index start
		.when('/forgot-password', {
			templateUrl: 'forgot.html',
			controller: 'forgotCtrl'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'loginCtrl'
		})
		.when('/change-password', {
			templateUrl: 'change-password.html',
			controller: 'changePasswordCtrl'
		})
		//index end
		//services start
		.when('/services', {
			templateUrl: 'services.html'
		})
		.when('/settings', {
			templateUrl: 'settings.html',
			controller: 'settingsCtrl'
		})
		.when('/dental-services', {
			templateUrl: 'dental-services.html',
			controller: 'dentalServicesCtrl'
		})
		.when('/medical-services', {
			templateUrl: 'medical-services.html',
			controller: 'medicalServicesCtrl'
		})
		.when('/optical-services', {
			templateUrl: 'optical-services.html',
			controller: 'opticalServicesCtrl'
		})
		.when('/notifications', {
			templateUrl: 'notifications.html',
			controller: 'notificationsCtrl'
		})
		//services end
		//settings start
		.when('/settings/personal-details', {
			templateUrl: 'personal.html',
			controller: 'personalDetailsCtrl'
		})
		.when('/settings/update-personal', {
			templateUrl: 'update-personal.html',
			controller: 'personalDetailsCtrl'
		})
		.when('/settings/family-details', {
			templateUrl: 'family.html',
			controller: 'familyDetailsCtrl'
		})
		.when('/settings/family/update-family', {
			templateUrl: 'update-family.html',
			controller: 'updateFamilyCtrl'
		})
		.when('/settings/family/add-family', {
			templateUrl: 'add-family.html',
			controller: 'addFamilyCtrl'
		})
		.when('/terms-conditions', {
			templateUrl: 'terms-conditions.html',
			controller: 'termsConditionsCtrl'
		})
		//settings end
		//dentalservices start
		.when('/dental-services/find-dentist', {
			templateUrl: 'find-dentist.html',
			controller: 'findDentistCtrl'
		})
		.when('/services/my-claims', {
			templateUrl: 'my-claims.html',
			controller: 'myClaimsCtrl'
		})
		
		.when('/services/my-policy', {
			templateUrl: 'my-policy.html',
			controller: 'myPolicyCtrl'
		})
		.when('/dental-services/support', {
			templateUrl: 'support.html',
			controller: 'supportCtrl'
		})
		.when('/services/well-being', {
			templateUrl: 'well-being.html',
			controller: 'wellbeingCtrl'
		})
		.when('/dental-services/dental-advice', {
			templateUrl: 'dental-advice.html',
			controller: 'adviceCtrl'
		})
		.when('/dental-services/clinic-detail/:param', {
			templateUrl: 'clinic-detail.html',
			controller: 'clinicDetailCtrl'
		})
		.when('/advance-search', {
			templateUrl: 'advance-search.html',
			controller: 'advanceSearchCtrl'
		})

		.when('/clinic-detail/rating/rate/:param', {
			templateUrl: 'feedback.html',
			controller: 'feedbackCtrl'
		})
		.when('/clinic-detail/treatment/:param', {
			templateUrl: 'treatment.html',
			controller: 'treatmentCtrl'
		})
		.when('/clinic-detail/staff', {
			templateUrl: 'staff.html',
			controller: 'staffCtrl'
		})
		.when('/clinic-detail/timing', {
			templateUrl: 'timing.html'
		})
		.when('/clinic-detail/contact', {
			templateUrl: 'contact.html'
		})
		.when('/clinic-detail/rating/:param', {
			templateUrl: 'rating.html',
			controller: 'getFeedbackCtrl'
		})
		.when('/help', {
			templateUrl: 'help.html',
			controller: 'helpCtrl'
		})


		
		//dentalservices end
		.otherwise({
			redirectTo: '/login'
		})
});