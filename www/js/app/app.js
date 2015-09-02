var avivaApp = angular.module('avivaApp', ['ngRoute']);

avivaApp.config(function($routeProvider) {
	$routeProvider
		//index start
		.when('/forgot-password', {
			templateUrl: 'forgot.html'
		})
		.when('/login', {
			templateUrl: 'login.html'
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
		.when('/notifications', {
			templateUrl: 'notifications.html'
		})
		//services end
		//settings start
		.when('/settings/personal-details', {
			templateUrl: 'personal.html'
		})
		.when('/settings/family-details', {
			templateUrl: 'family.html'
		})
		//settings end
		//dentalservices start
		.when('/dental-services/find-dentist', {
			templateUrl: 'find-dentist.html',
			controller: 'findDentistCtrl'
		})
		.when('/dental-services/my-claims', {
			templateUrl: 'my-claims.html'
		})
		.when('/dental-services/feedback', {
			templateUrl: 'feedback.html'
		})
		.when('/dental-services/my-policy', {
			templateUrl: 'my-policy.html'
		})
		.when('/dental-services/support', {
			templateUrl: 'support.html'
		})
		.when('/dental-services/well-being', {
			templateUrl: 'well-being.html'
		})
		.when('/dental-services/dental-advice', {
			templateUrl: 'dental-advice.html'
		})
		//dentalservices end
		.otherwise({
			redirectTo: '/login'
		})
});