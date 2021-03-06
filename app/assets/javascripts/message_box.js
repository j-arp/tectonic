$(document).ready(function(){

  $('#message-box #close-message-x').click(function(){
    MessageBox.log("clear box")
    MessageBox.clear()
  })

  if ( $('#message-box #message-text').text().trim().length ){
    $('#message-box').fadeIn();
  }

  if ( $('#static-message-box #message-text').text().trim().length ){
    $('#static-message-box').fadeIn();
  }

  MessageBox = {

    set: function(msg, format){
      $('#message-box').css('bottom', '-125px');

      if ( format == 'undefined'){
          format = 'normal';
        }

      this.log("set message '"  + msg + "' as " + format)

      if ( format == 'html'){
        $('#message-box #message-text').html(msg);
      }
      else {
        $('#message-box #message-text').text(msg);
      }
      $('#message-box').show();
      $("#message-box").animate({ "bottom": "+=60px" }, 900);

      setTimeout("MessageBox.clear()", Tectonic.getTimer());
      },

    clear: function(){
      $('#message-box').fadeOut('slow',function(){
        console.log('callback from fadeout');
        $('#message-box').css('bottom', '-150px', function(){
          $('#message-box #message-text').text("");
          $('#celebration').removeAttr('class');
          $('#celebration').attr('class', '');

        });
      });

      },

    log: function(m){
       console.log(m);
      }
  }
MessageBox.clear();
});
