import { textures } from '../textures';

export default class TexturedBox {
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
                { map: textures[textureNames[i]], side: THREE.BackSide }
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
