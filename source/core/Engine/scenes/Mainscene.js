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
		//new Lighting(Name, type, power, colour, position xyz, direction, intensity)
		//Basic Sun
		var Sun = new Lighting("Sun", 0, 1000, 0XFFFFFF, -1, 10, 0, -1, 1)
		this.SObj.add(Sun.object);

		//Lamp light
		var Lamp = new Lighting("SkyLamp", 1, 0.25, 0xABFFEF, 0, 10, 0, -1, 2);
		this.SObj.add(Lamp.object);

		//Add test object
		//Create Drone
		var DroneObj = new Drone();
		var DroneMesh = DroneObj.ReturnObj();
		this.SObj.add(DroneMesh);

		this.UpdateList[this.UpdateList.length] = DroneObj;

		//lOAD FLOOR
		var FloorX = 100;
		var FloorY = 1;
		var FloorZ = 100;

		var FloorMesh = new THREE.BoxGeometry(100, 1, 100);
		var FloorMaterial = new THREE.MeshDepthMaterial( {parameter : {color:0xFFF, lights: true} } );

		var Floor = new THREE.Mesh(FloorMesh, FloorMaterial);
		Floor.position.x = 0;
		Floor.position.y = 8;
		Floor.position.z = 0;

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
