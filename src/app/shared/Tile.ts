export class Tile {
    private number: number;
    private class: string;

    public getNumber(): number {
        return this.number;
    }

    public setNumber(newNumber: number): void {
        this.number = newNumber;
    }

    public getClass(): string {
        return this.class;
    }

    public setClass(newClass: string): void {
        this.class = newClass;
    }
}