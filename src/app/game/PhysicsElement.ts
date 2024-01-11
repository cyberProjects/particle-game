import { Game } from "../shared/Game";

export class PhysicsElement {
    private radians: number;
    private dx: number;
    private dy: number;

    constructor(
        private game: Game,
        public width: number,
        public height: number,
        public x: number,
        public y: number,
        public mass: number,
        public velocity: number,
        public degrees: number) { }

    public update(): void {
        this.radians = this.degrees * Math.PI / 180;
        this.dx = this.dxFromAngle(this.radians) * this.velocity;
        this.dy = this.dyFromAngle(this.radians) * this.velocity;
        // this.x += this.dx * this.velocity;
        // this.y += this.dy * this.velocity;
        this.degrees++;
        this.degrees = this.degrees % 360;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    private dxFromAngle(radians: number): number {
        return Math.cos(radians);
    }

    private dyFromAngle(radians: number): number {
        return Math.sin(radians);
    }

    private angleFromDxDy(dx: number, dy: number): number {
        return Math.atan2(dy, dx);
    }
}