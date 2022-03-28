var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")
    sphere.material = boxMat;

    //var sphere = BABYLON.MeshBuilder.CreateBox("sphere1", {size: 1}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 2;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 10, 10, 2, scene);
    ground.rotation.x = 0;
	
	scene.enablePhysics();
	
	sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 100, restitution: 0.9 }, scene);
	ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    ///// Créeation anim sphere////
    ///const animgauche = new BABYLON.Animation("animgauche", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    //// 
     const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const wheelKeys = []; 
    scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "q":
                    case "Q":
                        sphere.position.x -= 0.1
                        wheelKeys.push({
                        frame: 0,
                        value: 0
                    });

                    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
                    wheelKeys.push({
                        frame: 10,
                        value: 0.5 * Math.PI
                    });

                    //set the keys
                    animWheel.setKeys(wheelKeys);

                    //Link this animation to a wheel
                    wheelRB.animations = [];
                    wheelRB.animations.push(animWheel);

                    scene.beginAnimation(wheelRB, 0, 30, false);
                        //sphere.rotation.x -= Math.PI/2;
                    break
                    case "d":
                    case "D":
                        sphere.position.x += 0.1;
                    break
                    case "z":
                    case "Z":
                        sphere.position.z += 0.1;
                    break
                    case "s":
                    case "S":
                        sphere.position.z -= 0.1;
                    break
                    case " ":
                        sphere.position.y = 10;
                        break
                    case "e":
                        sphere.position.z += 0.05;
                        sphere.position.x += 0.05;
                }
			break;
		}
	});

    return scene;

};