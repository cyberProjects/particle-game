export class Vertex {
    private readonly id: number;
    private neighbors: Vertex[];
    private type: number;
    private class: string;
 
    constructor(id: number) {
        this.id = id;
        this.neighbors = [];
    }
 
    public getId(): number {
        return this.id;
    }
 
    public addNeighbor(neighbor: Vertex): void {
        this.neighbors.push(neighbor);
    }
 
    public getNeighbors(): Vertex[] {
        return this.neighbors;
    }

    public getType(): number {
        return this.type;
    }

    public setType(type: number): void {
        this.type = type;
    }

    public getClass(): string {
        return this.class;
    }

    public setClass(newClass: string): void {
        this.class = newClass;
    }
}