window.onload = function() {
    const canvas = document.getElementById('animationCanvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Wave properties
    const wave = {
        amplitude: 100,   // Height of the waves
        wavelength: 300, // Distance between wave peaks
        speed: 3,        // Speed of wave movement
        offset: 0        // Offset for wave movement
    };

    // Function to draw the waves
    function drawWaves() {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        
        const { amplitude, wavelength, offset } = wave;
        const numPoints = canvas.width / 10; // Number of points for the wave
        
        // Draw wave using sine function
        for (let x = 0; x <= canvas.width; x++) {
            const y = canvas.height / 2 + amplitude * Math.sin((x + offset) / wavelength * 2 * Math.PI);
            ctx.lineTo(x, y);
        }
        
        // Close the path and fill
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawWaves();
        wave.offset += wave.speed; // Move the wave
        requestAnimationFrame(animate); // Request the next frame
    }

    // Start the animation
    animate();
};
