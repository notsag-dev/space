/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initTextures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return textures; });
let loader = new THREE.TextureLoader();

// Textures to be loaded.
// The file property is the route of the file under
// the textures folder.
let texturesInfo = [
    { name: 'beatlesVinyl', file: 'beatlesVinyl.png' },
    { name: 'skyboxBack', file: 'skybox/back.png' },
    { name: 'skyboxBottom', file: 'skybox/bottom.png' },
    { name: 'skyboxFront', file: 'skybox/front.png' },
    { name: 'skyboxLeft', file: 'skybox/left.png' },
    { name: 'skyboxRight', file: 'skybox/right.png' },
    { name: 'skyboxTop', file: 'skybox/top.png' }
]

/**
 * Load a texture using the three js loader.
 * Return a promise.
 *
 */
let loadTexture = function(name, file) {
    return new Promise((resolve, reject) => {
        loader.load(`./textures/${file}`,
            // Function to be executed when the texture is loaded
            (texture) => {
                console.log('Texture loaded: ' + name);
                resolve({ name: name, texture: texture });
            },
            null,
            // Function to be executed if the texture loading failed
            (err) => {
                console.log('Problem loading texture: ' + name);
                reject(err);
            }
        )
    })
}

/**
 * Load all textures included in the textures array.
 * Return a list of promises.
 *
 */
let loadTextures = function() {
    let texturePromises = []
    for (let i = 0; i < texturesInfo.length; i++) {
        texturePromises.push(loadTexture(texturesInfo[i].name,
            texturesInfo[i].file));
    }
    return texturePromises;
}

/**
 * The textures export is a dictionary of textures.
 * Key: texture name
 * Value: texture name obtained from the texturesInfo array.
 *
 */
let textures = {};

/**
 * Load all textures in the textures dictionary.
 * Return a promise that is resolved when all textures
 * are loaded.
 *
 */
