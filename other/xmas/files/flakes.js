    class Flake {
        constructor(id, canvasWidth, canvasHeight) {
            this.id = id;
            this.x = Math.random() * canvasWidth; // Random horizontal position
            this.y = 0; // Start from the top
            this.speed = Math.random() * 2 + 1;
            this.amplitude = Math.random() * 6 + 6;
            this.frequency = Math.random() * 0.005 + 0.005; // Random frequency for sinusoidal movement
            this.phase = Math.random() * Math.PI;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;

            const canvas = document.createElement("canvas");
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            document.body.appendChild(canvas);
            this.ctx = canvas.getContext("2d");
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.y * this.frequency + this.phase) * this.amplitude;

            if (this.y > this.canvasHeight) {
                this.y = 0;
                this.x = Math.random() * this.canvasWidth;
            }
        }

        draw(image) {
            this.ctx.drawImage(image, this.x, this.y);
        }
    }

    class FlakeAnimation {
        constructor(numFlakes) {
            this.enabled = false; // Start with snow disabled
            this.numFlakes = numFlakes;
            this.flakes = [];
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            this.flakeImage = new Image();
            this.flakeImage.src = 'files/flake.png';
            this.startTime = Date.now(); // To track time elapsed

            this.createFlakes();
            this.flakeImage.onload = () => this.animate();
            console.log('Starting snowing...');
            this.enableSnow();

        }

        createFlakes() {
            for (let i = 0; i < this.numFlakes; i++) {
                this.flakes.push(new Flake(i, this.canvasWidth, this.canvasHeight));
            }
        }

        enableSnow() {
            setInterval(() => {
                this.enabled = !this.enabled;
            }, 77000);
        }

        animate() {
            const periodicMultiplier = new Date().getSeconds() > 30 ? 0.3 : 0.7;

            this.flakes.forEach(flake => {
                flake.update();
                flake.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

                if (this.enabled) {
                    if (flake.id % 2 === 0) {
                        flake.x *= periodicMultiplier;
                        flake.x += 12 + 7 * flake.id;
                        flake.y += flake.id / 3;
                    }
                    flake.draw(this.flakeImage);
                }
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    const snowAnimation = new FlakeAnimation(20);
