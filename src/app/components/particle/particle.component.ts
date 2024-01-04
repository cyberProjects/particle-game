import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Particle } from 'src/app/shared/Particle';
import { ParticleGame } from 'src/app/shared/ParticleGame';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss']
})
export class ParticleComponent implements AfterViewInit {
  private context: CanvasRenderingContext2D;
  private canvas: any;
  private canvasSize: number = 256;
  private squareSize: number = this.canvasSize / 8;
  private game: ParticleGame;

  @ViewChild('myCanvas')
  private myCanvas: ElementRef = {} as ElementRef;

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    if (this.context) {
      this.myCanvas.nativeElement.width = this.canvasSize;
      this.myCanvas.nativeElement.height = this.canvasSize;
      this.init();
    }
  }

  public handleClick(event: MouseEvent): void {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / this.squareSize);
    const row = Math.floor(y / this.squareSize);
    this.game.handleClick(row, col);
    // const index = this.game.coordToIndex(row, col);
    // const coord = this.game.indexToCoord(index);
    // console.log(`Clicked on square (${row}, ${col}) : ${index} : ${coord}`);
  }

  private init(): void {
    this.game = new ParticleGame(this.context, this.squareSize, this.canvasSize);
    this.loop();
  }

  private loop(): void {
    this.game.update();
    this.game.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }
}