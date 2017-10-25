/**
 * Get a pyramid geometry.
 *
 */
let getPyramidGeometry = function(width, length, height) {
    let geometry = new THREE.Geometry();

    geometry.vertices = [
        new THREE.Vector3(-0.5, 0, -0.5),
        new THREE.Vector3(0.5, 0, -0.5),
        new THREE.Vector3(0.5, 0, 0.5),
        new THREE.Vector3(-0.5, 0, 0.5),
        new THREE.Vector3(0, 1, 0)
    ];

    geometry.faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3),
        new THREE.Face3(1, 0, 4),
        new THREE.Face3(2, 1, 4),
        new THREE.Face3(3, 2, 4),
        new THREE.Face3(0, 3, 4)
    ];

    var transformation =
        new THREE.Matrix4().makeScale(width, length, height);
    geometry.applyMatrix(transformation);

    return geometry;
}

export { getPyramidGeometry }
