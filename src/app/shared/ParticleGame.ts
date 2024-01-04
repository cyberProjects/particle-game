import { Particle } from "./Particle";
import { Square } from "./Square";
import { Vertex } from "./Vertex";

export class ParticleGame {
    // configs
    private rows: number = 8;
    private cols: number = 8;
    private vertices: Vertex[];
    private adjacencyMatrix: number[][];
    private sink: number;
    private gameover: boolean;
    // player
    private leastCostPath: number[];
    private leastCost: number;
    private source: number;
    private visited: number[];
    private visitedCost: number;
    // opponent
    private opLeastCostPath: number[];
    private opLeastCost: number;
    private opSource: number;
    private opVisited: number[];
    private opVisitedCost: number;
    // visuals
    private particles: Particle[];
    private colors = ['#e6261f', '#f7d038', '#a3e048', '#34bbe6', '#d23be7'];
    private squares: Square[];
    private particleMap: Particle[][];

    constructor(private context: CanvasRenderingContext2D, private squareSize: number, private canvasSize: number) {
        this.buildGraph();
        this.init();
    }

    public handleClick(row: number, col: number): void {
        const index = this.coordToIndex(row, col);
        this.play(index);
        console.log(`Clicked on square (${row}, ${col}) : ${index}`);
        console.log("Source: " + this.source);
        console.log("Sink: " + this.sink);
        console.log("OpSource: " + this.opSource);
        console.log("Path: " + this.leastCostPath);
        console.log("OpPath: " + this.opLeastCostPath);
        console.log("Gameover: " + this.gameover);
        console.log("Visited: " + this.visited);
        console.log("OpVisited: " + this.opVisited);
    }

    public init(): void {
        this.makeSquares();
        this.makeParticles(4, this.squareSize);
        this.initStates();
    }

