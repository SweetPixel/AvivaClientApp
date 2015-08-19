var results = [];
var fillClinicsList = function() {
	$('#clinics-list').empty();
	var image;
	sortByKeyA(clinics, 'distance');
	$.each(clinics, function (index, item) {
		image = _.sample(images);
		
	    $("#clinics-list").append('<li class="collection-item">'
	    	+ '<a href="details.html?id=' + item.id + '">'
	    	+ '<div class="row">'
	    	+ '<p class="purple-text left-align">'
	    	+ '<div class="list-heading purple-text">' + item.name + '</div>'
	    	+ '<div><img style="width: 100%" src="images/' + image + '"/>'
	    	+ '</div>'
	    	+ '<span style="float: left;" class="purple-text">' + item.distance + ' KM</span>'
	    	+ '<span style="float: right;" class="purple-text"><i class="mdi-action-grade"></i> ' + item.rating + '</span>'
	    	+ '</p></div></a></li>'
	    );
	});

};
var fillClinicItem = function(theID) {
	var object;
	$.each(clinics, function (index, item) {
		if (item.id === theID) {
			object = item;
		}
	});
	
	$('#c-name').text(object.name);
	$('#c-description').text(object.description);
	$('#c-distance').text(object.distance);
	$('#c-rating').text(object.rating);
};

$('#search').on('paste keyup', function() {
	searchClinics();
})

