import SkyBox from './space-objects/sky-box';
import LightDecomposition from './space-objects/light-decomposition';
import TexturedCircle from './space-objects/textured-circle';
import { initTextures } from './textures';
import LineEmitter from './space-objects/line-emitter';

/**
 * Init three.js, populate and animate the space.
 *
 */

let spaceObjects = [];
let clock = new THREE.Clock();

/**
 * Add planets
 * @param {THREE.Scene} scene
 * @param {
 */
let populate = function(scene, spaceObjects) {
    for (let i = 0; i < spaceObjects.length; i++) {
        let sceneObjects = spaceObjects[i].sceneObjects;
        for (let j = 0; j < sceneObjects.length; j++) {
            scene.add(sceneObjects[j]);
        }
    }
}

/**
 * Animate - Executed each frame
 *
 */
let animate = function() {
    let delta = clock.getDelta();
    requestAnimationFrame(animate);
    for (let i = 0; i < spaceObjects.length; i++) {
        spaceObjects[i].animate(delta)
    }
    controls.update();
    render();
};

/**
 * Render function
 *
 */
let render = function() {
    renderer.render(scene, camera);
}

// Init Three
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 0.1, 100000);
camera.position.z = 30;

let controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures and start rendering
initTextures().then(() => {
    spaceObjects.push(new TexturedCircle(50, 'beatlesVinyl',
        new THREE.Vector3(30, -30, -150)));
    spaceObjects.push(new SkyBox());
    spaceObjects.push(new LightDecomposition(30));
    populate(scene, spaceObjects);
    animate();
});
