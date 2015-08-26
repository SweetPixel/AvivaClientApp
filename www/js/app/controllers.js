avivaApp.controller('mainCtrl', function($scope, $route, $routeParams, $location, clinicService, $log) {
	var history = [];
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.navbar = 'navbar.html';
	$scope.$on('$routeChangeSuccess', function () {
		history.push($location.$$path);
	});
	$scope.$on('$viewContentLoaded', function () {
		$(".modal-trigger").leanModal();
	})
	$scope.back = function () {
		var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
		$location.path(prevUrl);
	}
	$scope.clinics = [];
	$scope.promiseFulfilled = false;
	//Async get clinics detail
	$scope.getClinicsInfo = function () {
		$scope.promise = clinicService.getClinic();
		$scope.promise.then(function (payload) {
			console.log("Got Payload");
			$scope.clinics = payload.data;
			$scope.promiseFulfilled = true;
		},
		function (errorPayload) {
			alert("You're not connected to the internet.");
			$log.error("Failure getting clinics info", errorPayload);
		});
	};
	$scope.getClinicsInfo();
})

avivaApp.controller('findDentistCtrl', function($scope, $http, mapService, $log){
	$scope.$parent.promise.then(function (payload) {
		mapService.makeMap.map($scope.$parent.clinics);
	},
	function (errorPayload) {
		alert("Failed to get information of clinics. Please check your connection and try again.");
		$log.error("Failure getting clinics info", errorPayload);
	});
});
avivaApp.controller('nearbyCtrl', ['$scope', function($scope){
	$scope.sortBy = '+distance';
}])
avivaApp.controller('wellbeingCtrl', function($scope, $routeParams){
	$scope.articles = [
		{
			'title': 'Corpora Dental Plan',
			'content': 'We are a dedicated provider of dental care aimed at the corporate market. We offer individual dental plans that individual employees can sign up to, with the main focus based on disease prevention and maintenance. We also offer corporate dental plans which can be used as a benefit within a company\'s remuneration package or can be integrated and used in conjunction with a company\'s existing dental insurance. Our plans can either be company paid or as a part of a flexible benefit. Corpora Dental Plans are underwritten by Hiscox Insurance Company Ltd.'
		},
		{
			'title': 'How are we different to other Dental Plans?',
			'content': 'Corpora Dental Plans have a preferred network of dentists that are handpicked nationally. This ensures that we can find your employee\'s a same day appointment nearby to their work or home.\nCorpora Dental Plans also offer direct reimbursement so the employee does not have to pay dental fees upfront.\nCorpora Dental Plans have negotiated special prices with our dental practice network to ensure value for money for your employee\'s but they are free to take the dental plan anywhere.\nEmployee\'s can track in real time their claims being handled.\nCorpora Dental Plans provide data to HR departments so you can track how often the plans are being used which ensure employee\'s oral health is kept at an optimum level reducing their time away from work for dental emergencies.\nCorpora Dental Plans can organise onsite dentists if required.\nWe have a 24 hour helpline for your employee\'s in case of a dental emergency.\nFree oral health packs will be given to each of your staff when they join.'
		},
		{
			'title': 'At the heart of any dental plan is employee well being and reducing lost work hours',
			'content': 'Access to a dental payment plan can help support employees dental health and wellbeing as part of a company\'s health and well being strategy. Dental payment plans arranged by Corpora Dental Plan encourage regular dental attendance, to ensure employees remain dentally healthy and limits dental emergencies. Regular visits to the dentist are important not only to maintain dental health but also to ensure dental and gum disease can be found and treated quickly and simply, before they cause pain or need costly treatment. Links are being discovered between oral hygiene and health issues such as diabetes and heart conditions (Source: British Medical Journal, Department of Epidemiology and Public Health, University of London - BDHF website 28th May 2010). Serious conditions, such as oral (mouth) cancer, can be spotted early by dentists during examinations and may be prevented from developing.'
		},
		{
			'title': 'Services for employees',
			'content': 'We have a set of unique services to help employees get the most out of their chosen dental payment plan:\nThe Find a Branch service gives employees access to our link to of preferred network of dental practices.\nThe 24-Hour Worldwide Dental Emergency Helpline gives assistance to employees in times of dental emergency, wherever they are.'
		},
		{
			'title': 'An effective partnership',
			'content': 'Clients are looked after by our dedicated Account Managers, who all have significant experience in setting up and servicing dental payment plans. If you need help with any marketing such as producing leaflets, posters, handbooks and writing copy for the web or your intranet site we have experienced staff who will be able to help you do this. Corpora is very proud of its excellent customer service. Our Customer Service team are always happy to help employees with any questions they may have whether it is about finding a dentist or making a claim.'
		}
	];
})