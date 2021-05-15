$('document').ready(function () {
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      amenities[id] = name;
    } else {
      delete amenities[id];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      for (const place of data) {
        $('SECTION.places').append(`<article>
                                   <div class="title_box">
                                      <h2>${place.name}</h2>
                                      <div class="price_by_night">$${place.price_by_night}</div>
                                   </div>
                                   <div class="information">
                                      <div class="max_guest">${place.max_guest} Guests</div>
                                      <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                      <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                   </div>
                                   <div class="description">${place.description}</div>
                                </article>`);
      }
    }
  });
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        $('SECTION.places').empty();
        for (const place of data) {
          $('SECTION.places').append(`<article>
                                       <div class="title_box">
                                          <h2>${place.name}</h2>
                                          <div class="price_by_night">$${place.price_by_night}</div>
                                       </div>
                                       <div class="information">
                                          <div class="max_guest">${place.max_guest} Guests</div>
                                          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                       </div>
                                       <div class="description">${place.description}</div>
                                    </article>`);
        }
        console.log(data);
      }
    });
  });
});
