class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Ball {
    constructor() {
        this.pos = new Vec;
        this.vel = new Vec;
        this.size = new Vec;
    }

    get left() { return this.pos.x; }
    get right() { return this.pos.x + this.size.x; }
    get top() { return this.pos.y; }
    get bottom() { return this.pos.y + this.size.y; }
}

class Player {
    constructor() {
        this.pos = new Vec;
        this.size = new Vec;

        this.size.x = 20;
        this.size.y = 100;
    }

    get left() { return this.pos.x; }
    get right() { return this.pos.x + this.size.x; }
    get top() { return this.pos.y; }
    get bottom() { return this.pos.y + this.size.y; }
}

class Score {
    constructor() {
        this.score = new Player;
    }
}

class Pong {
    constructor() {
        this._canvas = document.getElementById("pong");
        this._context = this._canvas.getContext("2d");

        this.ball = new Ball;

        this.players = [
            new Player,
            new Player
        ];

        this.players[0].score = 0;
        this.players[1].score = 0;

        this.ball.pos.x = 300;
        this.ball.pos.y = 200;

        this.ball.size.x = 10;
        this.ball.size.y = 10;

        this.ball.vel.x = 0;
        this.ball.vel.y = 0;

        this.players[0].pos.x = 20;
        this.players[0].pos.y = 150;
    }
    callback() {
        this.speed();
        this.bounce();
        this.draw();
        this.winCheck();
        this.updateDom();
        requestAnimationFrame(() => this.callback());
    }

    speed() {
        this.ball.pos.x += this.ball.vel.x;
        this.ball.pos.y += this.ball.vel.y;
    }

    bounce() {
        if (this.ball.left < 0 || this.ball.right > this._canvas.clientWidth) {
            this.ball.vel.x = -this.ball.vel.x;
        }
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.clientHeight) {
            this.ball.vel.y = -this.ball.vel.y;
        }
        if (this.players[0].left < this.ball.right && this.players[0].right > this.ball.left &&
            this.players[0].top < this.ball.bottom && this.players[0].bottom > this.ball.top) {
            this.ball.vel.x = -this.ball.vel.x;
            this.ball.vel.x *= 1 + (Math.random() * 20 / 100);
            this.ball.vel.y *= 1 + (Math.random() * 20 / 100);

        }
        if (this.players[1].left < this.ball.right && this.players[1].right > this.ball.left &&
            this.players[1].top < this.ball.bottom && this.players[1].bottom > this.ball.top) {
            this.ball.vel.x = -this.ball.vel.x;
            this.ball.vel.x *= 1 + (Math.random() * 20 / 100);
            this.ball.vel.y *= 1 + (Math.random() * 20 / 100);
        }
    }

    draw() {
        this.drawBackground();
        this.drawWhite(this.ball.pos.x, this.ball.pos.y, this.ball.size.x, this.ball.size.y);
        this.drawPlayers();
        this.update();
    }

    drawBackground() {
        this._context.fillStyle = "#000";
        this._context.fillRect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
    }

    drawWhite(posx, posy, sizex, sizey) {
        this._context.fillStyle = "#fff";
        this._context.fillRect(posx, posy,
            sizex, sizey);

    }

    drawPlayers() {
        this.drawWhite(this.players[0].pos.x, this.players[0].pos.y,
            this.players[0].size.x, this.players[0].size.y)
        this.drawWhite(this.players[1].pos.x, this.players[1].pos.y,
            this.players[1].size.x, this.players[1].size.y)
    }

    update() {
        this.players[1].pos.x = this._canvas.clientWidth - 40;
        this.players[1].pos.y = this.ball.pos.y - (this.players[1].size.y / 2);
    }

    winCheck() {
        if (this.ball.left < 0) {
            this.players[0].score++;
            player0.innerHTML = this.players[1].score;
            player1.innerHTML = this.players[0].score;
            this.reset();
        }
        if (this.ball.right > this._canvas.clientWidth) {
            this.players[1].score++;
            player0.innerHTML = this.players[1].score;
            player1.innerHTML = this.players[0].score;
            this.reset();
        }
    }

    reset() {
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
        this.ball.pos.x = 300;
        this.ball.pos.y = 200;
    }

    start() {
        if (Math.random() < 0.5) {
            this.ball.vel.x = (Math.random() * 1) + 2
        } else {
            this.ball.vel.x = -(Math.random() * 1) - 2
        }
        if (Math.random() < 0.5) {
            this.ball.vel.y = (Math.random() * 3)
        } else {
            this.ball.vel.y = -(Math.random() * 3)
        }
    }

    updateDom() {
        document.getElementById("player0").innerHTML = pong.players[1].score;
        document.getElementById("player1").innerHTML = pong.players[0].score;
        document.getElementById("speed").innerHTML = "Ball speed: " + Math.abs(this.ball.vel.x).toFixed(2);
    }

    buttonOnClick() {
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
        this.ball.pos.x = 300;
        this.ball.pos.y = 200;
        this.players[0].score = 0;
        this.players[1].score = 0;
        player0.innerHTML = pong.players[1].score;
        player1.innerHTML = pong.players[0].score;

    }
}

const pong = new Pong;

addEventListener("mousemove", (e) => {
    
        pong.players[0].pos.y = e.offsetY - pong.players[0].size.y / 2;
    
})

addEventListener("click", () => {
    if (pong.ball.vel.x === 0) {
        pong.start();
    }
})

pong.callback();