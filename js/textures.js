let loader = new THREE.TextureLoader();

// Textures to be loaded.
// The file property is the route of the file under
// the textures folder.
let texturesInfo = [
    { name: 'beatlesVinyl', file: 'beatlesVinyl.png' },
    { name: 'skyboxBack', file: 'skybox/back.png' },
    { name: 'skyboxBottom', file: 'skybox/bottom.png' },
    { name: 'skyboxFront', file: 'skybox/front.png' },
    { name: 'skyboxLeft', file: 'skybox/left.png' },
    { name: 'skyboxRight', file: 'skybox/right.png' },
    { name: 'skyboxTop', file: 'skybox/top.png' }
]

/**
 * Load a texture using the three js loader.
 * Return a promise.
 *
 */
let loadTexture = function(name, file) {
    return new Promise((resolve, reject) => {
        loader.load(`./textures/${file}`,
            // Function to be executed when the texture is loaded
            (texture) => {
                console.log('Texture loaded: ' + name);
                resolve({ name: name, texture: texture });
            },
            null,
            // Function to be executed if the texture loading failed
            (err) => {
                console.log('Problem loading texture: ' + name);
                reject(err);
            }
        )
    })
}

/**
 * Load all textures included in the textures array.
 * Return a list of promises.
 *
 */
let loadTextures = function() {
    let texturePromises = []
    for (let i = 0; i < texturesInfo.length; i++) {
        texturePromises.push(loadTexture(texturesInfo[i].name,
            texturesInfo[i].file));
    }
    return texturePromises;
}

/**
 * The textures export is a dictionary of textures.
 * Key: texture name
 * Value: texture name obtained from the texturesInfo array.
 *
 */
let textures = {};

/**
 * Load all textures in the textures dictionary.
 * Return a promise that is resolved when all textures
 * are loaded.
 *
 */
let initTextures = function() {
    return new Promise((resolve, reject) => {
        Promise.all(loadTextures())
           .then(function (res) {
               for(let i = 0; i < res.length; i++) {
                   textures[res[i].name] = res[i].texture;
               }
               resolve();
            },
            // Error
            function(err) {
                console.log(err);
                reject();
            })
    });
}

export { initTextures, textures }
