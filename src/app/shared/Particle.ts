export class Particle {
    constructor(public x: number, public y: number, public radius: number, public dotColor: string, public particleShape: string, public vertex: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dotColor = dotColor;
        this.particleShape = particleShape; // can be used to encapsulate what state it's in (selected not slected etc.)
        this.vertex = vertex;
    }

    public update(): void {

    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.dotColor;
        switch (this.particleShape) {
            case "unselected":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fill();
                context.shadowColor = 'black';
                context.shadowBlur = 8;
                context.stroke();
                // context.lineWidth = 2;
                // context.strokeStyle = '#FFFFFF';
                // context.stroke();
                break;
            case "visited":
                // square
                // context.fillRect(0, 0, this.radius * 2, this.radius * 2);
                // break;
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fill();
                context.lineWidth = 6;
                context.strokeStyle = 'white';
                context.stroke();
                break;
            case "opVisited":
                // square
                // context.fillRect(0, 0, this.radius, this.radius * 2);
                // context.lineWidth = 4;
                // context.strokeStyle = 'black';
                // context.stroke();
                // break;
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = 'black';
                context.stroke();
                break;
            case "source":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fillStyle = "white";
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = 'white';
                context.stroke();
                break;
            case "opSource":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fillStyle = "black";
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = 'black';
                context.stroke();
                break;
            case "sink":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fillStyle = "yellow";
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = 'yellow';
                context.stroke();
                break;
            case "gameover":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fillStyle = "green";
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = 'green';
                context.stroke();
                break;
        }
        context.restore();
    }
}