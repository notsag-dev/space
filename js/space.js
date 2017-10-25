import SkyBox from './space-objects/sky-box';
import LightDecomposition from './space-objects/light-decomposition';
import TexturedCircle from './space-objects/textured-circle';
import { initTextures } from './textures';

/**
 * Init three.js, populate and animate the space.
 *
 */

let spaceObjects = [];

/**
 * Add planets
 * @param {THREE.Scene} scene
 * @param {
 */
let populate = function(scene, spaceObjects) {
    for (let i = 0; i < spaceObjects.length; i++) {
        let meshes = spaceObjects[i].meshes;
        for (let j = 0; j < meshes.length; j++) {
            scene.add(meshes[j]);
        }
    }
}

/**
 * Animate - Executed each frame
 *
 */
let animate = function() {
    requestAnimationFrame(animate);
    for (let i = 0; i < spaceObjects.length; i++) {
        spaceObjects[i].animate()
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
    window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 30;

let controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures and start rendering
initTextures().then(() => {
    // spaceObjects.push(new TexturedCircle(10, 'beatlesVinyl'));
    spaceObjects.push(new SkyBox());
    spaceObjects.push(new LightDecomposition(10));
    populate(scene, spaceObjects);
    animate();
});
