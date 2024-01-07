import { Tile } from "../game/Tile";


export class Game {
    private ctx: CanvasRenderingContext2D;
    private lastFrameTime: number;
    private tile: Tile;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.lastFrameTime = 0;
        this.tile = new Tile(this, 100, 100, 0, 0, 1, 1, 4, 1);
    }

    public setWindow(width: number, height: number): void {
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
    }

    public getWidth(): number {
        return this.ctx.canvas.width;
    }

    public getHeight(): number {
        return this.ctx.canvas.height;
    }

    public handleClick(event: MouseEvent): void {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // const col = Math.floor(x / this.squareSize);
        // const row = Math.floor(y / this.squareSize);
    }

    public start(): void {
        // game not over, loop
        this.loop(0);
    }

    private update(): void {
        this.tile.update();
    }

    private draw(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.tile.draw(this.ctx);
    }

    private loop(elapsedTime: number): void {
        this.update();
        const delta = elapsedTime - (this.lastFrameTime || 0);
        window.requestAnimationFrame(this.loop.bind(this));
        if (this.lastFrameTime && delta < 12) {
            return;
        }
        this.lastFrameTime = elapsedTime;
        this.draw();
    }
}