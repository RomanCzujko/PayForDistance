document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('distance_form');
    
    const btn02 = document.getElementById('btn02');
    
    form.addEventListener('submit', formSend);

    btn02.addEventListener('click', formSend);

    async function formSend(e) {
        // e.preventDefault();
        
        let error = formValidate(form);

        if(error === 0 ) {
        
            
        document.querySelector(".main-section").hidden=true;
        const rotateForm = document.querySelector('.front');
        rotateForm.classList.add('back')
            
          setTimeout(  function _createModal(options, e) {
            
                  const modal = document.createElement('div')
                  modal.classList.add('vmodal')
                  modal.insertAdjacentHTML(
                    'afterbegin',
                    `
                   
<div id="modal-overlay-btn" class="modal-overlay" >
  <div class="modal-window" id="modal-window-send">
    <div class="modal-header">
    <div><i class="fas fa-check-circle"></i></div>
      <span class="modal-title" id="title">Vielen Dank, dass Sie sich für unseren Chauffeurservice entschieden haben! Überprüfen Sie bitte Ihre Bestelldaten. Drücken Sie auf Akzeptieren, wenn alles richtig ist.</span>
    </div>
    <div class="modal-main">
              <div id="result" class="result-list">
    <div class="list-group">
    
    
                    <div class="list-group-item d-flex justify-content-between ">Abholort:
                        <span id="from" class="result-items"></span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between ">Zielort:
                        <span id="to" class="result-items"></span>
                    </div>

                    <div class="list-group-item d-flex justify-content-between ">Abholdatum:
                        <span id="boarding-time" class="result-items"></span>
                    </div>

                    <div class="list-group-item d-flex justify-content-between ">Abholzeit:
                        <span id="boarding-time-hours" class="result-items"></span>
                    </div>

                    <div class="list-group-item d-flex justify-content-between ">Fahrzeugtyp:
                        <span id="car" class="result-items"></span>
                    </div>

                    <div class="list-group-item d-flex justify-content-between ">Preis:
                        <span id="price_EUR" class="result-items"></span>
                    </div>
                    
                    <div class="list-group-item d-flex justify-content-between ">Entfernung:
                        <span id="in_kilo" class="result-items"></span>
                    </div>
                    
                    <div class="list-group-item d-flex justify-content-between ">Durchschnittliche Fahrzeit:
                        <span id="duration_text" name="order-date" class=" result-items "></span>
                    </div>

                    <div class="list-group-item d-flex justify-content-between ">Bestelldatum / -zeit:
                        <span id="order-time" class="result-items"></span>
                    </div>
     
        
    </div>
    </div>
    </div>
    <div class="modal-footer">
      
     
      <button id="backButton" class="modal-buttons" onclick="modalButtons()">Zurück</button>
      <button id="acceptButton" class="modal-buttons" type="submit" form="distance_form" >Akzeptieren</button>
     
      
    </div>
  </div>
</div>
                    
                    `
                  )
                  document.body.appendChild(modal)
                  return modal;
                }, 2000);
           
                   
    
                // calculate distance
          setTimeout(  function calculateDistance() {
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
            }, 2000); 
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
                        
                        var carName = document.getElementById('exampleFormControlSelect4').value;
                        var car = document.getElementById('exampleFormControlSelect4');
                        var carPrices = [0, 1.6, 2.6, 3.6, 3.9, 6];
                        var carIndex = car.selectedIndex;
        
                        var carSelectedPrice = carPrices[carIndex];
                        var distance = response.rows[0].elements[0].distance;
                        var duration = response.rows[0].elements[0].duration;
                        console.log(response.rows[0].elements[0].distance);
                        var distance_in_kilo = distance.value / 1000; // the kilom
                        // var distance_in_mile = distance.value / 1609.34; // the mile
                        var duration_text = duration.text;
                        var duration_value = duration.value;
                        var price_EUR = distance_in_kilo * carSelectedPrice;
                        var boardingTime = document.getElementById('boarding');
                        
                        var date = new Date($(boardingTime).val());
                        var options = {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        };
                        var dateStr = date.toLocaleString('de-DE', options);
                        var boardingTimeHours = document.getElementById('boarding-hours').value;
                        
                        var today = new Date().toLocaleString('de-DE');
                      
                        // $('#in_mile').text(distance_in_mile.toFixed(1));
                        $('#in_kilo').text(`${distance_in_kilo.toFixed(2)} km`);
                        $('#duration_text').text(duration_text);
                        $('#duration_value').text(duration_value);
                        $('#from').text(origin);
                        $('#to').text(destination);
                        $('#price_EUR').text(`${price_EUR.toFixed(2)} EUR`);
                        $('#car').text(carName);
                        $('#boarding-time').text(dateStr);
                        $('#boarding-time-hours').text(boardingTimeHours);
                        $('#order-time').text(today);
                        
                        $('#in_in_kilo').val(`${distance_in_kilo.toFixed(2)} km`);
                        $('#in_duration_text').val(duration_text);
                        $('#in_duration_value').val(duration_value);
                        $('#in_from').val(origin);
                        $('#in_to').val(destination);
                        $('#in_price_EUR').val(`${price_EUR.toFixed(2)} EUR`);
                        $('#in_car').val(carName);
                        $('#in_boarding-time').val(dateStr);
                        $('#in_boarding-time-hours').val(boardingTimeHours);
                        $('#in_order-time').val(today);
                        
                    }
                }
            }
            
            
              
        }
        
         else {
        form.classList.remove('_sending');
         }
    } 

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

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

$(desktop = function() {
    // add input listeners
    $('#hidden-boarding').val(boarding);
    google.maps.event.addDomListener(window, 'load', function () {
        var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
        var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

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

  
});
$(mobile = function() {
    // add input listeners
    google.maps.event.addDomListener(window, 'touchend', function () {
        var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
        var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

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

    

   
});
    

function modalButtons() {
    const backForm = document.querySelector(".main-section").hidden = false;
    
   const removeModal = document.getElementById("modal-overlay-btn");
  removeModal.remove();
  
 const rotateFormBack = document.querySelector('.front');
    rotateFormBack.classList.add('front');
 
    

}