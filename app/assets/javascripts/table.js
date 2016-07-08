
Table = {
  update_points: function(player, points){
    // console.log("updating points", player.first_name, points);
    // console.log($("div.ranking[player='"  + player.first_name + " " + player.last_name + "']").html());
    // console.log($("div.ranking[player='" + player.first_name + " " + player.last_name +  "']").find('.player-points').html());
    current_points = $("div.ranking[player_id='" + player.id + "']").find(".player-points").text()
    Table.spin(
        $("div.ranking[player_id='" + player.id + "']").find(".player-points"),
        current_points,
        points
      );
  },

  spin: function(target, start_at, end_at){
      target.each(function () {
        var $this = $(this);
        jQuery({ Counter: start_at }).animate({ Counter: end_at }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
          complete: function(){
            console.log("animate callback");


            console.log("table.reorder");
            var rankings = $("#rankings-container");
            var store = [];

            rankings.find('.ranking').each(function(){
                var row = $(this);
                var player_id = row.attr('player_id')
                var sortnr = parseFloat(row.find(".player-points").text());
                console.log('storing indie row',  player_id, row.html());
                console.log("sorter nubmer is ", sortnr);
                if(!isNaN(sortnr)){
                  store.push([sortnr, player_id, row.html()]);
                }
            })

            store.sort(function(x,y){
                return y[0] - x[0];
            });

            console.log('now to reorder all', store.length, store);

            rankings.html("");

            console.log("cleared out rankings div", rankings.html());

            for(var i=0, len=store.length; i<len; i++){
                console.log("appending back", i, store[i][2]);
                rankings.append('<div class="row collapse ranking" player_id="' + store[i][1] + '">' + store[i][2] + '</div>');
            }

            store = null;


          }
        });
      });

  },

  reorder: function(){
    console.log("table.reorder");

    var rankings = $("#rankings-container").find('.ranking');
    var store = [];

    rankings.each(function(){
        var row = $(this);
        var player_id = row.attr('player_id')
        var sortnr = parseFloat(row.find(".player-points").text());
        console.log('storing indie row',  player_id, row.html());
        console.log("sorter nubmer is ", sortnr);
        if(!isNaN(sortnr)){
          store.push([sortnr, player_id, row.html()]);
        }
    })

    store.sort(function(x,y){
        return y[0] - x[0];
    });

    console.log('now to reorder all', store.length, store);

    rankings.html("");

    for(var i=0, len=store.length; i<len; i++){
        console.log("appending back", i, store[i][2]);
        rankings.append('<div class="row collapse ranking" player_id="' + store[i][1] + '">' + store[i][2] + '</div>');
    }

    store = null;


  }
}