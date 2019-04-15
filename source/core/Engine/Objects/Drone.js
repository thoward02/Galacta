class Drone{

  constructor(){
    this.Mesh = new THREE.BoxGeometry(2, 1, 2);
    this.Material =  new THREE.MeshDepthMaterial( {parameter : {color: 0xffa500 , lights: true} } );
    this.Object = new THREE.Mesh(this.Mesh, this.Material);
    this.Object.position.x = 0;
    this.Object.position.y = 21;
    this.Object.position.z = -10;
    this.Up = true;
  }
  ReturnObj(){
    return this.Object;
  }
  Update(){

    //Grav
    var GravityPush = 0.981 * ( (Galacta.Engine.Delta - Galacta.Engine.PreviousDelta) / 100); // Grav in M/S times the seconds passed between frames
    //this.Object.position.y -= GravityPush; -- THE CALL TO PUSH OBJECT DOWN VIA GRAV

    //Check Boundings
    for(var items in Galacta.Engine.Scene.BoundingList){
      var Area = Galacta.Engine.Scene.BoundingList[items].position.AREA;

      var BoxX = Area[0];
      var BoxY = Area[1];
      var BoxZ = Area[2];

      //If our position is inside of thsi area
      if( (BoxY[0] >= this.Object.position.y && this.Object.position.y >= BoxY[1]) ){

      }else{
        this.Object.position.y -= GravityPush;

      }
    }
  }


}
