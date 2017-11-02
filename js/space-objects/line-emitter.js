/**
 * LineEmitter. The particles are aligned and they have
 * a movement direction.
 *
 * This class was created to be extended, not instantiated.
 *
 */
export default class LineEmitter {
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
