import { textures } from '../textures';

export default class TexturedCircle {
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
            map: textures[textureName],
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
