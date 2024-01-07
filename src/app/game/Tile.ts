import { Game } from "../shared/Game";

export class Tile {
    constructor(
        private game: Game,
        public width: number,
        public height: number,
        public x: number,
        public y: number,
        public dy: number,
        public dx: number,
        public weight: number,
        public maxSpeed: number) {}

    public update(): void {
        this.x += this.dx;
        this.y += this.dy;
        // handle x
        if (this.x < 0) {
            this.x = 0;
            this.dx = -this.dx;
        }
        if (this.x > this.game.getWidth() - this.width) {
            this.x = this.game.getWidth() - this.width;
            this.dx = -this.dx;
        }
        // handle y
        if (this.y < 0) {
            this.y = 0;
            this.dy = -this.dy;
        }
        if (this.y > this.game.getHeight() - this.height) {
            this.y = this.game.getHeight() - this.height;
            this.dy = -this.dy;
        }
        // calculate angular motion for both x and y here and adjust their pulls
        // here weight just pulls straight down
        this.dy += this.weight;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        // ctx.translate(this.x, this.y);
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, ctx.canvas.width / 16, ctx.canvas.height / 16);
        ctx.restore();
    }
}