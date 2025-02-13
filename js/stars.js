const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Objects
function Star(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
        x: (Math.random() - 0.5) * 8,
        y: 3,
    };
    this.friction = 0.8;
    this.gravity = 1;
}

Star.prototype.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 20;
    c.fill();
    c.closePath();
    c.restore();
};

Star.prototype.update = function () {
    this.draw();

    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction;
        this.shatter();
    } else {
        this.velocity.y += this.gravity;
    }

    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x * this.friction;
        this.shatter();
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Star.prototype.shatter = function () {
    this.radius -= 3;
    for (let i = 0; i < 8; i++) {
        miniStars.push(new MiniStar(this.x, this.y, 2));
    }
};

function MiniStar(x, y, radius) {
    const colors = ["#FFD700", "#00FFFF", "#FF69B4", "#FF4500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    Star.call(this, x, y, radius, randomColor);
    this.velocity = {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 30,
    };
    this.friction = 0.8;
    this.gravity = 0.1;
    this.ttl = 100;
    this.opacity = 1;
}

MiniStar.prototype.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
    c.shadowColor = this.color;
    c.shadowBlur = 30;
    c.fill();
    c.closePath();
    c.restore();
};

MiniStar.prototype.update = function () {
    this.draw();

    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction;
    } else {
        this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;
    this.opacity -= 0.0001 * this.ttl;
};

function createMountainRange(mountainAmount, height, color) {
    for (let i = 0; i < mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount;
        c.beginPath();
        c.moveTo(i * mountainWidth, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth + 0.2 * canvas.height, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        c.lineTo(i * mountainWidth - 0.2 * canvas.height, canvas.height);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

// Background Gradient (Sunset or Space Theme)
const backgroundGradient = c.createLinearGradient(0, 0, canvas.width, canvas.height);
backgroundGradient.addColorStop(0, "#ff7e5f"); // Orange-Pink
backgroundGradient.addColorStop(1, "#5575a5"); // Blue

let stars;
let miniStars;
let backgroundStars;
let ticker = 0;
let randomSpawnRate = 75;
const groundHeight = 0.09 * canvas.height;

function init() {
    stars = [];
    miniStars = [];
    backgroundStars = [];

    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3;
        const colors = ["#FFFFFF", "#FFC300", "#87CEFA", "#FF69B4"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        backgroundStars.push(new Star(x, y, radius, color));
    }
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgroundStars.forEach((backgroundStar) => {
        backgroundStar.draw();
    });

    createMountainRange(1, canvas.height * 0.7, "#5e548e"); // Dark Purple
    createMountainRange(2, canvas.height * 0.6, "#e56b6f"); // Soft Red
    createMountainRange(3, canvas.height * 0.4, "#ffb3c6"); // Light Pink

    c.fillStyle = "#3b3b58"; // Dark Ground
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    stars.forEach((star, index) => {
        star.update();
        if (star.radius === 0) {
            stars.splice(index, 1);
        }
    });

    miniStars.forEach((miniStar, index) => {
        miniStar.update();
        if (miniStar.ttl === 0) {
            miniStars.splice(index, 1);
        }
    });

    ticker++;
    if (ticker % randomSpawnRate === 0) {
        const radius = 9;
        const x = Math.max(radius, Math.random() * canvas.width - radius);
        const colors = ["#FFD700", "#FF4500", "#87CEFA", "#FF69B4"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        stars.push(new Star(x, -100, radius, color));
        randomSpawnRate = Math.floor(Math.random() * (200 - 125 + 1) + 125);
    }

    requestAnimationFrame(animate);
}

init();
animate();
