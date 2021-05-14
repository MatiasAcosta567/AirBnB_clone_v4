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
});
