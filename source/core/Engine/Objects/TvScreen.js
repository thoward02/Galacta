
class TvScreen{

  constructor(){

    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");

    this.element.width = 2048;
    this.element.height = 1024;

    this.x = 0;
    this.y = 0;

    this.r = 90;
    this.g = 247;
    this.b = 225;

    this.goUp = true;
  }


  //Called by Galacta.Engine.Scene.UpdateList
  Update(){
    if(Galacta.Engine.Vr == true){
      this.UpdateCanvas();
    }
  }


  UpdateCanvas(){
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

    let DaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let Time = Now.getHours() + ":" + Now.getMinutes() + ":" + Now.getSeconds();

    var DayName = DaysOfWeek[Now.getDay()];

    let Today = Now.getDate() + "/" + Now.getMonth() + "/" + Now.getFullYear();


    this.ctx.fillStyle = "#2CB9E8";

    this.ctx.textAlign = "center";
    this.ctx.font = "150px Kiona";

    this.ctx.fillText(Time, (this.element.width / 2) , (this.element.height / 2) - 150 );
    this.ctx.fillText(DayName, (this.element.width / 2) , (this.element.height / 2) + 0 );
    this.ctx.fillText(Today, (this.element.width / 2) , (this.element.height / 2) + 150 );

  }
}