let initTextures = function() {
    return new Promise((resolve, reject) => {
        Promise.all(loadTextures())
           .then(function (res) {
               for(let i = 0; i < res.length; i++) {
                   textures[res[i].name] = res[i].texture;
               }
               resolve();
            },
            // Error
            function(err) {
                console.log(err);
                reject();
            })
    });
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__space_objects_sky_box__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__space_objects_light_decomposition__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__space_objects_textured_circle__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__textures__ = __webpack_require__(0);





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
Object(__WEBPACK_IMPORTED_MODULE_3__textures__["a" /* initTextures */])().then(() => {
    // spaceObjects.push(new TexturedCircle(10, 'beatlesVinyl'));
    spaceObjects.push(new __WEBPACK_IMPORTED_MODULE_0__space_objects_sky_box__["a" /* default */]());
    spaceObjects.push(new __WEBPACK_IMPORTED_MODULE_1__space_objects_light_decomposition__["a" /* default */](10));
    populate(scene, spaceObjects);
    animate();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textured_box__ = __webpack_require__(3);


/**
 * A SkyBox. Call the TextureBox constructor using
 * skybox textures.
 *
 * TODO Support multiple sky boxes textures.
 *
 */
class SkyBox extends __WEBPACK_IMPORTED_MODULE_0__textured_box__["a" /* default */] {
    constructor() {
        super(new THREE.Vector3(0, 0, 0), 1000,
            ['skyboxRight', 'skyboxLeft', 'skyboxTop', 'skyboxBottom',
            'skyboxFront', 'skyboxBack']);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SkyBox;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures__ = __webpack_require__(0);


class TexturedBox {
    /**
     * Constructor.
     * @param {THREE.Vector3} pos - The box position.
     * @param {number} edgeSize - The cube edge size.
     * @param [number] textureNames - A list of 6 texture names.
     *
     */
    constructor(pos, edgeSize, textureNames) {
        if (textureNames.length != 6) {
            console.log('Error: textureNames must have 6 texture names');
            return;
        }

        let materials = [];
        for (let i = 0; i < 6; i++) {
            materials.push(new THREE.MeshBasicMaterial(
                { map: __WEBPACK_IMPORTED_MODULE_0__textures__["b" /* textures */][textureNames[i]], side: THREE.BackSide }
            ));
        }

        // TODO Create other object type to do it with generic side size.
        var geometry = new THREE.BoxGeometry(edgeSize, edgeSize, edgeSize);
        this.boxMesh = new THREE.Mesh(geometry, materials);
        this.boxMesh.position.set(pos.x, pos.y, pos.z);

        this.meshes = []
        this.meshes.push(this.boxMesh);
    }

    /**
     * Animate.
     *
     */
    animate() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TexturedBox;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometries__ = __webpack_require__(5);


class LightDecomposition {
    constructor() {
        this.meshes = [];

        // Pyramid
        let geometry = Object(__WEBPACK_IMPORTED_MODULE_0__geometries__["a" /* getPyramidGeometry */])(10, 10, 10);
        let material = new THREE.MeshBasicMaterial(
            { color: 0xffffff, wireframe: true, side: THREE.DoubleSide }
        );
        this.pyramid = new THREE.Mesh(geometry, material);
        this.meshes.push(this.pyramid);

        // Find intersection between the light and the prism
        let origin = new THREE.Vector3(-20, 5, 0);
        let dir = new THREE.Vector3(1, 0, 0).normalize();
        let intersec = this.findIntersection(origin, dir, this.pyramid);
        intersec.x += 0.0001;

        // Create the line for the initial ray
        let line = this.getLine(origin, intersec);
        this.meshes.push(line);

        // Get all refracted rays inside the pyramid
        for (let i = 1; i < 8; i++) {
            this.meshes.push(
                this.getRefractedLine(intersec, dir, -i / 150, this.pyramid)
            );
        }
    }

    /**
     * Get a refracted line inside the prism from the
     * information of the original ray.
     *
     * @param {THREE.Vector3} dir - The direction of the original ray
     *      coming into contact with the prism.
     * @param {THREE.Vector3} origin - The contact point between the
     *      original ray and the prism. This will be the origin of
     *      the new refracted line.
     * @param {number} angle - The refraction angle.
     * @param {THREE.Mesh} mesh - The prism.
     *
     */
    getRefractedLine(origin, dir, angle, mesh) {
        let zAxis = new THREE.Vector3(0, 0, 1);
        dir.applyAxisAngle(zAxis, angle);
        let intersec = this.findIntersection(origin, dir, mesh);
        if (!intersec){
            return null;
        }
        return this.getLine(origin, intersec);
    }

    /**
     * Create a ray from an origin with a direction and find
     * its intersection with a mesh.
     *
     * @param {THREE.Vector3} origin - The origin of the ray.
     * @param {THREE.Vector3} dir - The direction of the ray (normalized).
     * @param {THREE.Mesh} mesh - The mesh to find the intersection.
     *
     */
    findIntersection(origin, dir, mesh) {
        console.log(mesh);
        let ray = new THREE.Raycaster(origin, dir);
        let intersects = ray.intersectObject(mesh);
        if (!intersects.length) {
            return null;
        }
        let point = intersects[0].point;
        return new THREE.Vector3(point.x, point.y, point.z);
    }

    /**
     * Get a line from two points.
     *
     */
    getLine(point1, point2) {
        let lineMaterial = new THREE.LineBasicMaterial();
        let geoRay1 = new THREE.Geometry();
        geoRay1.vertices.push(point1);
        geoRay1.vertices.push(point2);
        return new THREE.Line(geoRay1, lineMaterial);
    }

    animate() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LightDecomposition;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPyramidGeometry; });
/**
 * Get a pyramid geometry.
 *
 */
let getPyramidGeometry = function(width, length, height) {
    let geometry = new THREE.Geometry();

    geometry.vertices = [
        new THREE.Vector3(-0.5, 0, -0.5),
        new THREE.Vector3(0.5, 0, -0.5),
        new THREE.Vector3(0.5, 0, 0.5),
        new THREE.Vector3(-0.5, 0, 0.5),
        new THREE.Vector3(0, 1, 0)
    ];

    geometry.faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3),
        new THREE.Face3(1, 0, 4),
        new THREE.Face3(2, 1, 4),
        new THREE.Face3(3, 2, 4),
        new THREE.Face3(0, 3, 4)
    ];

    var transformation =
        new THREE.Matrix4().makeScale(width, length, height);
    geometry.applyMatrix(transformation);

    return geometry;
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures__ = __webpack_require__(0);


class TexturedCircle {
    /**
     * Constructor.
     * @param {number} radius - The radius of the ring.
     * @param {string} textureName - The name of an already loaded texture to
     *      be used as the ring image.
     *
     */
    constructor(radius, textureName) {
        this.meshes = []
        let material = new THREE.MeshBasicMaterial({
            map: __WEBPACK_IMPORTED_MODULE_0__textures__["b" /* textures */][textureName],
            side: THREE.DoubleSide
        });
        let geometry = new THREE.CircleGeometry(radius, 32);
        this.ring = new THREE.Mesh(geometry, material);
        this.ring.rotation.x = -Math.PI / 3;
        this.meshes.push(this.ring);
    }

    /**
     * Animate the ring.
     *
     */
    animate() {
        this.ring.rotation.z -= 0.05;
    }
}
/* unused harmony export default */



/***/ })
/******/ ]);