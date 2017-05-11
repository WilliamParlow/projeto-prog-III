function getMousePosition(e , projectil) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}
var mouseDown = function(e , projectil) {
    if (e.which == 1) {
        getMousePosition(e);
        mouse.isDown = true;
        projectil.position.x = mouse.x;
        projectil.position.y = mouse.y;
    }
}
var mouseUp = function(e, projectil) {
    if (e.which == 1) {
        console.log(e.which);
        mouse.isDown = false;
        projectil.velocity.y = (projectil.position.y - mouse.y) /10;
        projectil.velocity.x = (projectil.position.x - mouse.x) / 10;
    }
}

var setup = function(projectil1, projectil2) {

    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

    teste.fillStyle = 'red';
    teste.strokeStyle = '#000000';
    loopTimer = setInterval(loop(projectil1), frameDelay);
}

var loop = function(projectil) {

    if ( !clicado) {

        // Do physics
            // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var Fx = -0.5 * projectil.Cd * projectil.A * projectil.rho * projectil.velocity.x * projectil.velocity.x * projectil.velocity.x / Math.abs(projectil.velocity.x);
        var Fy = -0.5 * projectil.Cd * projectil.A * projectil.rho * projectil.velocity.y * projectil.velocity.y * projectil.velocity.y / Math.abs(projectil.velocity.y);

        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);

            // Calculate acceleration ( F = ma )
        var ax = Fx / projectil.mass;
        var ay = projectil.ag + (Fy / projectil.mass);
            // Integrate to get velocity
        projectil.velocity.x += ax*frameRate;
        projectil.velocity.y += ay*frameRate;

            // Integrate to get position
        projectil.position.x += projectil.velocity.x*frameRate*100;
        projectil.position.y += projectil.velocity.y*frameRate*100;
    }

    /*
    // Handle collisions
    if (projectil.position.y > height - projectil.radius) {
        projectil.velocity.y *= projectil.restitution;
        projectil.position.y = height - projectil.radius;
    }
    if (projectil.position.x > width - projectil.radius) {
        projectil.velocity.x *= projectil.restitution;
        projectil.position.x = width - projectil.radius;
    }
    if (projectil.position.x < projectil.radius) {
        projectil.velocity.x *= projectil.restitution;
        projectil.position.x = projectil.radius;
    }
    // Draw the projectil
*/

    teste.clearRect(0,0,teste.width,teste.height);

    teste.save();

    teste.translate(projectil.position.x, projectil.position.y);
    teste.beginPath();
    teste.closePath();

    teste.restore();

}

    setup(projectilPlayer1, projectilPlayer2);
