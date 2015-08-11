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
        var latLng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: latLng,
            zoom: 16
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        alert("map created");
        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

    },
    onError: function (error) {
        alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }
};