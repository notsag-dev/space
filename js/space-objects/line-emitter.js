import { getRandomInt } from '../utils';
/**
 * Particle emitter. The particles are aligned and they have
 * a movement direction.
 *
 * @param {THREE.Vector3} position - The position of the emitter
 * @param {THREE.Vector3} direction - The movement direction
 * @param {Hex} particleColor - The hex particle color.
 * @param {Number} length - The length of the particles line.
 * @param {Number} number - The number of particles.
 *
 */
export default class LineEmitter {
    constructor(position, direction, particleColor, length, number) {
        this.position = position;
        this.direction = direction;
        this.particleColor = particleColor;
        this.length = length;

        this.sceneObjects = [];
        this.timer = 0;
        let particles = new THREE.Geometry();
        let material = new THREE.PointsMaterial(
            {color: particleColor, size: 1}
        );

        for (let i = 0; i < number; i++) {
            let distance = getRandomInt(0, length);
            let pos = position.clone();
            pos.add(direction.clone().multiplyScalar(distance));
            particles.vertices.push(pos);
        }

        this.particleSystem = new THREE.Points(
            particles,
            material);

       this.sceneObjects.push(this.particleSystem);
    }

    animate(delta) {
        this.timer += delta;
        let geometry = this.particleSystem.geometry;
        let dir = this.direction;
        for (let i = 0; i < geometry.vertices.length; i++) {
            geometry.vertices[i].addScaledVector(this.direction, delta * 10);
            if (geometry.vertices[i].distanceTo(this.position) > this.length) {
                geometry.vertices[i] = this.position.clone();
            }
        }
        geometry.verticesNeedUpdate = true;
    }
}