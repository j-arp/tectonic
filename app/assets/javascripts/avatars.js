Avatar = {
  load: function(plates) {
    plates.each(function(){
      var target = $(this).find('span.owner');
      var id = $(this).attr('plate_id');
      Avatar.get(id,target);
    })
  },

remove: function(plates){
  plates.each(function(){
    var target = $(this).find('span.owner');
    var code = $(this).find('input').val();
    target.css('background-image', '')
    target.css('background-size', '')
    target.fadeOut('fast')
  })
},

get: function(id, target){
  var jqxhr = $.ajax({
      type: "get",
      url: '/spoils/avatar/'+ id
      })
      .success(function(response){
        target.css('background-image', 'url('+ response + ')')
        target.css('background-size', '36px')
        target.css('background-color', '#fff')
        target.css('display', 'block')
        target.css('border', 'thin solid #ccc')
        target.fadeIn('slow', 1)
      })
      .error(function(response){
        Tectonic.handleError(response);
      })
  },

  preload: function(plates) {
    plates.each(function(){
      var target = $(this).find('span.owner');
      var code = $(this).attr('plate_code');

      target.css('background-image', 'url(/img/preloader.gif)')
      target.css('background-color', '')
      target.css('background-size', '36px')
      target.css('border', 'none')
      target.css('opacity', '.8')
      target.css('display', 'block')
      target.fadeIn('slow', 1)
    })
  },

  preUnload: function(plates) {
    plates.each(function(){
      var target = $(this).find('span.owner');
      var code = $(this).attr('plate_code');

      target.css('background-image', 'none')

    })
  }
}
