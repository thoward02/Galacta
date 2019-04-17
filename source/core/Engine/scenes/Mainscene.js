// mainscene.js
/**
* -== MainScene ==-
*		You know I don't know how we'll design scenes, but for now I'll build them through here.
*		This will esentially be the way we build the 3D enviroment around the user
*		-== Variables ==-
*			@vairable SObj {THREE.Scene} - Contains the 3D space that the scene takes place in
*			@variable UpdateList {Object} - Objects that need to update
*		-== Functions ==-
*			@Function LoadTestScene {null} - Loads a debug scene, with a greene box.
*
**/




class MainScene{
	constructor(){

		this.SObj = new THREE.Scene;
		this.UpdateList = [];
		this.BoundingList = [];
	}

	LoadTestScene(){
		//Lighting

		//Hard red
		var Bulb = new THREE.PointLight( 0xff0000, 1, 100 );
		Bulb.position.set( 1, 0, 1 );
		this.SObj.add( Bulb );

		var SecondBulb = new THREE.PointLight( 0xff0000, 1, 100 );
		SecondBulb.position.set( 0, 20, -10 );
		this.SObj.add( SecondBulb );

		//Sunish
		var SpotLight = new THREE.SpotLight( 0xffffff, 0.8, 0, (Math.PI / 6), 0.5, 2 );
		SpotLight.position.set(-100, 100, 0 );
		SpotLight.castShadow = true;

		this.SObj.add(SpotLight);
		//Add test object
		//Create Box
		var BoxObj = new Box();
		var BoxMesh = BoxObj.ReturnObj();
		this.SObj.add(BoxMesh);

		this.UpdateList[this.UpdateList.length] = BoxObj;

		//lOAD FLOOR
		var FloorX = 100;
		var FloorY = 1;
		var FloorZ = 100;

		var FloorMesh = new THREE.BoxGeometry(100, 1, 100);
		var FloorMaterial = new THREE.MeshStandardMaterial( {parameter : {color:0xFFF, lights: true} } );

		var Floor = new THREE.Mesh(FloorMesh, FloorMaterial);

		Floor.position.x = 0;
		Floor.position.y = 8;
		Floor.position.z = 0;

		Floor.reciveShadow = true;

		var FloorXArea = [((FloorX / 2) + Floor.position.x), ((FloorX / 2) -Floor.position.x)];
		var FloorYArea = [((FloorY / 2) + Floor.position.y), ((FloorY / 2) - Floor.position.y)];
		var FloorZArea = [((FloorZ / 2) + Floor.position.z), ((FloorX / 2) -Floor.position.z)];

		//Set the distance limit objcts can come within
		var Boundary = 1;
		FloorXArea[0] += Boundary; FloorXArea[1] -= Boundary;
		FloorYArea[0] += Boundary; FloorYArea[1] -= Boundary;
		FloorZArea[0] += Boundary; FloorZArea[1] -=  Boundary;

		Floor.position.AREA = [FloorXArea, FloorYArea, FloorZArea];

		this.BoundingList[this.BoundingList.length] = Floor;
		this.SObj.add(Floor);

	}

	Update(){
		for(var Obj in this.UpdateList){
				this.UpdateList[Obj].Update();
		}


	}
}
