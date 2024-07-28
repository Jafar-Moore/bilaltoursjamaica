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

    // Dart properties
    const darts = [];
    const numDarts = 20; // Number of darts

    // Function to create a new dart
    function createDart() {
        const size = 10; // Size of the dart
        const speed = 5 + Math.random() * 5; // Speed of the dart
        const angle = Math.random() * Math.PI * 2; // Random direction

        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            speed: speed,
            angle: angle,
        };
    }

    // Initialize darts
    for (let i = 0; i < numDarts; i++) {
        darts.push(createDart());
    }

    // Function to draw the darts as yellow and pointy
    function drawDarts() {
        ctx.fillStyle = 'yellow';
        darts.forEach(dart => {
            const { x, y, size } = dart;
            ctx.beginPath();
            // Draw a pointy dart (triangle shape)
            ctx.moveTo(x, y); // Center of the dart
            ctx.lineTo(x + size, y - size * 2); // Tip of the dart
            ctx.lineTo(x - size, y - size * 2); // Other side of the dart
            ctx.closePath();
            ctx.fill();
        });
    }

    // Function to update dart positions
    function updateDarts() {
        darts.forEach(dart => {
            dart.x += dart.speed * Math.cos(dart.angle);
            dart.y += dart.speed * Math.sin(dart.angle);

            // Wrap around the screen edges
            if (dart.x < 0) dart.x = canvas.width;
            if (dart.x > canvas.width) dart.x = 0;
            if (dart.y < 0) dart.y = canvas.height;
            if (dart.y > canvas.height) dart.y = 0;
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawDarts();
        updateDarts();
        requestAnimationFrame(animate); // Request the next frame
    }

    // Start the animation
    animate();
};
