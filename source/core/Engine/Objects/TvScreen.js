
class TvScreen{

  constructor(){

    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");

    this.element.width = 8;
    this.element.height = 8;

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

    if(this.y > 8 && !this.GoUp) this.GoUp = true;
    if(this.y < 0 && this.GoUp) this.GoUp = false;

    if(this.x > 8 && !this.GoLeft) this.GoLeft = true;
    if(this.x < 0 && this.GoLeft ) this.GoLeft = false;

    if(this.GoUp)  this.y -= 0.5;
    if(!this.GoUp) this.y += 0.5;


    if(this.GoLeft)  this.x -= 0.5;
    if(!this.GoLeft) this.x += 0.5;

    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(this.x, this.y, (-1), (1) );

  }
}
