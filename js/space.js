/**
 * Init three.js, populate and animate the space.
 *
 */
planets = []

/**
 * Add planets
 * @param {THREE.Scene} scene
 */
let populate = function(scene) {
    for (let i = 0; i < planets.length; i++) {
        meshes = planets[i].getMeshes();
        for (let j = 0; j < meshes.length; j++) {
            scene.add(meshes[j])
        }
    }
}

/**
 * Animate - Executed each frame
 *
 */
let animate = function() {
    requestAnimationFrame(animate);
    for (let i = 0; i < planets.length; i++) {
        planets[i].animate()
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
camera.position.z = 150;

let controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

populate(scene);
animate();
