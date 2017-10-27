import Satellite from './satellite'

/**
 * Planet with a particle system ring.
 *
 */
export default class ParticleSystemRingPlanet {
    constructor(planetMesh, ringParticleMaterial, ringParticlesCount) {
        this.sceneObjects = [];
        this.satellites = [];

        sceneObjects.push(planetMesh);
        this.addRing(ringParticleCount);
    }

    /**
     * Add the ring particle system.
     *
     */
    addRing(satellitesCount) {
        for (let i = 0; i < satellitesCount; i++) {
            let satelliteGeometry = new THREE.SphereGeometry(
                Math.floor(Math.random() * ( - 300) + 250)
            );
            let satelliteMesh = new THREE.Mesh(
                satelliteGeometry, planetMaterial
            );

            // TODO try adding the satellite to the planet directly.
            this.sceneObjects.push(satelliteMesh);

            this.satellites.push(new Satellite(
                satelliteMesh,
                Math.floor(Math.random() * (250 - 300) + 250),
                Math.floor(Math.random() * 10000)
            ));
        }
    }

    /**
     * Animate the particles
     *
     */
    animate() {
        for (let i = 0; i < satellites.length; i++) {
            satellites[i].setPosition();
        }
    }
}
