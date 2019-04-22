
class TvScreen{

  constructor(){

    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");

    this.element.width = 8;
    this.element.height = 8;

    this.x = 0;
    this.y = 0;

    this.ctx.fillStyle = '#033333';
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    this.ctx.strokeStyle = '#ff00ff';
    this.ctx.strokeRect(0, 0, this.element.width, this.element.height);


  }



  Update(){

    /**
    this.x += 1;

    if(this.x > 8) this.x = 0;

    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    this.ctx.lineWidth = 8;
    this.ctx.beginPath();

    this.ctx.moveTo((this.x), 0);

    this.ctx.lineTo((this.x + 5), 0);

    this.ctx.stroke();;

    **/

  }

}
