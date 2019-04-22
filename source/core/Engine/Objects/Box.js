class Box{

  constructor(){
    this.Mesh = new THREE.BoxGeometry(2, 1, 2);

    this.ScreenControler = new TvScreen();
    Galacta.Engine.Scene.UpdateList[Galacta.Engine.Scene.UpdateList.length] = this.ScreenControler;

    this.Texture = new THREE.Texture(this.ScreenControler.element);
    this.Texture.needsUpdate  = true;

    this.Material =  new THREE.MeshBasicMaterial( {color: 0xffa500, map: this.Texture} );
    this.Object = new THREE.Mesh(this.Mesh, this.Material);

    this.Object.position.x = 0;
    this.Object.position.y = 9.5;
    this.Object.position.z = -10;
    this.reciveShadow = true;
    this.castShadow = true;

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

      var time = performance.now() * 0.001;
      this.Object.position.y = (Math.sin( time ) * 0.5) + 9.5 ;



    }
  }


}
