const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    
    //wheel face UVs
    /*const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);*/

    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");

    wheelRB = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
    wheelRB.material = wheelMat;;

    //Animate the Wheels
    const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const wheelKeys = []; 
    var valuebis  = 0.2
    scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "q":
                    case "Q":
                    
                    //wheelRB.position.x -= 0.01
                    //At the animation key 0, the value of rotation.y is 0
                    wheelKeys.push({
                        frame: 0,
                        value: valuebis
                    });

                    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
                    wheelKeys.push({
                        frame:  10,
                        value: 0.2 * Math.PI,
                        
                        
                    });valuebis+=0.2;

                    //set the keys
                    animWheel.setKeys(wheelKeys);

                    //Link this animation to a wheel
                    wheelRB.animations = [];
                    wheelRB.animations.push(animWheel);
                    scene.beginAnimation(wheelRB, 0, 30, false);}}});
    return scene;
}