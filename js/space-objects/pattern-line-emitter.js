import { textures } from '../textures';
import LineEmitter from './line-emitter'

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
export default class PatternLineEmitter extends LineEmitter {
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
