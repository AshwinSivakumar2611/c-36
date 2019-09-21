class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val()
    });
    
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef=await database.ref('playerCount').once("value");
      if (playerCountRef.exists()){
        playerCount=playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("GAME START",120,100);
    Player.getPlayerInfo();

    if (allPlayer!==undefined){
      var display_Position = 130;
        for (var plr in allPlayer){
          if (plr==="Player"+player.index)
            fill ("red");
          else 
            fill ("black");
          display_Position += 20;
          textSize(15);
          text(allPlayer[plr].name+":"+allPlayer[plr].distance,120,display_Position);
        }
    }

    if (keyIsDown(UP_ARROW) && player.index!==null){
      player.distance += 50;
      player.update();
    }
  }

}
