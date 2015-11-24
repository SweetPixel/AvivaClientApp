'use strict';
angular.module('main', [
		'ionic',
		'ngCordova',
		'ui.router',
		// TODO: load other modules selected during generation
	])
	.config(function ($stateProvider, $urlRouterProvider) {

		// ROUTING with ui.router
		$urlRouterProvider.otherwise('/main/menu');
		$stateProvider
		// this state is placed in the <ion-nav-view> in the index.html
			.state('main', {
				url: '/main',
				abstract: true,
				templateUrl: 'main/templates/menu.html',
				controller: 'MenuCtrl as menu'
			})
			.state('main.menu', {
				url: '/menu',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/list.html',
						// controller: '<someCtrl> as ctrl'
					}
				}
			})
			.state('main.serviceMenu', {
				url: '/menu/services',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/list.html',
						// controller: '<someCtrl> as ctrl'
					}
				}
			})
			.state('main.findPractice', {
				url: '/menu/services/find-practice',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/list-detail.html',
						// controller: '<someCtrl> as ctrl'
					}
				}
			})
			.state('main.claims', {
				url: '/menu/services/claims',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.advice', {
				url: '/menu/services/advice',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.support', {
				url: '/menu/services/support',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.wellbeing', {
				url: '/menu/services/wellbeing',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.policy', {
				url: '/menu/services/policy',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.settings', {
				url: '/menu/settings',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.notifications', {
				url: '/menu/notifications',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('main.help', {
				url: '/menu/help',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('withoutNav', {
				url: '/withoutNav',
				abstract: true,
				templateUrl: 'main/templates/without-nav.html',
				controller: 'withoutNavCtrl as withoutNav'
			})
			.state('withoutNav.login', {
				url: '/login',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			})
			.state('withoutNav.forgot', {
				url: '/forgot',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/debug.html',
						controller: 'DebugCtrl as ctrl'
					}
				}
			});
	});
