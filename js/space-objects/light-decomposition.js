import { getPyramidGeometry } from './geometries'
import LineEmitter from './line-emitter';
import RandomLineEmitter from './random-line-emitter';
import PatternLineEmitter from './pattern-line-emitter';
import { getTextPattern, getLinePattern } from '../letters';

export default class LightDecomposition {
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
        let pattern = getTextPattern('pink floyd');
        console.log(pattern);
        for (let i = 0; i < 6; i++) {
            console.log(getLinePattern(pattern, i));
            this.createRefraction(intersec, dir, -(0.25 + i / 40),
                this.colors[i], getLinePattern(pattern, i));
        }
    }

    /**
     * Create the pyramid and add it to the scene objects array.
     *
     */
    createPyramid(pyramidSize) {
        let geometry = getPyramidGeometry(pyramidSize, pyramidSize,
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
        let whiteLight = new RandomLineEmitter(origin, dir, 0xffffff, length,
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
        let insideEmitter = new RandomLineEmitter(origin, dirRefr1, 0xc0c0c0,
            dist, this.pyramidSize);
        this.emitters.push(insideEmitter);
        this.sceneObjects.push(insideEmitter.sceneObjects[0]);

        // Color emitter
        dirRefr2.applyAxisAngle(zAxis, angle * 1.5);

        let colorEmitter = new PatternLineEmitter(intersec, dirRefr2, color,
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
