var fillClinicsList = function() {
	$('#clinics-list').empty();
	var image;
	var rating;
	$.each(clinics, function (index, item) {
		image = _.sample(images);
		rating = _.sample(ratings);
	    $("#clinics-list").append('<li class="collection-item">'
	    	+ '<a href="../details.html?id=' + item.id + '">'
	    	+ '<div class="row">'
	    	+ '<p class="grey-text left-align">'
	    	+ '<div class="list-heading">' + item.name + '</div>'
	    	+ '<div><img style="width: 100%" src="../images/' + image + '"/>'
	    	+ '</div>'
	    	+ '<span style="float: left;">' + item.distance + '</span>'
	    	+ '<span style="float: right"><i class="mdi-action-grade"></i> ' + rating + '</span>'
	    	+ '</p></div></a></li>'
	    );
	});
};
var fillClinicItem = function(theID) {
	var object;
	
	$.each(clinics, function (index, item) {
		if(item.id === theID) {
			object = item;
		}
	});
	
	$('#c-name').text(object.name);
	$('#c-description').text(object.description);
	$('#c-distance').text(object.distance);
};
var images = ['fb.jpg', 'fb2.jpg', 'slide03.jpg'];
var ratings = ['4.6', '3', '3.2', '3'];
var clinics = [
	{
		"id": "1", 
		"name": "P S B Dental Care Ltd",
		"address": "Provincial House 41-43, Charles Street, SHEFFIELD, S1 2HU",
		"description": "May we extend a warm welcome to you from our private dental practice which was established over 90 years ago and has been in the Sheffield city centre ever since. We are now a thriving modern practice with many areas of expertise from our team of experienced dentists and our fully trained and qualified nursing and reception team. We take great pride in the quality of our dentistry and have a great passion for ensuring your visit is a pleasant experience. Our aim is good dental health for you and your family through preventive dentistry. That means giving you regular dental advice and helping you understand how to care for your teeth yourself and so reduce the need for future dental treatment.",
		"phone": "0114 2722726",
		"distance": "0.25 Km"
	},
	{
		"id": "2", 
		"name": "Montgomery Dental Care",
		"address": "1st floor 83 Infirmary Road, SHEFFIELD, S6 3BZ",
		"description": "First floor general practice in central Sheffield .We have 3 Dentists, a Dental Hygienist and a Therapist supported by a team of 6 nurses and receptionists. We have been BDA Good Practice members for 8 years and provide a full range of high quality private dental care. Our main aim is to help you understand how to maintain a healthy mouth and to give you the options of the best treatments to provide strong, beautiful teeth. We will study all your dental history and your likes dislikes and desires related to dentistry.We have special interests in implants to give fixed replacements for missing teeth and high quality gum care to prevent or heal gum disease. We are supported by high quality experienced dental technicians to produce perfect aesthetically pleasing restorations.We have the experience to meet all your dental needs.",
		"phone": "0114 2724690",
		"distance": "1.2 Km"
	},
	{
		"id": "3", 
		"name": "Six One One Oasis Dental Centre",
		"address": "Unit A1 , Wards Exchange, Ecclesall Road, Sheffield, S11 8HW",
		"description": "",
		"phone": "01142 669188",
		"distance": "1.23 Km"
	},
	{
		"id": "4", 
		"name": "611 OASIS",
		"address": "Wards House, 197 Ecclesall Road, Sheffield, s11 8hw",
		"description": "Specialist & referral practice on the outskirts of Sheffield city centre",
		"phone": "0114 266 9188",
		"distance": "1.23 Km"
	},
	{
		"id": "5", 
		"name": "Western Bank Dental Care",
		"address": "Western Bank Dental Care, C/o Occudental, 295 Western Bank, SHEFFIELD, S10 2TJ",
		"description": "Occudental was established in Sheffield 10, University district in September 2000 by the practice owner and director, Michelle Naik. We are a private only dental practice with an emphasis on providing quality, affordable treatments. We have been a BDA Good Practice for a number of years and are also Denplan Excel accredited, CQC registered and HTM01-05 Best Standard compliant. Our aim is to reduce and prevent dental disease, stabilising and preserving teeth and gums. In this way some systemic diseases such as diabetes, heart disease etc may be prevented or reduced in severity, with increased control. Regular, routine preventative and restorative dental care is provided under Denplan contracts or private “fee per item” payments. You may be able to claim some of these costs back from Westfield contributory health scheme. For all initial assessments and treatment plans please arrange an appointment with our dentists, Michelle Naik, Richard Pringle, Mary Campbell or Steven Mulligan. Advanced dental services, by our staff that have undertaken further training and have developed a special interest in Periodontics, Endodontics, Oral Surgery, Implant Placement, Orthodontics and Cosmetic treatments can be accessed by “in-house” referral, self referral or referral by general dental surgeons or doctors.",
		"phone": "0114 278 0110",
		"distance": "1.5 Km"
	},
	{
		"id": "6", 
		"name": "Occudental Private Dental Care Ltd",
		"address": "295 Western Bank, SHEFFIELD, S10 2TJ",
		"description": "Occudental was established in Sheffield 10, University district in September 2000 by the practice owner and director, Michelle Naik. We are a private only dental practice with an emphasis on providing quality, affordable treatments. We have been a BDA Good Practice for a number of years and are also Denplan Excel accredited, CQC registered and HTM01-05 Best Standard compliant. Our aim is to reduce and prevent dental disease, stabilising and preserving teeth and gums. In this way some systemic diseases such as diabetes, heart disease etc may be prevented or reduced in severity, with increased control. Regular, routine preventative and restorative dental care is provided under Denplan contracts or private “fee per item” payments. You may be able to claim some of these costs back from Westfield contributory health scheme. For all initial assessments and treatment plans please arrange an appointment with our dentists, Michelle Naik, Steph Clarke, Richard Pringle, Mary Campbell or Steven Mulligan. Advanced dental services, by our staff that have undertaken further training and have developed a special interest in Periodontics, Endodontics, Oral Surgery, Implant Placement, Orthodontics and Cosmetic treatments can be accessed by “in-house” referral, self referral or referral by general dental surgeons or doctors.",
		"phone": "0114 278 0110",
		"distance": "1.5 Km"
	},
	{
		"id": "7", 
		"name": "Orthoscene Sheffield 2",
		"address": "481 Ecclesall Road, SHEFFIELD, S11 8PP",
		"description": "We are an Orthodontic Practice with 2 Specialist Orthodontist. The Practice was opened in 2000 by Dr Sonil Kalia who owned the Practice.",
		"phone": "0114 2678797",
		"distance": "2.11 Km"
	},
	{
		"id": "8", 
		"name": "Dronfield",
		"address": "3 Stubley Lane, DRONFIELD, S18 1PE",
		"description": "The Dronfield practice is in the heart of Dronfield town and is a busy mixed practice offering NHS, Private treatments. We also offer other treatments in the practice which are, Oasis Basics, and have two specialist dentists that can offer Endodontics, Prosthetics, Periodontics, Implants, Restorative Cosmetic Dentistry and Facial Aesthetics. We also take referrals for these specialist treatments.",
		"phone": "01246 415981",
		"distance": "8.67 Km"
	},
	{
		"id": "9", 
		"name": "Dronfield",
		"address": "3 Stubley Lane, DRONFIELD, S18 1PE",
		"description": "Oasis Dental Care Dronfield is a busy mixed practice of private and NHS patients in the heart of Dronfield town. We offer a variety of NHS and private treatments, we also offer Oasis Basics.",
		"phone": "01246 415981",
		"distance": "8.67 Km"
	},
	{
		"id": "10", 
		"name": "Kiveton Practice",
		"address": "101 Wales Road, Kiveton Park, SHEFFIELD, S26 6RA ",
		"description": "TBA By Practice Manager",
		"phone": "01909770162",
		"distance": "13.96 Km"
	},
	{
		"id": "11", 
		"name": "The Holme Hall Dental Practice",
		"address": "Wardgate Way, Holme Hall, Chesterfield, S40 4SL",
		"description": "",
		"phone": "01246 201713",
		"distance": "15.06 Km"
	},
	{
		"id": "12", 
		"name": "Mexborough Practice",
		"address": "88-90, Main Street, MEXBOROUGH, S64 9EB",
		"description": "TBA By Practice Manager",
		"phone": "01709582309",
		"distance": "17.05 Km"
	},
	{
		"id": "13", 
		"name": "Conisbrough Practice",
		"address": "4 Station Road, Conisbrough, DONCASTER, DN12 3DB",
		"description": "TBA By Practice Manager",
		"phone": "01709862148",
		"distance": "19.76 Km"
	},
	{
		"id": "14", 
		"name": "The Bolsover Dental Practice",
		"address": "29 Market Place, Bolsover, Chesterfield, S44 6PN",
		"description": "",
		"phone": "01246 822348",
		"distance": "20.61 Km"
	},
	{
		"id": "15", 
		"name": "Tickhill Practice",
		"address": "12 Northgate, Tickhill, DONCASTER, DN11 9HY",
		"description": "TBA By Practice Manager",
		"phone": "01302742361",
		"distance": "24.55 Km"
	},
	{
		"id": "16", 
		"name": "The Sandringham Dental Practice",
		"address": "First Floor, 79 Sandringham Road, Intake, Doncaster, DN2 5JA",
		"description": "",
		"phone": "01302 341890",
		"distance": "29.1 Km"
	},
	{
		"id": "17", 
		"name": "Crigglestone Dental & Implant Care",
		"address": "102 High Street, Crigglestone, Wakefield, WF4 3EF",
		"description": "",
		"phone": "01924 255437",
		"distance": "29.23 Km"
	}
]