class Drone{

  this.Obj;

  constructor(){
    this.Mesh = new THREE.BoxGeometry(2, 1, 2);
    this.Material =  new THREE.MeshBasicMaterial( {color:0x008080} );
    this.Obj = new THREE.Mesh(this.Mesh, this.Material);

  }
  Update(){
    this.Obj.position.y -= 0.01
  }


}
