export default class Satellite {
    constructor(mesh, radius, yearLength) {
        this.mesh = mesh;
        this.radius = radius;
        this.yearLength = yearLength;
    }

    /**
     * Get the current position of a satellite.
     *
     * @param {number} radius - The radius of the circumference.
     * @param {number} yearLength - time to revolve once around the center
     *     in miliseconds.
     *
     */
    getPosition() {
        return {
            x: (Math.sin((Date.now() % this.yearLength) /
                this.yearLength * Math.PI * 2) * this.radius),
            y: (Math.cos((Date.now() % this.yearLength) /
                this.yearLength * Math.PI * 2) * this.radius),
            z: 0
        }
    }

    /**
     * Update the position of the mesh.
     *
     */
    setPosition() {
        let pos = this.getPosition();
        this.mesh.position.set(pos.x, pos.y, pos.z);
    }
}
