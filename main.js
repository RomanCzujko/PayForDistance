"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('distance');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData (form);

        if(error === 0) {
            form.classList.add('_sending');
            let response = await fetch ('sendmail.pnp', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
            }else {
                alert('Error text')
                form.classList.remove('_sending');
            }
        }
        // else {
        //     alert('text')
        // }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for (let index=0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if(emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});

// $(desktop = function() {
//     // add input listeners
//     google.maps.event.addDomListener(window, 'load', function () {
//         var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
//         var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

//         google.maps.event.addListener(from_places, 'place_changed', function () {
//             var from_place = from_places.getPlace();
//             var from_address = from_place.formatted_address;
//             $('#origin').val(from_address);
//         });

//         google.maps.event.addListener(to_places, 'place_changed', function () {
//             var to_place = to_places.getPlace();
//             var to_address = to_place.formatted_address;
//             $('#destination').val(to_address);
//         });

//     });
//     // calculate distance
//     function calculateDistance() {
//         var origin = $('#origin').val();
//         var destination = $('#destination').val();
//         var service = new google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//             {
//                 origins: [origin],
//                 destinations: [destination],
//                 travelMode: 'DRIVING',
//                 // unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
//                 unitSystem: google.maps.UnitSystem.METRIC, // kilometers and meters.
//                 avoidHighways: false,
//                 avoidTolls: false
//             }, callback);
//     }
//     // get distance results
//     function callback(response, status, car) {
//         if (status != google.maps.DistanceMatrixStatus.OK) {
//             $('#result').html(err);
//         } else {
//             var origin = response.originAddresses[0];
//             var destination = response.destinationAddresses[0];
//             if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
//                 $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
//             } else {
//                 var carName = document.getElementById('exampleFormControlSelect4').value;
//                 var car = document.getElementById('exampleFormControlSelect4');
//                 var carPrices = [1.6, 2.6, 3.6, 3.9, 6];
//                 var carIndex = car.selectedIndex;
//                 console.log(carIndex);
//                 var carSelectedPrice = carPrices[carIndex];
//                 var distance = response.rows[0].elements[0].distance;
//                 var duration = response.rows[0].elements[0].duration;
//                 console.log(response.rows[0].elements[0].distance);
//                 var distance_in_kilo = distance.value / 1000; // the kilom
//                 // var distance_in_mile = distance.value / 1609.34; // the mile
//                 var duration_text = duration.text;
//                 var duration_value = duration.value;
//                 var price_EUR = distance_in_kilo * carSelectedPrice;
//                 // $('#in_mile').text(distance_in_mile.toFixed(1));
//                 $('#in_kilo').text(`${distance_in_kilo.toFixed(1)} km`);
//                 $('#duration_text').text(duration_text);
//                 $('#duration_value').text(duration_value);
//                 $('#from').text(origin);
//                 $('#to').text(destination);
//                 $('#price_EUR').text(`${price_EUR.toFixed(1)} EUR`);
//                 $('#car').text(carName);
//             }
//         }
//     }
//     // print results on submit the form
//     $('#distance_form').submit(function(e){
//         e.preventDefault();
//         calculateDistance();
//     });
// });
// $(mobile = function() {
    // add input listeners
//     google.maps.event.addDomListener(window, 'touchend', function () {
//         var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
//         var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

//         google.maps.event.addListener(from_places, 'place_changed', function () {
//             var from_place = from_places.getPlace();
//             var from_address = from_place.formatted_address;
//             $('#origin').val(from_address);
//         });

//         google.maps.event.addListener(to_places, 'place_changed', function () {
//             var to_place = to_places.getPlace();
//             var to_address = to_place.formatted_address;
//             $('#destination').val(to_address);
//         });

//     });
//     // calculate distance
//     function calculateDistance() {
//         var origin = $('#origin').val();
//         var destination = $('#destination').val();
//         var service = new google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//             {
//                 origins: [origin],
//                 destinations: [destination],
//                 travelMode: 'DRIVING',
//                 // unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
//                 unitSystem: google.maps.UnitSystem.METRIC, // kilometers and meters.
//                 avoidHighways: false,
//                 avoidTolls: false
//             }, callback);
//     }
//     function callback(response, status, car) {
//         if (status != google.maps.DistanceMatrixStatus.OK) {
//             $('#result').html(err);
//         } else {
//             var origin = response.originAddresses[0];
//             var destination = response.destinationAddresses[0];
//             if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
//                 $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
//             } else {
//                 var carName = document.getElementById('exampleFormControlSelect4').value;
//                 var car = document.getElementById('exampleFormControlSelect4');
//                 var carPrices = [1.6, 2.6, 3.6, 3.9, 6];
//                 var carIndex = car.selectedIndex;
//                 var carSelectedPrice = carPrices[carIndex];
//                 var distance = response.rows[0].elements[0].distance;
//                 var duration = response.rows[0].elements[0].duration;
//                 console.log(response.rows[0].elements[0].distance);
//                 var distance_in_kilo = distance.value / 1000; // the kilom
//                 // var distance_in_mile = distance.value / 1609.34; // the mile
//                 var duration_text = duration.text;
//                 var duration_value = duration.value;
//                 var price_EUR = distance_in_kilo * carSelectedPrice;
//                 // $('#in_mile').text(distance_in_mile.toFixed(1));
//                 $('#in_kilo').text(`${distance_in_kilo.toFixed(2)} km`);
//                 $('#duration_text').text(duration_text);
//                 $('#duration_value').text(duration_value);
//                 $('#from').text(origin);
//                 $('#to').text(destination);
//                 $('#price_EUR').text(`${price_EUR.toFixed(1)} EUR`);
//                 $('#car').text(carName);
//             }
//         }
//     }
//     // print results on submit the form
//     $('#distance_form').submit(function(e){
//         e.preventDefault();
//         calculateDistance();
//     });
// });