    public update(): void {
        if (this.gameover == true) {
            for (let i = 0; i < this.particles.length; i++) {
                if (this.particles[i].vertex == this.sink) {
                    this.particles[i].particleShape = "gameover";
                }
            }
        } else {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].x += (Math.random() * 0.3 - 0.15);
                this.particles[i].y += (Math.random() * 0.3 - 0.15);
                if (this.particles[i].vertex != this.source && this.particles[i].vertex != this.opSource && this.particles[i].vertex != this.sink) {
                    if (this.visited.includes(this.particles[i].vertex)) {
                        this.particles[i].particleShape = "visited";
                    }
                    if (this.opVisited.includes(this.particles[i].vertex)) {
                        this.particles[i].particleShape = "opVisited";
                    }
                }
            }
        }
        // for (var i = 0; i < this.particles.length; i++) {
        //     this.particles[i].x += (Math.random() * 0.3 - 0.15);
        //     this.particles[i].y += (Math.random() * 0.3 - 0.15);
        // }
    }

    public draw(): void {
        this.context.clearRect(0, 0, this.canvasSize, this.canvasSize);
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].draw(this.context);
        }
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(this.context);
        }
    }

    private makeParticles(n: number, squareSize: number): void {
        this.particles = [];
        for (let i = 0; i < this.vertices.length; i++) {
            let v = this.vertices[i];
            let xy = this.indexToCoord(v.getId());
            const x = xy[1] * squareSize; // y * square size
            const y = xy[0] * squareSize; // x * square size
            let state = v.getClass();
            let type = this.convertWeightToColor(v.getType());
            for (let j = 0; j < v.getType(); j++) {
                let particle = new Particle(
                    x + (squareSize / 2) + Math.random() * squareSize / 4,
                    y + (squareSize / 2) + Math.random() * squareSize / 4,
                    Math.random() * squareSize / 3,
                    type,
                    state,
                    v.getId()
                );
                this.particles.push(particle);
            }
        }
        console.log("particles count: " + this.particles.length);
    }

    private convertWeightToColor(weight: number): string {
        return this.colors[weight - 1];
    }

    private initStates(): void {
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].vertex == this.source) {
                this.particles[i].particleShape = "source";
            }
            if (this.particles[i].vertex == this.sink) {
                this.particles[i].particleShape = "sink";
            }
            if (this.particles[i].vertex == this.opSource) {
                this.particles[i].particleShape = "opSource";
            }
        }
    }

    // private makeParticles(n: number, squareSize: number): Particle[] {
    //     let particles = [];
    //     for (let row = 0; row < this.rows; row++) {
    //         for (let col = 0; col < this.cols; col++) {
    //             const x = col * squareSize;
    //             const y = row * squareSize;
    //             let color = this.color();
    //             for (let i = 0; i < n; i++) {
    //                 particles.push(
    //                     new Particle(
    //                         x + (squareSize / 2) + Math.random() * squareSize / 4,
    //                         y + (squareSize / 2) + Math.random() * squareSize / 4,
    //                         Math.random() * squareSize / 3,
    //                         color,
    //                         "circle"
    //                     )
    //                 );
    //             }
    //         }
    //     }
    //     return particles;
    // }

    private color(): string {
        return this.colors[Math.floor(Math.random() * (4 - 0)) + 0];
    }

    private makeSquares(): void {
        this.squares = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.squareSize;
                const y = row * this.squareSize;
                this.squares.push(new Square(x, y, this.squareSize, 'grey', 'initial'));
            }
        }
    }

    public indexToCoord(i: number): number[] {
        let xy = [];
        xy[0] = i % 8;
        xy[1] = Math.floor(i / 8);
        return xy;
    }

    public coordToIndex(x: number, y: number): number {
        return y * 8 + x;
    }

    // GAME GRAPH LOGIC

    public getVertices(): Vertex[] {
        return this.vertices;
    }

    public getSource(): number {
        return this.source;
    }

    public getSink(): number {
        return this.sink;
    }

    public getGameover(): boolean {
        return this.gameover;
    }

    public getLeastCost(): number {
        return this.leastCost;
    }

    public getLeastCostPath(): number[] {
        return this.leastCostPath;
    }

    public isVisited(index: number): boolean {
        if (this.visited.includes(index)) {
            return true;
        } else {
            return false;
        }
    }

    public getVisitedCost(): number {
        return this.visitedCost;
    }

    public getOpSource(): number {
        return this.opSource;
    }

    public getOpLeastCost(): number {
        return this.opLeastCost;
    }

    public getOpLeastCostPath(): number[] {
        return this.opLeastCostPath;
    }

    public isOpVisited(index: number): boolean {
        if (this.opVisited.includes(index)) {
            return true;
        } else {
            return false;
        }
    }

    public getOpVisitedCost(): number {
        return this.opVisitedCost;
    }

    public play(vertexId: number): void {
        if (this.gameover) {
            console.log("The game is Over. Sorry!");
        } else {
            let complete = false;
            let opComplete = false;
            if (vertexId == this.source) {
                console.log("Can't remove source from visited spaces.");
            } else if (this.visited.includes(vertexId)) {
                console.log("Space already visited. Removing it from the list.");
                this.visited.length = this.visited.indexOf(vertexId, 0);
            } else {
                if (this.adjacencyMatrix[this.visited[this.visited.length - 1]][vertexId] != Infinity) {
                    console.log("Visiting space.");
                    this.visited.push(vertexId);
                    if (vertexId == this.sink) {
                        complete = true;
                    } else {
                        for (let opVertex of this.opLeastCostPath) {
                            if (this.opVisited.includes(opVertex) == false) {
                                this.opVisited.push(opVertex);
                                break;
                            }
                        }
                        if (this.opVisited.length == this.opLeastCostPath.length) {
                            opComplete = true;
                        }
                    }
                } else {
                    console.log("Not a legal move.");
                }
            }
            if (complete == true) {
                console.log("You win!");
                this.gameover = true;
            } else if (opComplete == true) {
                console.log("You lose!");
                this.gameover = true;
            } else {
                console.log("Not sure how we got here...")
            }
        }
    }

    private buildGraph(): void {
        this.gameover = false;
        this.vertices = [];
        // Initialize adjacency matrix
        this.adjacencyMatrix = [];
        for (let i = 0; i < 64; i++) {
            this.adjacencyMatrix[i] = [];
            for (let j = 0; j < 64; j++) {
                this.adjacencyMatrix[i][j] = Infinity;
            }
        }

        for (let i = 0; i < 64; i++) {
            const vertex = new Vertex(i);
            let type = Math.floor(Math.random() * (5 - 0 + 0) + 1);
            vertex.setType(type);
            vertex.setClass("unselected")
            this.addVertex(vertex);
        }

        // Connect each vertex to its neighbors
        for (let i = 0; i < 64; i++) {
            const vertex = this.getVertices()[i];

            let left = [0,1,2,3,4,5,6,7];
            let right = [63,62,61,60,59,58,57,56];
            let top = [0,8,16,24,32,40,48,56];
            let bottom = [7,15,23,31,39,47,55,63];

            // Connect to the left neighbor
            if (!left.includes(i)) {
                let neighbor = this.getVertices()[i - 8]; // - 1
                vertex.addNeighbor(neighbor);
                let weight = vertex.getType() + neighbor.getType();
                this.addEdge(vertex.getId(), neighbor.getId(), weight);
            }

            // Connect to the right neighbor
            if (!right.includes(i)) {
                let neighbor = this.getVertices()[i + 8]; // + 1
                vertex.addNeighbor(neighbor);
                let weight = vertex.getType() + neighbor.getType();
                this.addEdge(vertex.getId(), neighbor.getId(), weight);
            }

            // Connect to the top neighbor
            if (!top.includes(i)) {
                let neighbor = this.getVertices()[i - 1]; // - 8
                vertex.addNeighbor(neighbor);
                let weight = vertex.getType() + neighbor.getType();
                this.addEdge(vertex.getId(), neighbor.getId(), weight);
            }

            // Connect to the bottom neighbor
            if (!bottom.includes(i)) {
                let neighbor = this.getVertices()[i + 1]; // + 8
                vertex.addNeighbor(neighbor);
                let weight = vertex.getType() + neighbor.getType();
                this.addEdge(vertex.getId(), neighbor.getId(), weight);
            }

            // // Connect each vertex to its neighbors
            // for (let i = 0; i < 64; i++) {
            //     const vertex = this.getVertices()[i];

            //     // Connect to the left neighbor
            //     if (i % 8 !== 0) {
            //         let neighbor = this.getVertices()[i - 8]; // - 1
            //         vertex.addNeighbor(neighbor);
            //         let weight = vertex.getType() + neighbor.getType();
            //         this.addEdge(vertex.getId(), neighbor.getId(), weight);
            //     }

            //     // Connect to the right neighbor
            //     if (i % 8 !== 7) {
            //         let neighbor = this.getVertices()[i + 8]; // + 1
            //         vertex.addNeighbor(neighbor);
            //         let weight = vertex.getType() + neighbor.getType();
            //         this.addEdge(vertex.getId(), neighbor.getId(), weight);
            //     }

            //     // Connect to the top neighbor
            //     if (i >= 8) {
            //         let neighbor = this.getVertices()[i - 1]; // - 8
            //         vertex.addNeighbor(neighbor);
            //         let weight = vertex.getType() + neighbor.getType();
            //         this.addEdge(vertex.getId(), neighbor.getId(), weight);
            //     }

            //     // Connect to the bottom neighbor
            //     if (i < 56) {
            //         let neighbor = this.getVertices()[i + 1]; // + 8
            //         vertex.addNeighbor(neighbor);
            //         let weight = vertex.getType() + neighbor.getType();
            //         this.addEdge(vertex.getId(), neighbor.getId(), weight);
            //     }
            }
            while (this.initializePlayers() == false) {
                console.log("Initiliazing players...")
                this.initializePlayers();
            };
            this.visitedCost = this.calculateLeastCost(this.visited);
            this.opVisitedCost = this.calculateLeastCost(this.opVisited);
        }

    private initializePlayers(): boolean {
        // initialize state 1
        let source1 = this.randomIntFromInterval(0, 63);
        let sink1 = this.randomIntFromInterval(0, 63);
        while (Math.abs(source1 - sink1) <= 48) {
            source1 = this.randomIntFromInterval(0, 63);
            sink1 = this.randomIntFromInterval(0, 63);
        }
        let lcp1 = this.calculateLeastCostPath(source1, sink1);
        let lc1 = this.calculateLeastCost(lcp1);
        // initialize state 2
        let source2 = this.randomIntFromInterval(0, 63);
        while (Math.abs(source2 - sink1) <= 48 && source2 != source1) {
            source2 = this.randomIntFromInterval(0, 63);
        }
        let lcp2 = this.calculateLeastCostPath(source2, sink1);
        let lc2 = this.calculateLeastCost(lcp2);
        // compare state 1 and state 2
        if (lc1 == lc2) {
            return false;
        } else if (lc1 < lc2) {
            this.source = source1;
            this.sink = sink1;
            this.leastCost = lc1;
            this.leastCostPath = lcp1;
            this.visited = [];
            this.visited.push(source1);
            this.opSource = source2;
            this.opLeastCost = lc2;
            this.opLeastCostPath = lcp2;
            this.opVisited = [];
            this.opVisited.push(source2);
            return true;
        } else {
            this.source = source2;
            this.sink = sink1;
            this.leastCost = lc2;
            this.leastCostPath = lcp2;
            this.visited = [];
            this.visited.push(source2);
            this.opSource = source1;
            this.opLeastCost = lc1;
            this.opLeastCostPath = lcp1;
            this.opVisited = [];
            this.opVisited.push(source1);
            return true;
        }
    }

    private calculateLeastCostPath(source: number, destination: number): number[] {
        const distances: number[] = new Array(64).fill(Number.MAX_VALUE);
        const visited: boolean[] = new Array(64).fill(false);
        const path: number[] = new Array(64).fill(-1);

        distances[source] = 0;

        for (let i = 0; i < 64 - 1; i++) {
            const u = this.getMinDistance(distances, visited);
            visited[u] = true;

            for (let v = 0; v < 64; v++) {
                if (!visited[v] && this.adjacencyMatrix[u][v] !== 0 && distances[u] !== Number.MAX_VALUE &&
                    distances[u] + this.adjacencyMatrix[u][v] < distances[v]) {
                    distances[v] = distances[u] + this.adjacencyMatrix[u][v];
                    path[v] = u;
                }
            }
        }
        return this.getPath(destination, path);
    }

    private calculateLeastCost(path: number[]): number {
        let sum = 0;
        path.forEach(index => {
            sum += this.vertices.at(index)!.getType();
        });
        return sum;
    }

    private addEdge(source: number, destination: number, weight: number): void {
        this.adjacencyMatrix[source][destination] = weight;
    }

    private addVertex(vertex: Vertex): void {
        this.vertices.push(vertex);
    }

    private getMinDistance(distances: number[], visited: boolean[]): number {
        let minDistance = Number.MAX_VALUE;
        let minIndex = -1;

        for (let v = 0; v < 64; v++) {
            if (!visited[v] && distances[v] <= minDistance) {
                minDistance = distances[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    private getPath(destination: number, path: number[]): number[] {
        const shortestPath: number[] = [];
        let currentVertex = destination;
        while (currentVertex !== -1) {
            shortestPath.unshift(currentVertex);
            currentVertex = path[currentVertex];
        }
        return shortestPath;
    }

    private randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}