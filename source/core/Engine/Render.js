// render.js
/**
* -== Renderer ==-
*		The renderer controls the animation loop, and the actually handling of the
*		Render canvas
*
*		-== Variables ==-
*			@vairable RObj {THREE.WebGLRenderer} - Contains the OpenGl object that renders the 3D meshes
*
*		-== Functions ==-
*			@Function setup {null} - Sets up the Renderer on the HTML page
*			@Function animate {null} - Main loop through the game. Each loop it updates the game, then renders the next frame
*
**/


class Renderer{

	constructor(){
		//Create render
		if(Galacta.Engine.debug == false){
			//This is resource heavy
			this.RObj = new THREE.WebGLRenderer( { antialias: true } );

			//Set Setting
			//this.RObj.setPixelRatio( window.devicePixelRatio );
			this.RObj.setSize( 3073, 1536);
			this.RObj.vr.enabled = true;


			//Append Renderer
			document.body.appendChild( WEBVR.createButton(this.RObj) );
		}else{
			this.RObj = new THREE.WebGLRenderer();

			//Set Setting
			this.RObj.setPixelRatio( window.devicePixelRatio );
			this.RObj.setSize( window.innerWidth, window.innerHeight )
			this.RObj.vr.enabled = true;

			//Append Renderer
			document.body.appendChild( WEBVR.createButton(this.RObj) );
		}
	}

	setup() {

		// set size, and add the child to the page
		this.RObj.setSize(window.innerWidth - 10, window.innerHeight - 20);
		document.body.appendChild(this.RObj.domElement);

		this.RObj.setAnimationLoop(Galacta.Engine.Renderer.animate);

		// If the window gets resized, we will update the size of the renderer and update the cameras aspect ratio
		window.addEventListener('resize', onWindowResize, false);

		function onWindowResize() {
			Galacta.Engine.Camera.aspect = window.innerWidth / window.innerHeight;
			Galacta.Engine.Camera.updateProjectionMatrix();
			Galacta.Engine.Renderer.RObj.setSize(window.innerWidth - 10, window.innerHeight - 20);
		}
	}

	animate() {
			//Next frame
			//this.RObj.requestAnimationFrame(Galacta.Engine.Renderer.animate); //Recursion basically

			if(GameState.PLAY) {
				// if they're playing we can perform our animation tasks
				Galacta.Engine.Update();
				//Render scene
				Galacta.Engine.Renderer.RObj.render(Galacta.Engine.Scene.SObj, Galacta.Engine.Camera);

			}

		}

}
