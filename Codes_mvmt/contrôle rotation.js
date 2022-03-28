var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    //scene.clearColor = BABYLON.Color3.Purple();

    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light1 = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
    var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(1, -3, 2), scene);

    light1.intensity = 0.5;
    
    //GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "play");
    button1.width = "150px"; 
    button1.height = "40px";
    //button1.centerX; 
    //button1.centerY;
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    /*button1.onPointerUpObservable.add(function() {
        sphere.material = blueMat;
    });
    button1.onPointerDownObservable.add(function (){
        sphere.material = new BABYLON.StandardMaterial("red", scene); 
    });*/
    button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Pause");
    button2.width = "150px"; 
    button2.height = "40px";
    //button1.centerX; 
    //button1.centerY;
    button2.color = "white";
    button2.cornerRadius = 20;
    button2.background = "green";
    button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    button2.onPointerClickObservable.add(function (meshes) {
    if (button2) {
        joint1.setMotor(0);
        }
    });
    
    button1.onPointerClickObservable.add(function (meshes) {
        if (button1) {
            //assigning all the animations to the box
            animating = scene.beginDirectAnimation(joint1.setMotor(0.5));
        }
    });
    advancedTexture.addControl(button1);
    advancedTexture.addControl(button2);
    

    // Pivot
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:6}, scene);
    var greenMat = new BABYLON.StandardMaterial("green", scene);
    greenMat.diffuseColor = new BABYLON.Color3.Green();
    sphere.material = greenMat;
    
    //
    var box = BABYLON.MeshBuilder.CreateCylinder("Box", {height:10,diameter:1,}, scene);
    box.position = new BABYLON.Vector3(0, 4.5, 0);
    var blueMat = new BABYLON.StandardMaterial("blue", scene);
    blueMat.diffuseColor = new BABYLON.Color3.Blue();
    box.material = blueMat;
    var box2 = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
    box2.position = new BABYLON.Vector3(3, 7, 0);
    var box3 = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
    box3.position = new BABYLON.Vector3(-3, 7, 0);

    box2.isVisible = false
    box3.isVisible = false

    // Physics
    //scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.CannonJSPlugin());
    //scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.OimoJSPlugin());
    scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.AmmoJSPlugin());
    
    // Add Imposters
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0}, scene);
    //box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);
    
    //Add Joint
    var joint1 = new BABYLON.MotorEnabledJoint(BABYLON.PhysicsJoint.HingeJoint, {
		mainPivot: new BABYLON.Vector3(0, 0, 0),
        connectedPivot: new BABYLON.Vector3(0, -4.5, 0),
        mainAxis: new BABYLON.Vector3(0, 0, 1),
        connectedAxis: new BABYLON.Vector3(0, 0, 1),
	}); 

    sphere.physicsImpostor.addJoint(box.physicsImpostor, joint1); 

    joint1.setMotor(1);
    scene.registerAfterRender(()=>{
    if (box.intersectsMesh(box2,true)){joint1.setMotor(-0.5)} else if (box.intersectsMesh(box3,true)){joint1.setMotor(0.5)}});
    
    return scene;
}

//dynamic mesh 