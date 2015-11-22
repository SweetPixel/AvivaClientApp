var getMap = {
    initialize: function () {
        console.log("initialize");
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
        var geocoder = new google.maps.Geocoder();
        var latLng = new google.maps.LatLng(latitude, longitude);
        var latLng1 = new google.maps.LatLng(53.3788635,-1.4703039);
        var mapOptions = {
            center: latLng1,
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        // alert("map created");
        var markers = [];
        var i = 0;
        $.each(clinics, function (index, item) {
            markers[i] = new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                url: 'details.html?id=' + item.id
            });
            markers[i].setMap(map);
            i++;
        });
        $.each(markers, function(index, item) {
            item.addListener('click', function() {
                window.location.href = item.url;
            })
        })
    },
    onError: function (error) {
        console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }
};