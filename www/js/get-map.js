var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        $('.modal-trigger').leanModal();
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function (position) {
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLng = new google.maps.LatLng(latitude, longitude);
        var latLng1 = new google.maps.LatLng(53.3788635,-1.4703039);
        var latLng2 = new google.maps.LatLng(53.3898514,-1.4807747);
        var latLng3 = new google.maps.LatLng(53.372874,-1.481475);
        var latLng4 = new google.maps.LatLng(53.3810141,-1.4919969);
        var latLng6 = new google.maps.LatLng(53.3810929,-1.4921696);
        var latLng7 = new google.maps.LatLng(53.3691213,-1.4951607);
        var latLng8 = new google.maps.LatLng(53.3033355,-1.4788981);
        var latLng9 = new google.maps.LatLng(53.3408191,-1.2725897);
        var latLng10 = new google.maps.LatLng(53.2457133,-1.4696745);
        var latLng11 = new google.maps.LatLng(53.4950719,-1.2977483);
        var latLng12 = new google.maps.LatLng(53.4846862,-1.2287124);
        var latLng13 = new google.maps.LatLng(53.2292843,-1.2920814);
        var latLng14 = new google.maps.LatLng(53.4353526,-1.110704);
        var latLng15 = new google.maps.LatLng(53.5267952,-1.1054701);
        var latLng16 = new google.maps.LatLng(53.6414957,-1.5297282);
        var mapOptions = {
            center: latLng,
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        // alert("map created");
        var marker1 = new google.maps.Marker({
            position: latLng1,
            title:""
        });
        marker1.setMap(map);
        var marker2 = new google.maps.Marker({
            position: latLng2,
            title:""
        });
        marker2.setMap(map);
        var marker3 = new google.maps.Marker({
            position: latLng3,
            title:""
        });
        marker3.setMap(map);
        var marker4 = new google.maps.Marker({
            position: latLng4,
            title:""
        });
        marker4.setMap(map);
        var marker5 = new google.maps.Marker({
            position: latLng6,
            title:""
        });
        marker5.setMap(map);
        var marker6 = new google.maps.Marker({
            position: latLng7,
            title:""
        });
        marker6.setMap(map);
        var marker7 = new google.maps.Marker({
            position: latLng8,
            title:""
        });
        marker7.setMap(map);
        var marker8 = new google.maps.Marker({
            position: latLng9,
            title:""
        });
        marker8.setMap(map);
        var marker9 = new google.maps.Marker({
            position: latLng10,
            title:""
        });
        marker9.setMap(map);
        var marker10 = new google.maps.Marker({
            position: latLng11,
            title:""
        });
        marker10.setMap(map);
        var marker11 = new google.maps.Marker({
            position: latLng12,
            title:""
        });
        marker11.setMap(map);
        var marker12 = new google.maps.Marker({
            position: latLng13,
            title:""
        });
        marker12.setMap(map);
        var marker13 = new google.maps.Marker({
            position: latLng14,
            title:""
        });
        marker13.setMap(map);
        var marker14 = new google.maps.Marker({
            position: latLng15,
            title:""
        });
        marker14.setMap(map);
        var marker15 = new google.maps.Marker({
            position: latLng16,
            title:""
        });
        marker15.setMap(map);

    },
    onError: function (error) {
        alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }
};