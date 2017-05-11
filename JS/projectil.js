var i = 0;

var loop = function() {
var projectil;
  if(isPlayer1){
    projectil = projectilPlayer1;
  }
  else{
    projectil = projectilPlayer2;
  }
   if (!clicado) {

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
        projectil.position.x += projectil.velocity.x;
        projectil.position.y += projectil.velocity.y;
   }

    teste.beginPath();
    teste.clearRect(0,0,canvasTeste.width,canvasTeste.height);
    teste.drawImage(projectil.image, projectil.position.x,projectil.position.y);
    teste.closePath();

    if(projectil.position.x > 1000 || projectil.position.y > 1000){
       window.clearInterval(intervaloJogada);
    }


}
