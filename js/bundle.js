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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
               for (let i = 0; i < res.length; i++) {
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
/**
 * LineEmitter. The particles are aligned and they have
 * a movement direction.
 *
 * This class was created to be extended, not instantiated.
 *
 */
class LineEmitter {
    constructor(position, direction, particleColor, length, number) {
        this.position = position;
        this.direction = direction.normalize();
        this.particleColor = particleColor;
        this.length = length;
        this.number = number;
        this.sceneObjects = [];

        let particles = new THREE.Geometry();
        let material = new THREE.PointsMaterial(
            { color: particleColor, size: 1 }
        );
        this.particleSystem = new THREE.Points(particles,material);
        this.sceneObjects.push(this.particleSystem);
    }

    animate(delta) {
        let geometry = this.particleSystem.geometry;
        for (let i = 0; i < geometry.vertices.length; i++) {
            geometry.vertices[i].addScaledVector(this.direction, delta * 8);
            let distanceOrigin = geometry.vertices[i].distanceTo(this.position);
            if (distanceOrigin > this.length) {
                let pos = this.position.clone();
                geometry.vertices[i] = pos.addScaledVector(this.direction,
                    distanceOrigin - this.length);
            }
        }
        geometry.verticesNeedUpdate = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineEmitter;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__space_objects_sky_box__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__space_objects_light_decomposition__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__space_objects_textured_circle__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__textures__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__space_objects_line_emitter__ = __webpack_require__(1);






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
Object(__WEBPACK_IMPORTED_MODULE_3__textures__["a" /* initTextures */])().then(() => {
    spaceObjects.push(new __WEBPACK_IMPORTED_MODULE_2__space_objects_textured_circle__["a" /* default */](50, 'beatlesVinyl',
        new THREE.Vector3(30, -30, -150)));
    spaceObjects.push(new __WEBPACK_IMPORTED_MODULE_0__space_objects_sky_box__["a" /* default */]());
    spaceObjects.push(new __WEBPACK_IMPORTED_MODULE_1__space_objects_light_decomposition__["a" /* default */](30));
    populate(scene, spaceObjects);
    animate();
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textured_box__ = __webpack_require__(4);


/**
 * A SkyBox. Call the TextureBox constructor using
 * skybox textures.
 *
 * TODO Support multiple sky boxes textures.
 *
 */
class SkyBox extends __WEBPACK_IMPORTED_MODULE_0__textured_box__["a" /* default */] {
    constructor() {
        super(new THREE.Vector3(0, 0, 0), 100000,
            ['skyboxRight', 'skyboxLeft', 'skyboxTop', 'skyboxBottom',
            'skyboxFront', 'skyboxBack']);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SkyBox;



/***/ }),
/* 4 */
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

        this.sceneObjects = []
        this.sceneObjects.push(this.boxMesh);
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometries__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_emitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__random_line_emitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pattern_line_emitter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__letters__ = __webpack_require__(10);






class LightDecomposition {
    constructor(pyramidSize) {
        this.pyramidSize = pyramidSize;
        this.sceneObjects = [];
        this.emitters = [];

        // TODO Move to configs
        this.colors = [0xff1b28, 0xff8000, 0xfdfa1f, 0x3bc720, 0x1d94bc,
            0x5c37b8];

        this.createPyramid(pyramidSize);

        let origin = new THREE.Vector3(-1.5 * pyramidSize, 0, 0);
        let dir = new THREE.Vector3(1, 0.4, 0).normalize();
        let intersec = this.createWhiteLightEmitter(origin, dir, pyramidSize);

        // Create refracted rays and get all their intersections
        // with the pyramid.
        let pattern = Object(__WEBPACK_IMPORTED_MODULE_4__letters__["b" /* getTextPattern */])('pink floyd');
        console.log(pattern);
        for (let i = 0; i < 6; i++) {
            console.log(Object(__WEBPACK_IMPORTED_MODULE_4__letters__["a" /* getLinePattern */])(pattern, i));
            this.createRefraction(intersec, dir, -(0.25 + i / 40),
                this.colors[i], Object(__WEBPACK_IMPORTED_MODULE_4__letters__["a" /* getLinePattern */])(pattern, i));
        }
    }

    /**
     * Create the pyramid and add it to the scene objects array.
     *
     */
    createPyramid(pyramidSize) {
        let geometry = Object(__WEBPACK_IMPORTED_MODULE_0__geometries__["a" /* getPyramidGeometry */])(pyramidSize, pyramidSize,
            pyramidSize);
        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2
        });
        this.pyramid = new THREE.Mesh(geometry, material);
        this.sceneObjects.push(this.pyramid);
    }

    /**
     * Create the white light particles emitter.
     *
     * @returns THREE.Vector3 The intersection between the white light
     *      and the pyramid.
     */
    createWhiteLightEmitter(origin, dir, pyramidSize) {
        let intersec = this.findIntersection(origin, dir, this.pyramid);
        intersec.x += 0.0001;

        let length = origin.distanceTo(intersec);
        let whiteLight = new __WEBPACK_IMPORTED_MODULE_2__random_line_emitter__["a" /* default */](origin, dir, 0xffffff, length,
            pyramidSize * 2);
        this.emitters.push(whiteLight);
        this.sceneObjects.push(whiteLight.sceneObjects[0]);

        return intersec;
    }

    /**
     * Create the refracted line inside the prism from the
     * information of the original ray, and the particles
     * emitters.
     *
     * @param THREE.Vector3 dir - The direction of the original ray
     *      coming into contact with the prism.
     * @param THREE.Vector3 origin - The contact point between the
     *      original ray and the prism. This will be the origin of
     *      the new refracted line.
     * @param Number angle - The refraction angle.
     * @param THREE.Object3d object - The 3d object.
     *
     */
    createRefraction(origin, dir, angle, color, pattern) {
        let zAxis = new THREE.Vector3(0, 0, 1);
        let dirRefr1 = dir.clone();
        let dirRefr2 = dir.clone();

        dirRefr1.applyAxisAngle(zAxis, angle);
        let intersec = this.findIntersection(origin, dirRefr1, this.pyramid);
        if (!intersec) {
            return null;
        }

        // Emitter inside the pyramid.
        let dist = origin.distanceTo(intersec);
        let insideEmitter = new __WEBPACK_IMPORTED_MODULE_2__random_line_emitter__["a" /* default */](origin, dirRefr1, 0xc0c0c0,
            dist, this.pyramidSize);
        this.emitters.push(insideEmitter);
        this.sceneObjects.push(insideEmitter.sceneObjects[0]);

        // Color emitter
        dirRefr2.applyAxisAngle(zAxis, angle * 1.5);

        let colorEmitter = new __WEBPACK_IMPORTED_MODULE_3__pattern_line_emitter__["a" /* default */](intersec, dirRefr2, color,
            this.pyramidSize * 10, this.pyramidSize * 10, pattern);
        this.emitters.push(colorEmitter);
        this.sceneObjects.push(colorEmitter.sceneObjects[0]);
    }

    /**
     * Create a ray from an origin with a direction and return
     * its intersection with a mesh.
     *
     * @param THREE.Vector3 origin - The origin of the ray.
     * @param THREE.Vector3 dir - The direction of the ray (normalized).
     * @param THREE.Mesh mesh - The mesh to find the intersection.
     *
     */
    findIntersection(origin, dir, mesh) {
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
        let geoRay = new THREE.Geometry();
        geoRay.vertices.push(point1);
        geoRay.vertices.push(point2);
        return new THREE.Line(geoRay, lineMaterial);
    }

    /**
     * Animate the light decomposition (animate the emitters)
     *
     */
    animate(delta) {
        for (let i = 0; i < this.emitters.length; i++) {
            this.emitters[i].animate(delta);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LightDecomposition;



/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_emitter__ = __webpack_require__(1);



/**
 * Particle emitter. The particles are aligned and they have
 * a movement direction.
 *
 */
class RandomLineEmitter extends __WEBPACK_IMPORTED_MODULE_1__line_emitter__["a" /* default */] {
    /**
     * Constructor.
     *
     * @param THREE.Vector3 position - The position of the emitter
     * @param THREE.Vector3 direction - The movement direction
     * @param Hex particleColor - The hex particle color.
     * @param Number length - The length of the particles line.
     * @param Number number - The number of particles.
     *
     */
    constructor(position, direction, particleColor, length, number) {
        super(position, direction, particleColor, length, number);
        this.particleSystem.geometry.vertices = this.getVertices();
        this.particleSystem.geometry.verticesNeedUpdate = true;
    }

    getVertices() {
        let vertices = [];
        for (let i = 1; i <= this.number; i++) {
            let distance = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getRandomInt */])(0, this.length);
            let pos = this.position.clone();
            pos.addScaledVector(this.direction, distance);
            vertices.push(pos);
        }
        return vertices;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = RandomLineEmitter;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRandomInt; });
/**
 * Generate a random int between min and max
 *
 */
let getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_emitter__ = __webpack_require__(1);



/**
 * Line emitter that receives as parameter what particles are drown.
 *
 * @param THREE.Vector3 position - The position of the emitter
 * @param THREE.Vector3 direction - The movement direction
 * @param Number particleColor - The hex particle color.
 * @param Number length - The length of the particles line.
 * @param Number number - The number of particles.
 * @param Number[] pattern - Array with 1s and 0s indicating which
 *      points positions will be rendered.
 *
 */
class PatternLineEmitter extends __WEBPACK_IMPORTED_MODULE_1__line_emitter__["a" /* default */] {
    constructor(position, direction, particleColor, length, number, pattern) {
        super(position, direction, particleColor, length, number);
        this.pattern = pattern;
        this.particleSystem.geometry.vertices = this.getVertices();
        this.particleSystem.geometry.verticesNeedUpdate = true;
    }

    getVertices() {
        let vertices = [];
        for (let i = 0; i < this.length; i++) {
            if (this.pattern[i % this.pattern.length] == 0) {
                let pos = this.position.clone();
                pos.addScaledVector(this.direction, i);
                vertices.push(pos);
            }
        }
        return vertices;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PatternLineEmitter;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getTextPattern;
/* harmony export (immutable) */ __webpack_exports__["a"] = getLinePattern;
function getTextPattern(text) {
    let pattern = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] == ' ') {
            pattern = pattern.concat(letters.space);
        } else {
            pattern = pattern.concat(letters[text[i]]);
        }
        pattern = pattern.concat(letters.space);
    }
    return pattern;
}

/**
 * Get the pattern for one line by its num.
 *
 * @param Number[] pattern - The complete pattern (with the six
 *      lines information)
 * @param Number lineNum - The line numbers. The line of the top
 *      is the number 0.
 *
 */
function getLinePattern(pattern, lineNum) {
    let linePattern = [];
    for (let i = lineNum * 5; i < pattern.length; i += 30) {
        for (let j = i; j <= i + 4; j++) {
            linePattern.push(pattern[j]);
        }
    }
    return linePattern;
}

let letters = {};

letters.space = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];

letters.a = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.d = [
    1, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 0,
];

letters.e = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1
];

letters.f = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0
];

