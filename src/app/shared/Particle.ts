export class Particle {
    constructor(public x: number,
        public y: number,
        public radius: number,
        public dotColor: string,
        public particleShape: string,
        public vertex: number,
        public dx: number,
        public dy: number,
        public alpha: number) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dotColor = dotColor;
        this.particleShape = particleShape; // can be used to encapsulate what state it's in (selected not slected etc.)
        this.vertex = vertex;
        this.dx = dx;
        this.dy = dy;
        this.alpha = alpha;
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

                // context.globalAlpha = 0.1
                // context.globalCompositeOperation = "destination-over";

                // context.shadowColor = "#233142";
                // context.shadowBlur = 8;
                // context.shadowOffsetX = 2;
                // context.shadowOffsetY = 2;
                // context.lineWidth = 3;
                // context.strokeStyle = '#f8f9fa';
                // context.stroke();
                // const time = new Date();
                // context.rotate(
                //     ((2 * Math.PI) / 6) * time.getSeconds() +
                //       ((2 * Math.PI) / 6000) * time.getMilliseconds(),
                //   );
                break;
            case "visited":
                // square
                // context.fillRect(0, 0, this.radius * 2, this.radius * 2);
                // break;
                context.beginPath();
                context.arc(0, 0, this.radius * 1.25, 0, 2 * Math.PI, true);
                context.fill();
                context.lineWidth = 4;
                // context.strokeStyle = "rgba(255, 201, 60,.5)";
                context.strokeStyle = "rgba(0, 0, 0,.5)";

                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
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
                context.arc(0, 0, this.radius * 1.25, 0, 2 * Math.PI, true);
                context.fill();
                context.lineWidth = 4;
                context.strokeStyle = "rgba(186, 0, 33,.5)";

                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.stroke();
                break;
            case "source":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fillStyle = 'rgba(255,255,255,0.5)';
                context.fill();
                context.lineWidth = 4;
                context.strokeStyle = 'rgba(0,0,0,0.8)';

                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.stroke();
                break;
            case "opSource":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                context.fillStyle = 'rgba(0,0,0,0.5)';
                context.fill();
                context.lineWidth = 4;
                context.strokeStyle = 'rgba(255,255,255,0.8)';
                
                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.stroke();
                break;
            case "sink":
                context.beginPath();
                context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
                // context.fillStyle = "rgba(228, 97, 97)";
                context.fillStyle = "rgba(212,175,55)";
                context.fill();
                context.lineWidth = 4;
                context.strokeStyle = 'rgba(255,255,255,.8';

                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.stroke();
                break;
            case "win":
                context.beginPath();
                context.arc(0, 0, this.radius * 1.5, 0, 2 * Math.PI, true);
                context.fillStyle = "rgba(162, 193, 28, .5)";
                context.fill();
                context.lineWidth = 4;
                // context.strokeStyle = "rgba(212,175,55)";
                context.strokeStyle = "rgba(192,192,192,.8)";

                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.stroke();
                break;
            case "lose":
                context.beginPath();
                context.arc(0, 0, this.radius * 1.5, 0, 2 * Math.PI, true);
                context.fillStyle = "red";
                context.fill();
                context.lineWidth = 4;
                context.strokeStyle = "rgba(186, 0, 33,.8)";

                context.shadowColor = "#000000";
                context.shadowBlur = 8;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.stroke();
                break;
        }
        context.restore();
    }
}