export class GeneticAlgorithm {
    private populationSize: number;
    private target: string;
    private mutationRate: number;

    constructor(populationSize: number, target: string, mutationRate: number) {
        this.populationSize = populationSize;
        this.target = target;
        this.mutationRate = mutationRate;
    }

    private generateRandomString(length: number): string {
        let result = '';
        const characters = 'Hello, World!';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private calculateFitness(chromosome: string): number {
        let fitness = 0;
        for (let i = 0; i < chromosome.length; i++) {
            if (chromosome.charAt(i) === this.target.charAt(i)) {
                fitness++;
            }
        }
        return fitness;
    }

    private crossover(parentA: string, parentB: string): string {
        const midpoint = Math.floor(Math.random() * parentA.length);
        let child = '';
        for (let i = 0; i < parentA.length; i++) {
            if (i < midpoint) {
                child += parentA.charAt(i);
            } else {
                child += parentB.charAt(i);
            }
        }
        return child;
    }

    private mutate(chromosome: string): string {
        let mutatedChromosome = '';
        for (let i = 0; i < chromosome.length; i++) {
            if (Math.random() < this.mutationRate) {
                mutatedChromosome += this.generateRandomString(1);
            } else {
                mutatedChromosome += chromosome.charAt(i);
            }
        }
        return mutatedChromosome;
    }

    public runGeneticAlgorithm(): string {
        let population = [];
        let generation = 1;

        for (let i = 0; i < this.populationSize; i++) {
            population.push(this.generateRandomString(this.target.length));
        }

        while (true) {
            let fittestChromosome = '';
            let maxFitness = 0;

            for (let i = 0; i < population.length; i++) {
                const fitness = this.calculateFitness(population[i]);
                if (fitness > maxFitness) {
                    maxFitness = fitness;
                    fittestChromosome = population[i];
                }
            }

            if (fittestChromosome === this.target) {
                return `Generation: ${generation}, Fittest Chromosome: ${fittestChromosome}`;
            }

            let newPopulation = [];

            for (let i = 0; i < population.length; i++) {
                const parentA = population[Math.floor(Math.random() * population.length)];
                const parentB = population[Math.floor(Math.random() * population.length)];
                const child = this.crossover(parentA, parentB);
                const mutatedChild = this.mutate(child);
                newPopulation.push(mutatedChild);
            }

            population = newPopulation;
            generation++;
        }
    }
}