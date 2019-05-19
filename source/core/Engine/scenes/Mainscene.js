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
		this.effectController  = {
					turbidity: 10,
					rayleigh: 2,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.8,
					luminance: 1,
					inclination: 0.49, // elevation / inclination
					azimuth: 0.25, // Facing front,
					sun: ! true
		};

		this.Sky = null;
	}

	LoadTestScene(){

		//Set Up sky
		this.Sky = new THREE.Sky();
		this.Sky.scale.setScalar( 450000 );
		Galacta.Engine.AddObject(this.Sky);
		// Add Sun Helper
		let distance = 400000;
		let SunObj = new THREE.Mesh(
			new THREE.SphereBufferGeometry( 20000, 16, 8 ),
			new THREE.MeshBasicMaterial( { color: 0xffffff } )
		);



		//Add Water and Sun to update list
		this.UpdateList[this.UpdateList.length] = WaterSetUp;

		//Add back lighting to cube
		var rectLight = new THREE.RectAreaLight( 0xffffff, 2,  10, 5 );
		rectLight.position.set( 0, 2, 0 );
		rectLight.lookAt( 0, 2, -10 );
		this.SObj.add( rectLight )

		var rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
		rectLight.add( rectLightHelper );


		//Add test object
		//Create Box
		this.BoxObj = new Box();
		var BoxObj = this.BoxObj;
		var BoxMesh = BoxObj.ReturnObj();
		this.SObj.add(BoxMesh);

		this.UpdateList[this.UpdateList.length] = BoxObj;

		//lOAD FLOOR
		var FloorX = 100;
		var FloorY = 0;
		var FloorZ = 100;

		var FloorMesh = new THREE.BoxGeometry(100, 0, 100);
		var FloorMaterial = new THREE.MeshStandardMaterial( {parameter : {color:0xFFF, lights: true} } );

		var Floor = new THREE.Mesh(FloorMesh, FloorMaterial);

		Floor.position.x = 0;
		Floor.position.y = -1;
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
		this.SObj.add(Floor)

	}

	Update(){
		for(var Obj in this.UpdateList){
				this.UpdateList[Obj].Update();
		}

	}

	DeleteOcean(){
		WaterSetUp.Delete();
	}
}
