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
			templateUrl: 'settings.html'
		})
		.when('/dental-services', {
			templateUrl: 'dental-services.html'
		})
		.when('/medical-services', {
			templateUrl: 'medical-services.html'
		})
		.when('/optical-services', {
			templateUrl: 'optical-services.html'
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
		.when('/settings/family-details', {
			templateUrl: 'family.html',
			controller: 'familyDetailsCtrl'
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
		.when('/dental-services/my-claims', {
			templateUrl: 'my-claims.html',
			controller: 'myClaimsCtrl'
		})
		.when('/dental-services/feedback', {
			templateUrl: 'feedback.html',
			controller: 'feedbackCtrl'
		})
		.when('/dental-services/my-policy', {
			templateUrl: 'my-policy.html',
			controller: 'myPolicyCtrl'
		})
		.when('/dental-services/support', {
			templateUrl: 'support.html',
			controller: 'supportCtrl'
		})
		.when('/dental-services/well-being', {
			templateUrl: 'well-being.html',
			controller: 'wellbeingCtrl'
		})
		.when('/dental-services/dental-advice', {
			templateUrl: 'dental-advice.html',
			controller: 'dentalAdviceCtrl'
		})
		.when('/dental-services/clinic-detail/:param', {
			templateUrl: 'clinic-detail.html'
		})

		.when('/dental-clinic-detail/treatment', {
			templateUrl: 'treatment.html'
		})
		.when('/dental-clinic-detail/staff', {
			templateUrl: 'staff.html'
		})
		.when('/dental-clinic-detail/timing', {
			templateUrl: 'timing.html'
		})
		.when('/dental-clinic-detail/contact', {
			templateUrl: 'contact.html'
		})
		.when('/dental-clinic-detail/rating', {
			templateUrl: 'rating.html'
		})


		
		//dentalservices end
		.otherwise({
			redirectTo: '/login'
		})
});