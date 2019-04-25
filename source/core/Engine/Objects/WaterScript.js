class WaterScript{

  constructor(){
    this.SunLight = null;
    this.WaterPlane = null;
    this.Sky = null;
    this.CubeCamera = null;
  }

  Setup(){
    this.SunLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
		Galacta.Engine.Scene.SObj.add( this.SunLight );
		// Water
		var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );
		this.WaterPlane = new THREE.Water(
			waterGeometry,
				{
					textureWidth: 1024,
					textureHeight: 1024,
					waterNormals: new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/waternormals.jpg', function ( texture ) {
						texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					} ),
					alpha: 1.0,
					sunDirection: this.SunLight.position.clone().normalize(),
					sunColor: 0xffffff,
					waterColor: 0x001e0f,
					distortionScale: 1,
					fog: Galacta.Engine.Scene.SObj.fog !== undefined
				}
			);
			this.WaterPlane.rotation.x = - Math.PI / 2;
			this.WaterPlane.position.y = 0;
			Galacta.Engine.AddObject(this.WaterPlane);

			// this.Skybox
			this.Sky = new THREE.Sky();

			var uniforms = this.Sky.material.uniforms;
				uniforms[ 'turbidity' ].value = 100;
				uniforms[ 'rayleigh' ].value = 2;
				uniforms[ 'luminance' ].value = 1;
				uniforms[ 'mieCoefficient' ].value = 0.005;
				uniforms[ 'mieDirectionalG' ].value = 0.8;
			this.parameters = {
				distance: 100,
				inclination: 9.5,
				azimuth: 0.75
			};
			this.CubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
			this.CubeCamera.renderTarget.texture.generateMipmaps = true;
			this.CubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
			Galacta.Engine.Scene.SObj.background = this.CubeCamera.renderTarget;

      var theta = Math.PI * ( this.parameters.inclination - 0.5 );
			var phi = 2 * Math.PI * ( this.parameters.azimuth - 0.5 );

			this.SunLight.position.x = this.parameters.distance * Math.cos( phi );
			this.SunLight.position.y = this.parameters.distance * Math.sin( phi ) * Math.sin( theta );
			this.SunLight.position.z = this.parameters.distance * Math.sin( phi ) * Math.cos( theta );

			this.Sky.material.uniforms[ 'sunPosition' ].value = this.SunLight.position.copy( this.SunLight.position );
			this.WaterPlane.material.uniforms[ 'sunDirection' ].value.copy( this.SunLight.position ).normalize();

			this.CubeCamera.update(Galacta.Engine.Renderer.RObj, this.Sky );

  }

  Update(){
    var time = performance.now() * 0.001;
    this.WaterPlane.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    this.WaterPlane.rotation._x = -1.5707963267948966;
    this.WaterPlane.rotation._y = 0;
    this.WaterPlane.rotation._z = 0; 

  }

  Delete(){
    Galacta.Engine.Scene.SObj.remove(this.WaterPlane)
  }
}
