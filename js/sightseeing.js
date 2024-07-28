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

    // Person properties
    const person = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 60,
        height: 100,
        speed: 1, // Speed of movement
        direction: 1, // 1 for right, -1 for left
    };

    // Tree properties
    const tree = {
        width: 50,
        height: 100,
        x: canvas.width / 2 - 300,
        y: canvas.height / 2 + 20
    };

    // Function to draw the person
    function drawPerson() {
        // Head
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(person.x, person.y - person.height / 2 + 20, 20, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillRect(person.x - 15, person.y - person.height / 2 + 40, 30, person.height - 60);

        // Arms
        ctx.fillRect(person.x - 30, person.y - person.height / 2 + 40, 15, person.height - 60);
        ctx.fillRect(person.x + 15, person.y - person.height / 2 + 40, 15, person.height - 60);

        // Legs
        ctx.fillRect(person.x - 15, person.y - 10, 15, 30);
        ctx.fillRect(person.x, person.y - 10, 15, 30);
    }

    // Function to draw trees
    function drawTree(x, y) {
        // Tree trunk
        ctx.fillStyle = 'brown';
        ctx.fillRect(x, y, 20, 50);

        // Tree leaves
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(x + 10, y - 10, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    // Function to update position
    function update() {
        // Move the person horizontally
        person.x += person.speed * person.direction;

        // Reverse direction at canvas edges
        if (person.x < 0 || person.x > canvas.width) {
            person.direction *= -1;
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw trees
        for (let i = 0; i < canvas.width; i += 150) {
            drawTree(tree.x + i, tree.y);
        }

        drawPerson();
        update();
        requestAnimationFrame(animate); // Request the next frame
    }

    // Start the animation
    animate();
};
