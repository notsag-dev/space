import { getRandomInt } from '../utils';
import LineEmitter from './line-emitter';

/**
 * Particle emitter. The particles are aligned and they have
 * a movement direction.
 *
 */
export default class RandomLineEmitter extends LineEmitter {
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
            let distance = getRandomInt(0, this.length);
            let pos = this.position.clone();
            pos.addScaledVector(this.direction, distance);
            vertices.push(pos);
        }
        return vertices;
    }

}
