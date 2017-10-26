import { getPyramidGeometry } from './geometries'

export default class LightDecomposition {
    constructor() {
        this.meshes = [];

        // Pyramid
        let geometry = getPyramidGeometry(10, 10, 10);
        let material = new THREE.MeshBasicMaterial(
            { color: 0xffffff, wireframe: true, side: THREE.DoubleSide }
        );
        this.pyramid = new THREE.Mesh(geometry, material);
        this.meshes.push(this.pyramid);

        // Find the intersection between the "light" (represented as a line)
        // and the pyramid
        let origin = new THREE.Vector3(-15, 0, 0);
        let dir = new THREE.Vector3(1, 0.4, 0).normalize();
        let intersec = this.findIntersection(origin, dir, this.pyramid);
        intersec.x += 0.0001;

        // Create the line for the initial ray
        let line = this.getLine(origin, intersec);
        this.meshes.push(line);

        // Get all refracted rays inside the pyramid
        for (let i = 1; i < 8; i++) {
            this.meshes.push(
                this.getRefractedLine(intersec, dir, -(0.25 + i / 30), this.pyramid)
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
        let dirClone = dir.clone();
        dirClone.applyAxisAngle(zAxis, angle);
        let intersec = this.findIntersection(origin, dirClone, mesh);
        if (!intersec){
            return null;
        }
        return this.getLine(origin, intersec);
    }

    /**
     * Create a ray from an origin with a direction and return
     * its intersection with a mesh.
     *
     * @param {THREE.Vector3} origin - The origin of the ray.
     * @param {THREE.Vector3} dir - The direction of the ray (normalized).
     * @param {THREE.Mesh} mesh - The mesh to find the intersection.
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

    animate() {
    }
}
