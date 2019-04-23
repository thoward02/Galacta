
class TvScreen{

  constructor(){

    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");

    this.element.width = 256;
    this.element.height = 256;

    this.x = 0;
    this.y = 0;

    this.GoUp = false;
    this.GoLeft = false

  }


  //Called by Galacta.Engine.Scene.UpdateList
  Update(){
    if(Galacta.Engine.Vr == true){
      this.UpdateCanvas();
    }
  }


  UpdateCanvas(){

    this.ctx.clearRect(0,0, this.element.width, this.element.height);

    this.DrawFunctins.DrawBackground();

  }



  DrawFunctions(){

    DrawBackground: function() {
      LinearGrad = this.ctx.createLinearGradient(0,0,256,256);

      LinearGrad.addColorStop(0, "#96FFC7");
      LinearGrad.addColorStop(1, "#76FCFF");


      this.ctx.fillStyle = LinearGrad;
      this.ctx.fillRect(0, 0, 150, 100);

    }



  }


}
