var createScene = function () {

    var scene = new BABYLON.Scene(engine);

    var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    //var camera = new BABYLON.ArcRotateCamera("Camera",42, 0.8, 400, BABYLON.Vector3.Zero(), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 45, new BABYLON.Vector3(0, 5, -10), scene);
    // Attach the camera to the canvas.
    camera.attachControl(canvas, false);
    camera.useBouncingBehavior = false;
    camera.useAutoRotationBehavior = false;
    camera.useFramingBehavior = false;

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // Create a built-in "sphere" shape. 
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);

    // Move the sphere upward 1/2 of its height.
    sphere.position.y = 4;
    // Add Gravity
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.5, restitution: 0.15 }, scene);
    sphere.showBoundingBox = true;

    camera.setTarget(sphere.position);
    camera.lockedTarget = sphere;



    var map = {}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);

    // wingy disables 3 lines
    // var disabledWUp = false;
    // var disabledWDown = false;
    // var vectorToReset = false;
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        if (evt.sourceEvent.key !== "w") {
            return;
        }
        // wingy disables 3 lines
        // if (disabledWUp) {
        //     return;
        // }

        // wingy adds 2 lines
        sphere.physicsImpostor.physicsBody.angularDamping = .001;

        // wingy disables 4 lines
        // disabledWDown = false;
        // disabledWUp = true;
        // var forceDirectonPlane = new BABYLON.Vector3(camera.position.x, 0, camera.position.z).normalize();
        // vectorToReset = forceDirectonPlane;

        // wingy adds 2 lines - adjusting direction - getter.
        var forceDirectonPlane = camera.position.subtract(sphere.position).normalize();
        forceDirectonPlane.y = 0;

        var forceMagnitude = -100;
        sphere.physicsImpostor.applyForce(forceDirectonPlane.scale(forceMagnitude), sphere.getAbsolutePosition().add(forceDirectonPlane));
    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keyup";

        if (evt.sourceEvent.key !== "w") {
            return;
        }

        // wingy adds 1 line... gentle stop.
        sphere.physicsImpostor.physicsBody.angularDamping = .999;

        // wingy adds 2 lines... instant stop.
        // sphere.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
        // sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));

        // wingy disables 11 lines
        // if (disabledWDown) {
        //     return;
        // }
        // disabledWUp = false;
        // disabledWDown = true;
        // if (!vectorToReset) {
        //     return;
        // }
        // //var forceDirectonPlane = new BABYLON.Vector3(camera.position.x, 0, camera.position.z).normalize();
        // var forceMagnitude = 100;
        // sphere.physicsImpostor.applyForce(vectorToReset.scale(forceMagnitude), sphere.getAbsolutePosition().add(vectorToReset));
    }));



    // Create a built-in "ground" shape.
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', { height: 64, width: 64, subdivisions: 64 }, scene);
    var mat = new BABYLON.StandardMaterial("ground", scene);
    mat.diffuseColor = new BABYLON.Color4.FromInts(120, 120, 120, 0);
    ground.material = mat;

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    /**
     * Auto Respawn
     */
    scene.registerAfterRender(() => {
        camera.setTarget(sphere.position);
        if (!sphere || !sphere.physicsImpostor) {
            return;
        }
        if (sphere.position.y < 0 || sphere.position.y > 128) {
            sphere.dispose();
            setTimeout(() => {
                sphere = new character(scene);
            }, 250);
        }
    });

    // Return the created scene.

    return scene;

};