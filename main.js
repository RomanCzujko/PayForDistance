$(function() {
    // add input listeners
    google.maps.event.addDomListener(window, 'touchend', function () {
        var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
        var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

                var fixEutocompleteInterval = window.setInterval(function(){
                var $container = $('body > .pac-container');
                if ($container.length == 0) return;
                // Move the autocomplete element just below the input.
                $container.appendTo($('#origin').parent());
                // The fix is finished, stop working.
                window.clearInterval(fixEutocompleteInterval);
            }, 500);

            var fixEutocompleteInterval = window.setInterval(function(){
                var $container = $('body > .pac-container');
                if ($container.length == 0) return;
                // Move the autocomplete element just below the input.
                $container.appendTo($('#address').parent());
                // The fix is finished, stop working.
                window.clearInterval(fixEutocompleteInterval);
            }, 500);

        google.maps.event.addListener(from_places, 'place_changed', function () {
            var from_place = from_places.getPlace();
            var from_address = from_place.formatted_address;
            $('#origin').val(from_address);
        });

        google.maps.event.addListener(to_places, 'place_changed', function () {
            var to_place = to_places.getPlace();
            var to_address = to_place.formatted_address;
            $('#destination').val(to_address);
        });

    });
    // calculate distance
    function calculateDistance() {
        var origin = $('#origin').val();
        var destination = $('#destination').val();
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                // unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
                unitSystem: google.maps.UnitSystem.METRIC, // kilometers and meters.
                avoidHighways: false,
                avoidTolls: false
            }, callback);
    }
    // get distance results
    function callback(response, status, car) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $('#result').html(err);
        } else {
            var origin = response.originAddresses[0];
            var destination = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
            } else {
                var car = document.querySelector('#exampleFormControlSelect4').value;
                var distance = response.rows[0].elements[0].distance;
                var duration = response.rows[0].elements[0].duration;
                console.log(response.rows[0].elements[0].distance);
                var distance_in_kilo = distance.value / 1000; // the kilom
                // var distance_in_mile = distance.value / 1609.34; // the mile
                var duration_text = duration.text;
                var duration_value = duration.value;
                var price_EUR = distance_in_kilo * 1.2;
                // $('#in_mile').text(distance_in_mile.toFixed(1));
                $('#in_kilo').text(`${distance_in_kilo.toFixed(1)} km`);
                $('#duration_text').text(duration_text);
                $('#duration_value').text(duration_value);
                $('#from').text(origin);
                $('#to').text(destination);
                $('#price_EUR').text(`${price_EUR.toFixed(1)} EUR`);
                $('#car').text(car);
            }
        }
    }
    // print results on submit the form
    $('#distance_form').submit(function(e){
        e.preventDefault();
        calculateDistance();
    });
});