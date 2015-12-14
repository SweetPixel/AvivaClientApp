'use strict';
angular.module('main', [
		'ionic',
		'ngCordova',
		'ui.router',
		'ionic-datepicker',
		// TODO: load other modules selected during generation
	])
	.config(function ($stateProvider, $urlRouterProvider) {

		// ROUTING with ui.router
		$urlRouterProvider.otherwise('/withoutNav/login');
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
						templateUrl: 'main/templates/main-menu.html',
						controller: 'MainMenuCtrl as mainMenu'
					}
				}
			})
			.state('main.serviceMenu', {
				url: '/menu/services',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/services.html',
						controller: 'ServicesCtrl as services'
					}
				}
			})
			.state('main.findPractice', {
				cache: false,
				url: '/menu/services/find-practice',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/find-practice.html',
						controller: 'FindPracticeCtrl as findPractice'
					}
				}
			})
			.state('main.advanceSearch', {
				url: '/menu/services/find-practice/advance-search',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/advance-search.html',
						controller: 'AdvanceSearchCtrl as findPractice'
					}
				}
			})
			//services
			.state('main.claims', {
				url: '/menu/services/claims',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/claims.html',
						controller: 'ClaimsCtrl as claims'
					}
				}
			})
			.state('main.advice', {
				url: '/menu/services/advice',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/advice.html',
						controller: 'AdviceCtrl as ctrl'
					}
				}
			})
			.state('main.support', {
				url: '/menu/services/support',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/support.html',
						controller: 'SupportCtrl as ctrl'
					}
				}
			})
			.state('main.wellbeing', {
				url: '/menu/services/wellbeing',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/wellbeing.html',
						controller: 'WellbeingCtrl as ctrl'
					}
				}
			})
			.state('main.policy', {
				url: '/menu/services/policy',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/policy.html',
						controller: 'PolicyCtrl as ctrl'
					}
				}
			})
			//sidenav options -------------------------------------------------------------------------------------
			.state('main.notifications', {
				url: '/menu/notifications',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/side-nav/notifications.html',
						controller: 'NotificationsCtrl as ctrl'
					}
				}
			})
			.state('main.help', {
				url: '/menu/help',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/side-nav/help.html',
						controller: 'HelpCtrl as ctrl'
					}
				}
			})
			.state('main.qr', {
				url: '/menu/qr',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/side-nav/qr.html',
						controller: 'QrCtrl as qr'
					}
				}
			})
			//clinic details -------------------------------------------------------------------------------------
			.state('main.clinicDetails', {
				url: '/menu/services/find-practice/clinic/details',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/clinic-details.html',
						controller: 'ClinicDetailsCtrl as clinicDetails'
					}
				}
			})
			.state('main.booking', {
				url: '/menu/services/find-practice/clinic/booking',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/booking.html',
						controller: 'BookingCtrl as booking'
					}
				}
			})
			.state('main.treatments', {
				url: '/menu/services/find-practice/clinic/treatments',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/treatments.html',
						controller: 'TreatmentsCtrl as treatments'
					}
				}
			})
			.state('main.staff', {
				url: '/menu/services/find-practice/clinic/staff',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/staff.html',
						controller: 'StaffCtrl as staff'
					}
				}
			})
			.state('main.timing', {
				url: '/menu/services/find-practice/clinic/timing',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/timing.html',
						controller: 'TimingCtrl as timing'
					}
				}
			})
			.state('main.contact', {
				url: '/menu/services/find-practice/clinic/contact',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/contact.html',
						controller: 'ContactCtrl as contact'
					}
				}
			})
			.state('main.reviews', {
				url: '/menu/services/find-practice/clinic/reviews',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/reviews.html',
						controller: 'ReviewsCtrl as reviews'
					}
				}
			})
			.state('main.giveFeedback', {
				url: '/menu/services/find-practice/clinic/give-feedback',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/clinic-details/give-feedback.html',
						controller: 'GiveFeedbackCtrl as giveFeedback'
					}
				}
			})
			//Settings ---------------------------------------------------------------------------------------
			.state('main.settings', {
				url: '/menu/settings',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/settings.html',
						controller: 'SettingsCtrl as ctrl'
					}
				}
			})
			.state('main.personalDetails', {
				url: '/menu/settings/personal-details',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/personal-details.html',
						controller: 'PersonalDetailsCtrl as personalDetails'
					}
				}
			})
			.state('main.addFamilyMember', {
				url: '/menu/settings/add-family-member',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/add-family-member.html',
						controller: 'AddFamilyMemberCtrl as addFamilyMember'
					}
				}
			})
			.state('main.changePassword', {
				url: '/menu/settings/change-password',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/change-password.html',
						controller: 'ChangePasswordCtrl as changePassword'
					}
				}
			})
			.state('main.familyDetails', {
				url: '/menu/settings/family-details',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/family-details.html',
						controller: 'FamilyDetailsCtrl as familyDetails'
					}
				}
			})
			.state('main.updateFamilyMember', {
				url: '/menu/settings/update-family-member',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/update-family-member.html',
						controller: 'UpdateFamilyMemberCtrl as updateFamilyMember'
					}
				}
			})
			.state('main.updatePersonalDetails', {
				url: '/menu/settings/update-personal-details',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/update-personal-details.html',
						controller: 'UpdatePersonalDetailsCtrl as updatePersonalDetails'
					}
				}
			})
			.state('main.terms', {
				url: '/menu/settings/terms-conditions',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/settings/terms.html',
						controller: 'TermsCtrl as terms'
					}
				}
			})
			//Without Nav Views -------------------------------------------------------------------------------
			.state('withoutNav', {
				url: '/withoutNav',
				abstract: true,
				templateUrl: 'main/templates/without-nav/without-nav.html',
				controller: 'WithoutNavCtrl as withoutNav'
			})
			.state('withoutNav.login', {
				url: '/login',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/without-nav/login.html',
						controller: 'LoginCtrl as ctrl'
					}
				}
			})
			.state('withoutNav.logout', {
				url: '/logout',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/without-nav/logout.html',
						controller: 'LogoutCtrl as ctrl'
					}
				}
			})
			.state('withoutNav.forgot', {
				url: '/forgot',
				views: {
					'pageContent': {
						templateUrl: 'main/templates/without-nav/forgot.html',
						controller: 'ForgotCtrl as ctrl'
					}
				}
			});
	});
