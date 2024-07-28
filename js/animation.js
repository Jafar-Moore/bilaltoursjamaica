// Ensure the script runs only after the DOM is fully loaded
window.onload = function() {
    // Get the canvas and its context
    const canvas = document.getElementById('animationCanvas');
    
    // Check if the canvas element exists
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Check if the context was successfully obtained
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Airplane properties
    const airplane = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 200,
        height: 150,
        speed: 2,
        direction: 1, // 1 for right, -1 for left
        directionY: 1,
    };

    // Smoke properties
    const smokeParticles = [];
    const smokeOptions = {
        width: 10,
        height: 10,
        maxAge: 60,
    };

    // Function to draw the airplane
    function drawAirplane() {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo(airplane.x, airplane.y);
        ctx.lineTo(airplane.x + airplane.width, airplane.y - airplane.height / 2);
        ctx.lineTo(airplane.x + airplane.width, airplane.y + airplane.height / 2);
        ctx.closePath();
        ctx.fill();
    }

    // Function to draw the smoke
    function drawSmoke() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        smokeParticles.forEach((particle, index) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            particle.age++;
            if (particle.age > smokeOptions.maxAge) {
                smokeParticles.splice(index, 1);
            }
        });
    }

    // Function to update airplane position and smoke particles
    function update() {
        // Move the airplane
        airplane.x += airplane.speed * airplane.direction;
        
        // Reverse direction at canvas edges
        if (airplane.x < 0 || airplane.x > canvas.width - airplane.width) {
            airplane.direction *= -1;
        }

        // Add new smoke particles
        if (Math.random() < 0.1) {
            smokeParticles.push({
                x: airplane.x + airplane.width / 2,
                y: airplane.y + airplane.height / 2,
                size: smokeOptions.width * Math.random(),
                age: 0
            });
        }

        // Update smoke particles
        smokeParticles.forEach(particle => {
            particle.y += 1; // Smoke rises
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawAirplane();
        drawSmoke();
        update();
        requestAnimationFrame(animate); // Request the next frame
    }

    // Start the animation
    animate();
};


