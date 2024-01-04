import { Component, OnInit } from '@angular/core';
import { Graph } from 'src/app/shared/Graph';
import { Vertex } from 'src/app/shared/Vertex';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  private graph: Graph = new Graph();
  private interval: any;
  public timeLeft: number = 60;
  private showAnswer = false;
  private selected: number[];

  ngOnInit(): void {
    console.log("Initializing game...");
  }

  public startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  public pauseTimer(): void {
    clearInterval(this.interval);
  }

  public getBoard() {
    return this.graph.getVertices();
  }

  public doShowAnswer(): void {
    if (this.showAnswer == true) {
      this.showAnswer = false;
    } else {
      this.showAnswer = true;
    }
  }

  public isSource(index: number, vertex: Vertex): boolean {
    if (index == this.graph.getSource()) {
      return true;
    } else {
      return false;
    }
  }

  public isSink(index: number, vertex: Vertex): boolean {
    if (index == this.graph.getSink()) {
      return true;
    } else {
      return false;
    }
  }

  public isVisited(index: number, vertex: Vertex): boolean {
    if (this.graph.isVisited(index)) {
      return true;
    } else {
      return false;
    }
  }

  public leastCostPathCheck(index: number, vertex: Vertex): boolean {
    if (this.showAnswer) {
      return this.graph.getLeastCostPath().includes(index);
    } else {
      return false;
    }
  }

  public isOpSource(index: number, vertex: Vertex): boolean {
    if (index == this.graph.getOpSource()) {
      return true;
    } else {
      return false;
    }
  }

  public opLeastCostPathCheck(index: number, vertex: Vertex): boolean {
    if (this.showAnswer) {
      return this.graph.getOpLeastCostPath().includes(index);
    } else {
      return false;
    }
  }

  public isOpVisited(index: number, vertex: Vertex): boolean {
    if (this.graph.isOpVisited(index)) {
      return true;
    } else {
      return false;
    }
  }

  public click(index: number, vertex: Vertex): void {
    console.log(index);
    this.play(index, vertex);
  }

  public play(index: number, vertex: Vertex): void {
    this.graph.select(index);
  }

  public getLeastCostPath(): number {
    return this.graph.getLeastCost();  
  }

  public getOpLeastCostPath(): number {
    return this.graph.getOpLeastCost();  
  }
}
