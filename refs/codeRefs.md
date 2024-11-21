# GUI Editor

Start: [https://gui.babylonjs.com/#6RS26L]()

Current: https://gui.babylonjs.com/#6RS26L#15

Colors:

https://colorhunt.co/palette/f8ededff8225b43f3f173b45

# Soundtrack

Chiptune Sherlock Holmes Anthem

https://pixabay.com/pt/music/dubstep-chiptune-sherlock-holmes-anthem-215252/

# Pendulum Simulation

Cool: [https://playground.babylonjs.com/#UKDJG5#8]()

With havak:

[https://playground.babylonjs.com/#NAMYYQ#12]()

const NUM_OF_BALLS = 15;

const createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)

    const scene = new BABYLON.Scene(engine);

    const plugin = new BABYLON.HavokPlugin();

    scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), plugin);

    // This creates and positions a free camera (non-mesh)

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, -25, new BABYLON.Vector3(0, 0, 0));

    camera.attachControl(canvas, true);

    //camera.wheelDeltaPercentage = 0.005;

    // This targets the camera to scene origin

    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas

    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount

    light.intensity = 0.7;

    const cubeTexture = new BABYLON.CubeTexture("textures/country.env", scene);

    const currentSkybox = scene.createDefaultSkybox(cubeTexture, true);

    const pbrMaterial = new BABYLON.PBRMaterial('pbrMaterial', scene);

    for (let i = 0; i < NUM_OF_BALLS; i++) {

    distance(pbrMaterial, i, scene, i);

    }

    const defaultUp = new BABYLON.Vector3(0,1,0);

    scene.registerBeforeRender(function () {

    for (let i = 0; i < NUM_OF_BALLS; i++) {

    // find the direction between the ball and the box

    const ball = scene.getMeshByName("distanceSphere"+i);

    const box = scene.getMeshByName("distanceBox"+i);

    const cyl = scene.getMeshByName("pendulumRod"+i);

    if (!ball || !box || !cyl) {

    return;

    }

    const direction = box.position.subtract(ball.position);

    direction.normalize();

    //compute the difference in the default orientation of the cylinder to the orientation of the direction

    const rot = BABYLON.Quaternion.FromUnitVectorsToRef(defaultUp, direction, new BABYLON.Quaternion());

    // apply to the cylinder

    cyl.rotationQuaternion = rot;

    ball.rotationQuaternion = rot;

    // compute the midpoint between the ball and box

    const midp = box.position.add(ball.position).scale(0.5);

    cyl.position = midp;

    }

    });

    return scene;

};

var distance = function (mat, pos, scene, i) {

    let box1 = BABYLON.MeshBuilder.CreateBox("distanceBox"+i, {size: 1}, scene);

    box1.position.x = pos - NUM_OF_BALLS/2;

    box1.position.y = 1;

    box1.position.z = 0;

    box1.material = mat;

    //let sphere1 = BABYLON.MeshBuilder.CreateCylinder("distanceSphere"+i, {diameter: 1}, scene);

    let sphere1 = BABYLON.MeshBuilder.CreateCylinder("distanceSphere"+i, {height: 1, diameter: 1}, scene);

    sphere1.position.x = pos - NUM_OF_BALLS/2;

    sphere1.position.y = 1;

    sphere1.position.z = -2;

    sphere1.material = mat;

    var pendulumRod = BABYLON.MeshBuilder.CreateCylinder("pendulumRod"+i, { height: 3 + pos/2, diameter: 0.1, tessellation: 32 }, scene);

    let agg1 = new BABYLON.PhysicsAggregate(

    sphere1,

    BABYLON.PhysicsShapeType.SPHERE,

    { mass: 1, restitution: 0.9 },

    scene

    );

    let agg2 = new BABYLON.PhysicsAggregate(

    box1,

    BABYLON.PhysicsShapeType.BOX,

    { mass: 0, restitution: 0.9 },

    scene

    );

    let distanceJoint = new BABYLON.DistanceConstraint(3 + pos/2, scene);

    agg1.body.addConstraint(agg2.body, distanceJoint);

};

# Games references

[https://danielbarral.itch.io/pendulum-game]()
