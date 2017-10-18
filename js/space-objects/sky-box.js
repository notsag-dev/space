import TexturedBox from './textured-box';

/**
 * A SkyBox. Call the TextureBox constructor using
 * skybox textures.
 *
 * TODO Support multiple sky boxes textures.
 *
 */
export default class SkyBox extends TexturedBox {
    constructor() {
        super(new THREE.Vector3(0, 0, 0), 1000,
            ['skyboxRight', 'skyboxLeft', 'skyboxTop', 'skyboxBottom',
            'skyboxFront', 'skyboxBack']);
    }
}
