import { textures } from '../textures';

export default class ImageRing {
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
            map: textures[textureName],
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