letters.h = [
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.i = [
    1, 1, 1, 1, 1,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    1, 1, 1, 1, 1
]

letters.k = [
    1, 0, 0, 0, 1,
    1, 0, 0, 1, 0,
    1, 1, 1, 0, 0,
    1, 0, 0, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.l = [
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1
];

letters.m = [
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
]

letters.n = [
    1, 1, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 1, 1
];

letters.o = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1
];

letters.p = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
];

letters.r = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.s = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    1, 1, 1, 1, 1
];

letters.t = [
    1, 1, 1, 1, 1,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0
];

letters.y = [
    1, 0, 0, 0, 1,
    0, 1, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
];



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textures__ = __webpack_require__(0);


class TexturedCircle {
    /**
     * Constructor.
     * @param {number} radius - The radius of the ring.
     * @param {string} textureName - The name of an already loaded texture to
     *      be used as the ring image.
     * @param {THREE.Vector3} position - The initial position.
     *
     */
    constructor(radius, textureName, position) {
        let material = new THREE.MeshBasicMaterial({
            map: __WEBPACK_IMPORTED_MODULE_0__textures__["b" /* textures */][textureName],
            side: THREE.DoubleSide
        });
        let geometry = new THREE.CircleGeometry(radius, 32);
        this.ring = new THREE.Mesh(geometry, material);
        this.ring.rotation.x = -Math.PI / 2;
        this.ring.position.set(position.x, position.y, position.z);

        this.sceneObjects = []
        this.sceneObjects.push(this.ring);
    }

    /**
     * Animate the ring.
     *
     */
    animate() {
        this.ring.rotation.z -= 0.05;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TexturedCircle;



/***/ })
/******/ ]);