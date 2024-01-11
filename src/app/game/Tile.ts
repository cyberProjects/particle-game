import { Game } from "../shared/Game";

export class Tile {
    constructor(
        private game: Game,
        public width: number,
        public height: number,
        public x: number,
        public y: number,
        public dx: number,
        public dy: number,
        public mass: number,
        public velocity: number,
        public radians: number) {}

    public update(): void {
        this.dx = this.dxFromAngle(this.radians);
        this.dy = this.dyFromAngle(this.radians);
        // console.log("dx: " + this.dx + " dy: " + this.dy);
        this.x += this.dx + this.velocity;
        this.y += this.dy + this.mass;
        // console.log("x: " + this.x + " y: " + this.y);
        // console.log("x: " + this.x + " y: " + this.y);
        // this.y += this.dy + this.weight;
        // impact with left
        if (this.x < 0) {
            console.log("hitting left border");
            this.x = 0;
            this.slowDown(5);
            // this.dx = -this.dx;
            if (this.radians <  3 * Math.PI / 2 && this.radians > Math.PI) {
                console.log("angle from above");
                this.radians = 5 * Math.PI / 3;
            } else {
                console.log("angle from below (or bug)");
                this.radians = Math.PI / 3;
            }
        }
        if (this.x > this.game.getWidth() - this.width) {
            this.x = this.game.getWidth() - this.width;
            this.slowDown(5);
            // this.dx = -this.dx;
            this.radians = 2 * Math.PI / 3;
        }
        // impact with top
        if (this.y < 0) {
            console.log("hitting the top border");
            this.y = 0;
            this.slowDown(5);
            // this.dy = -this.dy; MUST RECALCULATE ANGLE AND DY
            if (this.radians > 0 && this.radians < Math.PI / 2) {
                console.log("angle from the left");
                this.radians = 7 * Math.PI / 4;
            } else {
                console.log("angle from the right");
                this.radians = 5 * Math.PI / 4;
                console.log(this.radians);
            }
        }
        // impact with bottom
        if (this.y > this.game.getHeight() - this.height) {
            console.log("hitting bottom border");
            this.y = this.game.getHeight() - this.height;
            this.slowDown(5);
            // this.dy = -this.dy;
            if (this.radians > 3 * Math.PI / 2) { // IV
                console.log("angle from the left");
                this.radians = Math.PI / 4; // I
            } else {
                console.log("angle from the right");
                this.radians = 3 * Math.PI / 4; // II
            }
        }
        if (this.velocity == 0) {
            this.speedUp(4);
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        // ctx.translate(this.x, this.y);
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    private dxFromAngle(radians: number): number {
        return Math.cos(radians);
    }

    private dyFromAngle(radians: number): number {
        return -Math.sin(radians);
    }

    private angleFromDxDy(dx: number, dy: number): number {
        return Math.atan2(dy,dx);
    }

    private slowDown(rate: number): void {
        if (this.velocity > 0) {
            this.velocity -= rate;
        }
    }

    private speedUp(rate: number): void {
        if (this.velocity < 50) {
            this.velocity += rate;
        }
    }
}