
class TvScreen{

  constructor(){

    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");

    this.Online = false;

    //Check if online
    // --- Online --- //
    this.OnlineRequest = new XMLHttpRequest();

    this.OnlineRequest.addEventListener("load", function(REQUEST){
      Galacta.Engine.Scene.BoxObj.ScreenControler1.Online = REQUEST.target.response.isOnline;
    });
    this.OnlineRequest.open("GET", "/source/core/api/isOnline.json");
    this.OnlineRequest.responseType = "json";
    this.OnlineRequest.send();
    // --------------- //

    // --- Drawing Stuff ---- //
    this.element.width = 2048;
    this.element.height = 1024;

    this.DrawTool = new DrawTool(this.ctx, this.element);

    this.x = 0;
    this.y = 0;

    //For colour pulse
    this.r = 90;
    this.g = 247;
    this.b = 225;

    this.goUp = true;
    //------------------------//

    this.MessageList = []


  }


    //Called by Galacta.Engine.Scene.UpdateList
    Update(){
      if(Galacta.Engine.Vr == true){
        this.UpdateCanvas();
      }
    }


  UpdateCanvas(){


    if(this.Online){
      this.UpdateOnline();
    }else{
      this.UpdateOffline()
    }


  }

  UpdateOnline(){
    //Clear frame for redraw
    this.ctx.clearRect(0,0, this.element.width, this.element.height);

    //Update Message List
    let Request = new XMLHttpRequest();

    Request.addEventListener("load", function(REQUEST){
      Galacta.Engine.Scene.BoxObj.ScreenControler1.MessageList = REQUEST.target.response.Messages;

    });
    Request.open("GET", "/source/core/api/Discord/DiscordMessages.json");
    Request.responseType = "json";
    Request.send();

    // ---------- DRAW --------------//
    //Redraw frame
    this.ctx.fillStyle = "cyan";

    this.ctx.font = "40px Kiona";

    this.ctx.textAlign = "left";
    //No messages
    if(this.MessageList.length == 0){
      this.DrawTool.DrawNoMessages();
    }else{

      //Draw message background
      this.DrawTool.DrawMessages();

      let Count = -300;
      for(Object in this.MessageList){
        this.ctx.font = "50px Kiona";

        let Name = this.MessageList[Object].Name;
        let MLen = this.MessageList[Object].MLen;
        this.ctx.fillText((Name + " : "+ MLen), (this.element.width * 0.02) , (this.element.height / 2) + Count );

        Count += 100;

      }

    }



  }


  UpdateOffline(){
    //Set up colors
    if(this.goUp && this.r > 125) this.goUp = false;
    if(!this.goUp && this.r < 50) this.goUp = true;

    if(this.goUp) this.r++;
    if(!this.goUp) this.r--;

    //Draw
    this.ctx.clearRect(0,0, this.element.width, this.element.height);

    this.ctx.fillStyle = "rgb(" + this.r +","+  this.g +", "+ this.b + ")";

    this.ctx.fillRect(0,0,this.element.width, this.element.height);



    const Now = new Date();

    let DaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'T h u r s d a y', 'Friday', 'Saturday'];

    let Time = Now.getHours() + ":" + Now.getMinutes() + ":" + Now.getSeconds();

    var DayName = DaysOfWeek[Now.getDay()];


    this.ctx.fillStyle = "#2CB9E8";

    this.ctx.textAlign = "center";
    this.ctx.font = "150px Kiona";

    this.ctx.fillText(DayName, (this.element.width / 2) , (this.element.height / 2) + 10 );
    this.ctx.fillText(Time, (this.element.width / 2) , (this.element.height / 2) + 400 );
    this.ctx.fillText(this.Online, (this.element.width / 2) , (this.element.height / 2) + 200 );
  }


}






//Drawing Tool

class DrawTool{

  constructor(ctx, element){

    this.ctx = ctx;
    this.element = element;

    this.LeftSide = {

      DrawLeftSide : function(ctx, element){
        this.ctx = ctx;
        this.element = element;

        let Width = (this.element.width / 5) * 1.5;
        let Height = this.element.height;

        let BColour = "#2c2f33";
        let FColour = "#ffffff";

        //DRAW Background
        this.ctx.fillStyle = BColour;
        this.ctx.fillRect(0, 0, Width, Height);


        //Draw Message Label
        this.ctx.fillStyle = FColour;
        this.ctx.font = "50px Kiona";
        this.ctx.fillText("-= Messages =-", (this.element.width / 20) , 100);


      },

      MessageMarginTop: 100,
      MessageMarginLeft: 200
    }


  }

  DrawNoMessages(){

    this.LeftSide.DrawLeftSide(this.ctx, this.element);
    this.ctx.fillText("No messages", (this.element.width / 2) , (this.element.height / 2) + 10 );


  }

  DrawMessages(){
    this.LeftSide.DrawLeftSide(this.ctx, this.element);

  }









}
