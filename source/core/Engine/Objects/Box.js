class Box{

  constructor(){
    this.Mesh = new THREE.BoxGeometry(6, 3, 0.1);

    this.ScreenControler = new TvScreen();
    Galacta.Engine.Scene.UpdateList[Galacta.Engine.Scene.UpdateList.length] = this.ScreenControler;

    this.Texture = new THREE.CanvasTexture(this.ScreenControler.element);

    this.Material =  new THREE.MeshBasicMaterial( {map: this.Texture} );
    this.Object = new THREE.Mesh(this.Mesh, this.Material);

    this.Object.position.x = 0;
    this.Object.position.y = 2.0;
    this.Object.position.z = -10;

    this.Object.rotation.x = 0.4

    this.reciveShadow = true;
    this.castShadow = true;


  }
  ReturnObj(){
    return this.Object;
  }
  Update(){

    //Grav
    //this.Object.position.y -= GravityPush; -- THE CALL TO PUSH OBJECT DOWN VIA GRAV
    //var GravityPush = 0.981 * ( (Galacta.Engine.Delta - Galacta.Engine.PreviousDelta) / 100); // Grav in M/S times the seconds passed between frames

    this.Texture.needsUpdate = true;

    var time = performance.now() * 0.001;
    //this.Object.position.y = (Math.sin( time ) * 0.5) + 10.5 ;



    //Swing
    this.Object.rotation.x +=  (Math.sin( time ) * 0.001) - 0.005 ;





  }


}
