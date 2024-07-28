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

    // Car properties
    const car = {
        x: 0, // Initial x position
        y: canvas.height / 2, // Center y position
        width: 200,
        height: 100,
        speed: 5, // Speed of the car
    };

    // Function to draw the car
    function drawCar() {
        ctx.fillStyle = 'yellow';

        // Draw the body of the car
        ctx.fillRect(car.x, car.y - car.height / 2, car.width, car.height);

        // Draw the wheels
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(car.x + 20, car.y + car.height / 2, 10, 0, Math.PI * 2); // Left wheel
        ctx.arc(car.x + car.width - 20, car.y + car.height / 2, 10, 0, Math.PI * 2); // Right wheel
        ctx.fill();
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawCar();

        car.x += car.speed; // Move the car

        // Reset position if the car moves off-screen
        if (car.x > canvas.width) {
            car.x = -car.width;
        }

        requestAnimationFrame(animate); // Request the next frame
    }

    // Start the animation
    animate();
};
