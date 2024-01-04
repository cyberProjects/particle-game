export class Square {
    constructor(public x: number, public y: number, public size: number, public color: string, public state: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.state = state;
    }

    public update(): void {
        
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        // context.translate(this.x, this.y);
        context.fillStyle = this.color;
        switch (this.state) {
            case "initial":
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.size, this.size);
                break;
            case "changed":
                context.fillRect(this.x, this.y, this.size, this.size);
                break;
        }
        context.restore();
    }
}

// private drawChessBoard(): void {
//     for (let row = 0; row < 8; row++) {
//       for (let col = 0; col < 8; col++) {
//         const x = col * this.squareSize;
//         const y = row * this.squareSize;
//         this.ctx.fillStyle = (row + col) % 2 === 0 ? '#FFFFFF' : '#000000';
//         this.ctx.fillRect(x, y, this.squareSize, this.squareSize);
//       }
//     }
//   }