//Rewritten TVScreen

class TvScreen{

  constructor(){

    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");


    // --- Online --- //
    this.Online = false;

    //Check if debug. If debug, no need for galacta headee
    if(Galacta.Engine.debug == true){
      this.Header = "";
    }else{
      this.Header = "/Galacta"
    }
    // -------------- //

    // ---- Static Check for first creation ----- //
    this.OnlineRequest = new XMLHttpRequest();

    this.OnlineRequest.addEventListener("load", function(REQUEST){
      Galacta.Engine.Scene.BoxObj.ScreenControler1.Online = REQUEST.target.response.isOnline;
    });
    this.OnlineRequest.open("GET", this.Header+"/source/core/api/isOnline.json");
    this.OnlineRequest.responseType = "json";
    this.OnlineRequest.send();
    // ------------------------------------------ //

    // --- Drawing Stuff ---- //
    this.element.width = 2048;
    this.element.height = 1024;

    this.DrawTool = new DrawTool(this.ctx, this.element);

    this.x = 0;
    this.y = 0;

    //------------------------//

    this.MessageList = []

  }


  Update(){
    this.UpdateNetworking();

    this.UpdateCanvas();

  }


  UpdateNetworking(){

    // --- DISCORD UPDATE ----//
    let Request = new XMLHttpRequest();

    Request.addEventListener("load", function(REQUEST){
      Galacta.Engine.Scene.BoxObj.ScreenControler1.MessageList = REQUEST.target.response.Messages;

    });
    Request.open("GET", this.Header+"/source/core/api/Discord/DiscordMessages.json");
    Request.responseType = "json";
    Request.send();


  }


  UpdateCanvas(){
    console.log("UPDATE");
    //Clear Context
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);

    //Draw left side, and it's messages
    this.DrawTool.LeftSide.Draw();

    // ------ DRAW MESSAGES --------- //
    //No messages
    if(this.MessageList.length == 0){
      this.DrawTool.LeftSide.DrawNoMessages();

    }else{

      //Draw message background
      this.DrawTool.DrawMessageBackground();

      let Count = -300;
      //For each message
      for(Object in this.MessageList){
        this.ctx.font = "50px Kiona";

        let Name = this.MessageList[Object].Name;
        let MLen = this.MessageList[Object].MLen;
        this.ctx.fillText((Name + " : "+ MLen), (this.element.width * 0.02) , (this.element.height / 2) + Count );

        Count += 100;

      } //end of for

    } //end of else
    // ------------------------------------------- //



  }


}




class DrawTool{

  constructor(ctx, element){

    this.ctx = ctx;
    this.element = element;

    this.LeftSide = {

      Draw : function(ctx, element){
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
      DrawNoMessages: function(ctx, element){
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

        //Draw no messages
        let Message = "No messages at this time...";

        this.ctx.fillText(Message, (this.element.width / 20) , 100);
      },
      MessageMarginTop: 100,
      MessageMarginLeft: 200
    },


    this.RightSide = {
      Draw : function(ctx, element){
        this.ctx = ctx;
        this.element = element;

        let Width = (this.element.width / 5);

      }
    }

  }

  DrawNoMessageBackground(){

    this.LeftSide.DrawLeftSide(this.ctx, this.element);
    this.ctx.fillText("No messages", (this.element.width / 2) , (this.element.height / 2) + 10 );


  }

  DrawMessageBackground(){

    this.LeftSide.DrawLeftSide(this.ctx, this.element);
    this.RightSide.DrawRightSide(this.ctx, this.element);


  }









}
