var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function (position) {
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        /*var latLng = new google.maps.LatLng(latitude, longitude);*/
        var latLng1 = new google.maps.LatLng(53.3788635,-1.4703039);
        var latLng2 = new google.maps.LatLng(53.3898514,-1.4807747);
        var latLng3 = new google.maps.LatLng(53.372874,-1.481475);
        var latLng4 = new google.maps.LatLng(53.3810141,-1.4919969);
        var latLng5 = new google.maps.LatLng(53.3810141,-1.4919969);
        var latLng6 = new google.maps.LatLng(53.3810929,-1.4921696);
        var latLng7 = new google.maps.LatLng(53.3691213,-1.4951607);
        var latLng8 = new google.maps.LatLng(53.3033355,-1.4788981);
        var latLng9 = new google.maps.LatLng(53.3408191,-1.2725897);
        var latLng10 = new google.maps.LatLng(53.2457133,-1.4696745);
        var latLng11 = new google.maps.LatLng(53.4950719,-1.2977483);
        var latLng12 = new google.maps.LatLng(53.4846862,-1.2287124);
        var latLng13 = new google.maps.LatLng(53.3408191,-1.2725897);
        var latLng14 = new google.maps.LatLng(53.3408191,-1.2725897);
        var latLng15 = new google.maps.LatLng(53.3408191,-1.2725897);
        var latLng16 = new google.maps.LatLng(53.3408191,-1.2725897);
        var latLng17 = new google.maps.LatLng(53.3408191,-1.2725897);
        var mapOptions = {
            center: latLng,
            zoom: 16
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        alert("map created");
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(-25.363882,131.044922),
            title:"Hello World!"
        });

    },
    onError: function (error) {
        alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }
};