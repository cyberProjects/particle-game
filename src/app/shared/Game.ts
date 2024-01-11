import { GraphGame } from "../game/GraphGame";
import { PhysicsElement } from "../game/PhysicsElement";

export class Game {
    private ctx: CanvasRenderingContext2D;
    private lastFrameTime: number;
    private graphGame: GraphGame;
    private tiles: PhysicsElement[];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.lastFrameTime = 0;
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
        this.init();
        this.loop(0);
    }

    private update(): void {
        this.tiles.forEach(tile => tile.update());
    }

    private draw(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.tiles.forEach(tile => tile.draw(this.ctx));
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

    private init(): void {
        this.graphGame = new GraphGame();
        this.tiles = []
        let radius = this.ctx.canvas.width / 64;
        let vertices = this.graphGame.getVertices();
        let x = this.ctx.canvas.width / 12;
        let y = this.ctx.canvas.width / 12;
        for (let i = 0; i < vertices.length; i++) {
            if (i % 8 == 0) {
                x = 2 * radius;
                y += 2 * radius
            }
            x += 2 * radius;
            let tile = new PhysicsElement(this, radius, radius, x, y, 0, .09, 30);
            this.tiles.push(tile);
        }
    }
}