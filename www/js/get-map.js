var app = {
    initialize: function () {
        alert('initialized');
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function (position) {
        alert("successeed");
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLng = new google.maps.LatLng(latitude, longitude);
        alert("got latlng");
        var mapOptions = {
            center: latLng,
            zoom: 16
        };
        alert("set position");
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        alert("map created");
    },
    onError: function (error) {
        alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }
};