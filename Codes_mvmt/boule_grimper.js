var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Setup camera
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 45, new BABYLON.Vector3(0, 5, -10), scene);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 120;
    camera.lowerBetaLimit = Math.PI / 10;
    camera.upperBetaLimit = Math.PI / 2;
    camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");
    camera.panningSensibility = 0;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Setup lighting
    var hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.2;
    var dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0, -1, -1), scene);
    dirLight.position = new BABYLON.Vector3(0, 50, 50);
    dirLight.intensity = 0.5;
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);
    shadowGenerator.useExponentialShadowMap = true;
   
   // GUI
       var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "play");
    button1.width = "150px"; 
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Pause");
    button2.width = "150px"; 
    button2.height = "40px";
    button2.color = "white";
    button2.cornerRadius = 20;
    button2.background = "green";
    button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("but3", "Compétences");
    button3.width = "150px"; 
    button3.height = "40px";
    button3.color = "white";
    button3.cornerRadius = 20;
    button3.background = "green";
    button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    button2.onPointerClickObservable.add(function (meshes) {
    if (button2) {
        scene.physicsEnabled= false;
        }
    });
    
    button1.onPointerClickObservable.add(function (meshes) {
        if (button1) {
            scene.physicsEnabled= true;
        }
    });

    button3.onPointerClickObservable.add(function (meshes) {
        if (button3) {
            sphere.applyImpulse(new BABYLON.Vector3(500, 0, 0), sphere.position);
            //speed += 500; 
            /*var gravityVector = new BABYLON.Vector3(0,500, 0);
            var physicsPlugin = new BABYLON.CannonJSPlugin(true);
            scene.enablePhysics(gravityVector, physicsPlugin);*/
        }
    });
    advancedTexture.addControl(button1);
    advancedTexture.addControl(button2);
    advancedTexture.addControl(button3);


    // Setup Physics
    var gravityVector = new BABYLON.Vector3(0, -90, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin(true);
    scene.enablePhysics(gravityVector, physicsPlugin);

    // Player controlled Ball
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 20;
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")
    sphere.material = boxMat;
    camera.lockedTarget = sphere;
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 10, restitution: 0.3, friction: 500 }, scene);
    shadowGenerator.addShadowCaster(sphere);

    // Ground
    var ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 120, height: 0.5, depth: 120 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = BABYLON.Color3.Green();
    ground.material = groundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 8, restitution: 0.7 }, scene);
    ground.receiveShadows = true;

    // Mesh
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 5}, scene);
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box,BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 8, restitution: 0 }, scene);


    var box2 = BABYLON.MeshBuilder.CreateBox("box", {height:1,width:20,depth:20}, scene);
    box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2,BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 5 }, scene);
    box2.position.x=-30
    box2.isPickable=true

    var box3 = BABYLON.MeshBuilder.CreateBox("box", {height:10,width:20,depth:20}, scene);
    box3.physicsImpostor = new BABYLON.PhysicsImpostor(box3,BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);
    box3.position.x=30;
    box3.position.y = 7;

    var box4 = BABYLON.MeshBuilder.CreateBox("box", {height:12,width:19.99,depth:19.99}, scene);
    box4.physicsImpostor = new BABYLON.PhysicsImpostor(box4,BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 10, restitution: 0 }, scene);
    box4.position.x=30;
    box4.position.y = 7;

    var tremplin = BABYLON.MeshBuilder.CreateCylinder("tremplin", {diameter:10, height:8, tessellation:3});
    tremplin.physicsImpostor = new BABYLON.PhysicsImpostor(tremplin,BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 0, friction: 8, restitution: 0 }, scene);
    tremplin.position.x=10 ; 
    tremplin.scaling.x = 1;
    tremplin.rotation.x = Math.PI / 2;
    tremplin.position.y = 1; 
    tremplin.rotation.y = Math.PI / 2;
    tremplin.rotation.z = Math.PI / 2;
     
    // Collision detection
    function collisionDetection() {
        sphere.canJump = true;
    }
    sphere.physicsImpostor.registerOnPhysicsCollide(ground.physicsImpostor, collisionDetection);
    sphere.physicsImpostor.registerOnPhysicsCollide(box.physicsImpostor, collisionDetection);
    sphere.physicsImpostor.registerOnPhysicsCollide(box3.physicsImpostor, collisionDetection);

    //sphere.physicsImpostor.registerOnPhysicsCollide(tremplin.physicsImpostor, collisionDetection);

    // Keyboard controller
    var direction = BABYLON.Vector3.Zero();
    camera.direction = camera.getFrontPosition(1).subtract(camera.position).normalize();
    var speed = 2;
    var jump = false;
    window.addEventListener("keydown", event => {
        let { code } = event;
        // Forward and Backward controls
        if (code === 'ArrowUp' || code === 'KeyZ') {
            direction.z = 1 * speed;
        } else if (code === 'ArrowDown' || code === 'KeyS') {
            direction.z = -1 * speed;
        }
        // Left and Right controls
        if (code === 'ArrowLeft' || code === 'KeyQ') {
            direction.x = -1 * speed;
        } else if (code === 'ArrowRight' || code === 'KeyD') {
            direction.x = 1 * speed;
        }
        // Jump control
        if (code === 'Space' ) {
            jump = true;
        }
    });

    window.addEventListener("keyup", event => {
        let { code } = event;
        // Forward and Backward controls
        if (code === 'ArrowUp' || code === 'KeyZ') {
            direction.z = 0;
        } else if (code === 'ArrowDown' || code === 'KeyS') {
            direction.z = 0;
        }
        // Left and Right controls
        if (code === 'ArrowLeft' || code === 'KeyQ') {
            direction.x = 0;
        } else if (code === 'ArrowRight' || code === 'KeyD') {
            direction.x = 0;
        }
        // Jump control
        if (code === 'Space') {
            jump = false;
        }

        if (code === 'Escape') {scene.physicsEnabled= false;}
            
        if (code === 'Escape' ) {scene.physicsEnabled= true;}

    });

    // Move the ball
    scene.registerBeforeRender(() => {
        let impulseDirection = camera.getDirection(direction); // Rotate the direction into the camera's local space
        impulseDirection.y = 0; // Discard the y component
        impulseDirection.normalize(); // Make it of length 1 again
        sphere.applyImpulse(impulseDirection.scale(5), sphere.position);
        // make the player jump
        if (jump && sphere.canJump) {
            console.log("jump")
            sphere.applyImpulse(new BABYLON.Vector3(0, 200, 0), sphere.position);
            jump = false;
            sphere.canJump = false;
        }
        if (sphere.intersectsMesh(box2,true)){
            sphere.position = new BABYLON.Vector3(-20,20,10)
            sphere.physicsImpostor.physicsBody.angularDamping = .999;
            } else {sphere.material = boxMat;speed=2;
            sphere.physicsImpostor.physicsBody.angularDamping = .8;
            sphere.position = sphere.position
            }
        if (sphere.intersectsMesh(box3,true)){
            /*scene.disablePhysicsEngine;
            scene.enablePhysics(new BABYLON.Vector3(0,9.81,0), new BABYLON.CannonJSPlugin(true));
            scene.physicsEnabled= true;*/
            sphere.applyImpulse(new BABYLON.Vector3(0, 30, 0), sphere.position);
        }
        //if (button3) { speed = 500}
    });

    return scene;
};