//  Vertex shader program
var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform vec4 u_Translation;
void main() {
    gl_Position = a_Position + u_Translation;  // Coordinates
}`;

// Fragment Shader program
var FSHADER_SOURCE = `
void main() {
    gl_FragColor = vec4(0.25, 0.88, 0.82, 1.0); // Set the color
}`;

function main () {
    // 1. Retrieve the canvas element
    var canvas = document.getElementById('webgl');

    // 2. Get the webGL rendering context
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get rendering context for WebGL.');
        return;
    }

    // 3. Initialise shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialise shaders.');
        return;
    }

    var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation')
    if (!u_Translation) {
        console.log("Error creating the translation")
    }

    gl.uniform4f(u_Translation, 0.4, 0.4, 0.0, 0.0)

    // 4. Set positions of vertices
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices.');
        return;
    }

    // 7. Set colour for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 8. Clear <canvas> 
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw three points
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

function initVertexBuffers(gl) {
    // 4.1. Define vertices
    var vertices = new Float32Array([
        0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
        -0.5, 0.5
    ]);
    var n = 4; // The number of vertices

    // 4.2. Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create buffer object');
        return -1;
    }

    // 4.3. Bind buffer object to a target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 4.4. Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 4.5. Get storage locations for shader attributes
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get storage location of a_Position');
        return;
    }

    // 4.6. Assign buffer object to a_Position (attribute) variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 4.7. Enable assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}