var searchClinics = function () {
    var typed = $('#search').val();
    if (typed === "") {
        $('#search-result').empty();
        $('#result-text').text('');
        $('#map').css('display', 'block');
        $('#search-result').css('display', 'none');
    }
    else if ($.trim(typed).length > 0) {
        $('#map').css('display', 'none');
        $('#search-result').css('display', 'block');
        doSearch(typed, "#search-result");
    }
}
var sortByKeyA = function (array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
var sortByKeyB = function (array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
var doSearch = function (typed, container) {
	var image;
    if (typed == "") {
        $(container).empty();
    } else {
        var object = clinics;
        results = [];
        var typed = typed.toLowerCase();
        if (object.length > 0) {
            $(container).empty();
            for (var i = 0; i < object.length; i++) {
                var clinic = object[i];
                if (clinic.name.toLowerCase().indexOf(typed) == 0) {
                    results.push(clinic);
                }
            }
        }
        else {
            $(container).empty();
            $('#result-text').text("No practices were found.");
        }
        if (results.length > 0) {
        	$(container).empty();
        	fillSearchList(results, container);

        }
        else {
            $(container).empty();
            $('#result-text').text("No practices were found.");
        }
    }
}
$('input[name="sort"]').on('click', function() {
	var sorted = $('input[name="sort"]:checked').val();
	
	if (sorted == 0) {
		console.log("Distance a");
		results = sortByKeyA(results, 'distance');
	}
	else if (sorted == 1) {
		console.log("Distance d");
		results = sortByKeyB(results, 'distance');
	}
	else if (sorted == 2) {
		console.log("rating a");
		results = sortByKeyA(results, 'rating');
	}
	else if (sorted == 3) {
		console.log("rating d");
		results = sortByKeyB(results, 'rating');
	}
	fillSearchList(results, "#search-result");
});
var fillSearchList = function (results, container) {
	$(container).empty();
	if (results.length > 0) {
		$(container).show();
		$('#result-text').css('display', 'block');
		if (results.length == 1) {
			$('#result-text').text("The following practice was found within 30 km of Sheffield, England.");
		} else {
			$('#result-text').text("The following " + results.length + " practices were found within 30 km of Sheffield, England.");
		}
	    for (var i = 0; i < results.length; i++) {
	        var item = results[i];
	        image = _.sample(images);
	        $(container).append('<li class="collection-item">'
		    	+ '<a href="details.html?id=' + item.id + '">'
		    	+ '<div class="row">'
		    	+ '<p class="purple-text left-align">'
		    	+ '<div class="list-heading purple-text">' + item.name + '</div>'
		    	+ '<div><img style="width: 100%" src="images/' + image + '"/>'
		    	+ '</div>'
		    	+ '<span style="float: left;" class="purple-text">' + item.distance + ' KM</span>'
		    	+ '<span style="float: right" class="purple-text"><i class="mdi-action-grade"></i> ' + item.rating + '</span>'
		    	+ '</p></div></a></li>'
		    );
	    }
	}
	else {
		$('#map').show();
		$('#result-text').hide();
		$(container).hide();
	}
}
var images = ['fb.jpg', 'fb2.jpg', 'slide03.jpg'];
var ratings = [3, 3.2, 3.5, 4, 4.3, 4.7, 4.9, 3.8, 3.9, 5, 3.1, 4.2, 4.8];
var clinics = [
	{
		"id": "1", 
		"name": "P S B Dental Care Ltd",
		"address": "Provincial House 41-43, Charles Street, SHEFFIELD, S1 2HU",
		'lat': 53.3788635,
		'lng': -1.4703039,
		"description": "May we extend a warm welcome to you from our private dental practice which was established over 90 years ago and has been in the Sheffield city centre ever since. We are now a thriving modern practice with many areas of expertise from our team of experienced dentists and our fully trained and qualified nursing and reception team. We take great pride in the quality of our dentistry and have a great passion for ensuring your visit is a pleasant experience. Our aim is good dental health for you and your family through preventive dentistry. That means giving you regular dental advice and helping you understand how to care for your teeth yourself and so reduce the need for future dental treatment.",
		"phone": "0114 2722726",
		"distance": 0.25,
		"rating": _.sample(ratings)
	},
	{
		"id": "2", 
		"name": "Montgomery Dental Care",
		"address": "1st floor 83 Infirmary Road, SHEFFIELD, S6 3BZ",
		'lat': 53.3898514,
		'lng': -1.4807747,
		"description": "First floor general practice in central Sheffield .We have 3 Dentists, a Dental Hygienist and a Therapist supported by a team of 6 nurses and receptionists. We have been BDA Good Practice members for 8 years and provide a full range of high quality private dental care. Our main aim is to help you understand how to maintain a healthy mouth and to give you the options of the best treatments to provide strong, beautiful teeth. We will study all your dental history and your likes dislikes and desires related to dentistry.We have special interests in implants to give fixed replacements for missing teeth and high quality gum care to prevent or heal gum disease. We are supported by high quality experienced dental technicians to produce perfect aesthetically pleasing restorations.We have the experience to meet all your dental needs.",
		"phone": "0114 2724690",
		"distance": 1.2,
		"rating": _.sample(ratings)
	},
	{
		"id": "3", 
		"name": "Six One One Oasis Dental Centre",
		"address": "Unit A1 , Wards Exchange, Ecclesall Road, Sheffield, S11 8HW",
		'lat': 53.372874,
		'lng': -1.481475,
		"description": "",
		"phone": "01142 669188",
		"distance": 1.23,
		"rating": _.sample(ratings)
	},
	{
		"id": "4", 
		"name": "611 OASIS",
		"address": "Wards House, 197 Ecclesall Road, Sheffield, s11 8hw",
		'lat': 53.371742,
		'lng': -1.488176,
		"description": "Specialist & referral practice on the outskirts of Sheffield city centre",
		"phone": "0114 266 9188",
		"distance": 1.23,
		"rating": _.sample(ratings)
	},
	{
		"id": "5", 
		"name": "Western Bank Dental Care",
		"address": "Western Bank Dental Care, C/o Occudental, 295 Western Bank, SHEFFIELD, S10 2TJ",
		'latLng': 53.381209,
		'lng': -1.492018,
		"description": "Occudental was established in Sheffield 10, University district in September 2000 by the practice owner and director, Michelle Naik. We are a private only dental practice with an emphasis on providing quality, affordable treatments. We have been a BDA Good Practice for a number of years and are also Denplan Excel accredited, CQC registered and HTM01-05 Best Standard compliant. Our aim is to reduce and prevent dental disease, stabilising and preserving teeth and gums. In this way some systemic diseases such as diabetes, heart disease etc may be prevented or reduced in severity, with increased control. Regular, routine preventative and restorative dental care is provided under Denplan contracts or private “fee per item” payments. You may be able to claim some of these costs back from Westfield contributory health scheme. For all initial assessments and treatment plans please arrange an appointment with our dentists, Michelle Naik, Richard Pringle, Mary Campbell or Steven Mulligan. Advanced dental services, by our staff that have undertaken further training and have developed a special interest in Periodontics, Endodontics, Oral Surgery, Implant Placement, Orthodontics and Cosmetic treatments can be accessed by “in-house” referral, self referral or referral by general dental surgeons or doctors.",
		"phone": "0114 278 0110",
		"distance": 1.5,
		"rating": _.sample(ratings)
	},
	{
		"id": "6", 
		"name": "Occudental Private Dental Care Ltd",
		"address": "295 Western Bank, SHEFFIELD, S10 2TJ",
		'lat': 53.381209,
		'lng': -1.492018,
		"description": "Occudental was established in Sheffield 10, University district in September 2000 by the practice owner and director, Michelle Naik. We are a private only dental practice with an emphasis on providing quality, affordable treatments. We have been a BDA Good Practice for a number of years and are also Denplan Excel accredited, CQC registered and HTM01-05 Best Standard compliant. Our aim is to reduce and prevent dental disease, stabilising and preserving teeth and gums. In this way some systemic diseases such as diabetes, heart disease etc may be prevented or reduced in severity, with increased control. Regular, routine preventative and restorative dental care is provided under Denplan contracts or private “fee per item” payments. You may be able to claim some of these costs back from Westfield contributory health scheme. For all initial assessments and treatment plans please arrange an appointment with our dentists, Michelle Naik, Steph Clarke, Richard Pringle, Mary Campbell or Steven Mulligan. Advanced dental services, by our staff that have undertaken further training and have developed a special interest in Periodontics, Endodontics, Oral Surgery, Implant Placement, Orthodontics and Cosmetic treatments can be accessed by “in-house” referral, self referral or referral by general dental surgeons or doctors.",
		"phone": "0114 278 0110",
		"distance": 1.5,
		"rating": _.sample(ratings)
	},
	{
		"id": "7", 
		"name": "Orthoscene Sheffield 2",
		"address": "481 Ecclesall Road, SHEFFIELD, S11 8PP",
		'lat': 53.369278,
		'lng': -1.495086,
		"description": "We are an Orthodontic Practice with 2 Specialist Orthodontist. The Practice was opened in 2000 by Dr Sonil Kalia who owned the Practice.",
		"phone": "0114 2678797",
		"distance": 2.11,
		"rating": _.sample(ratings)
	},
	{
		"id": "8", 
		"name": "Dronfield",
		"address": "3 Stubley Lane, DRONFIELD, S18 1PE",
		'lat': 53.3033875,
		'lng': -1.4789373,
		"description": "The Dronfield practice is in the heart of Dronfield town and is a busy mixed practice offering NHS, Private treatments. We also offer other treatments in the practice which are, Oasis Basics, and have two specialist dentists that can offer Endodontics, Prosthetics, Periodontics, Implants, Restorative Cosmetic Dentistry and Facial Aesthetics. We also take referrals for these specialist treatments.",
		"phone": "01246 415981",
		"distance": 8.67,
		"rating": _.sample(ratings)
	},
	{
		"id": "9", 
		"name": "Dronfield",
		"address": "3 Stubley Lane, DRONFIELD, S18 1PE",
		'lat': 53.3033875,
		'lng': -1.4789373,
		"description": "Oasis Dental Care Dronfield is a busy mixed practice of private and NHS patients in the heart of Dronfield town. We offer a variety of NHS and private treatments, we also offer Oasis Basics.",
		"phone": "01246 415981",
		"distance": 8.67,
		"rating": _.sample(ratings)
	},
	{
		"id": "10", 
		"name": "Kiveton Practice",
		"address": "101 Wales Road, Kiveton Park, SHEFFIELD, S26 6RA ",
		'lat': 53.340982,
		'lng': -1.272579,
		"description": "TBA By Practice Manager",
		"phone": "01909770162",
		"distance": 13.96,
		"rating": _.sample(ratings)
	},
	{
		"id": "11", 
		"name": "The Holme Hall Dental Practice",
		"address": "Wardgate Way, Holme Hall, Chesterfield, S40 4SL",
		'lat': 53.245498,
		'lng': -1.469112,
		"description": "",
		"phone": "01246 201713",
		"distance": 15.06,
		"rating": _.sample(ratings)
	},
	{
		"id": "12", 
		"name": "Mexborough Practice",
		"address": "88-90, Main Street, MEXBOROUGH, S64 9EB",
		'lat': 53.495241,
		'lng': -1.297695,
		"description": "TBA By Practice Manager",
		"phone": "01709582309",
		"distance": 17.05,
		"rating": _.sample(ratings)
	},
	{
		"id": "13", 
		"name": "Conisbrough Practice",
		"address": "4 Station Road, Conisbrough, DONCASTER, DN12 3DB",
		'lat': 53.484881,
		'lng': -1.228723,
		"description": "TBA By Practice Manager",
		"phone": "01709862148",
		"distance": 19.76,
		"rating": _.sample(ratings)
	},
	{
		"id": "14", 
		"name": "The Bolsover Dental Practice",
		"address": "29 Market Place, Bolsover, Chesterfield, S44 6PN",
		'lat': 53.229442,
		'lng': -1.292071,
		"description": "",
		"phone": "01246 822348",
		"distance": 20.61,
		"rating": _.sample(ratings)
	},
	{
		"id": "15", 
		"name": "Tickhill Practice",
		"address": "12 Northgate, Tickhill, DONCASTER, DN11 9HY",
		'lat': 53.435548,
		'lng': -1.110715,
		"description": "TBA By Practice Manager",
		"phone": "01302742361",
		"distance": 24.55,
		"rating": _.sample(ratings)
	},
	{
		"id": "16", 
		"name": "The Sandringham Dental Practice",
		"address": "First Floor, 79 Sandringham Road, Intake, Doncaster, DN2 5JA",
		'lat': 53.526977,
		'lng': -1.105427,
		"description": "",
		"phone": "01302 341890",
		"distance": 29.1,
		"rating": _.sample(ratings)
	},
	{
		"id": "17", 
		"name": "Crigglestone Dental & Implant Care",
		"address": "102 High Street, Crigglestone, Wakefield, WF4 3EF",
		'lat': 53.641690,
		'lng': -1.529782,
		"description": "",
		"phone": "01924 255437",
		"distance": 29.23,
		"rating": _.sample(ratings)
	}
];