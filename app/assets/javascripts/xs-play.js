$(document).ready(function(){

  if ( $("#play").length > 0 ){
    Avatar.load( $('.plate.found') )

    $(document).on('click', '.player-image', function(){
      console.log('selecting player ' +  $(this).closest('.select-player').attr('player_id'));
      if ( $(this).closest('.select-player').hasClass('active-player') ) {
        $(this).closest('.select-player').removeClass('active-player')
      }
      else {
        $('.active-player').removeClass('active-player')
        $(this).closest('.select-player').addClass('active-player')
      }
    });

    $('.plate').on('click', function(){
      var plate = $(this).attr('plate_code');
      var plate_id = $(this).attr('plate_id');

      if( $(this).hasClass('found') ) {
        delete_spoil(plate, $(this))
      }
      else{
        lock(plate, $(this));
        update(plate, plate_id, $(this) )
      }
    })


    function update(plate, plate_id, cb){
      Plate.disable(cb);
      var options = {
        enableHighAccuracy: true,
        timeout: 5000
      };

      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          coord_as_string =  position.coords.latitude + "|" + position.coords.longitude
          post_update(plate, plate_id, cb, coord_as_string)
        },
        function(response){},
        options
      )
    }

    function lock(plate, cb){
      var jqxhr = $.ajax({
        type: "POST",
        url: '/spoils/lock',
        dataType: 'JSON',
        data: {
          code: plate
          }
        })
        .success(function(response){})
        .error(function(response){
          Tectonic.handleError(response);
          cb.find('span.owner').fadeOut();
          cb.css('border', 'none');
        })
      }

    function post_update(plate, plate_id, cb, coords){
      var url = '/spoils/'
      console.log($('.active-player'), $('.active-player').attr('player_id'));
      if ( $('.active-player').length ) {
          url = '/spoils/' + $('.active-player').attr('player_id')
      }

      var jqxhr = $.ajax({
        type: "POST",
        url: url,
        dataType: 'JSON',
        data: {
          code: plate,
          plate_id: plate_id,
          current_location: coords
          }
        })
        .success(function(response){
          Plate.enable(cb);
          Plate.turnOff(cb);
        })
        .error(function(response){
          Plate.enable(cb);
          Plate.turnOn(cb);
          Tectonic.handleError(response);
        })
      }

    function delete_spoil(plate, cb){
      console.log('remove spoil?');
      if (confirm("Are you sure you wan to remove this amazing spoil?")){
        var jqxhr = $.ajax({
          type: "POST",
          url: '/spoils/clear',
          dataType: 'JSON',
          data: { code: plate }
          })
          .success(function(response){
            Plate.turnOn(cb)
          })
          .error(function(response){
            Tectonic.handleError(response);
            Plate.turnOff(cb)
          })
      }

      else{
        console.log('false alarm');
      }
    }

    function getLocation(){
      navigator.geolocation.getCurrentPosition( function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        return position.coords.latitude + "::" + position.coords.longitude
      }
    )};
    }


    // media query event handler
  if (matchMedia) {
    //The same value of $small-range
    var mq = window.matchMedia("(min-width: 640px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

// media query change
function WidthChange(mq) {
  var w = $('#players').width();
  console.log(w);
  if (mq.matches) {

    if( $(document.body).hasClass('f-topbar-fixed') ) {
      //console.log('1');
    }
    else {
      //console.log('opriginal load');
    }
    w = $('#players').width();
    $( window ).scroll(function() {
      if($(document.body).hasClass('f-topbar-fixed')) {
        console.log(w);
        $('#players').css('position', 'fixed')
        $('#players').css('top', '60px')
        $('#players').css('width', w + 20)
      }
      else {

        if( !$(document.body).hasClass('f-topbar-fixed') ) {
          console.log('remove fixed');
          $('#players').css('position', 'relative')
          $('#players').css('top', '')
          $('#players').removeClass('fixed-width')
        }
      }
    });
  }
else {
  $( window ).scroll(function() {
      //console.log(5);
    }
  );
  }
}

var mq = window.matchMedia( "(max-width: 640px)" );

if (mq.matches){
  $('#players').addClass('sticky')
}

})
