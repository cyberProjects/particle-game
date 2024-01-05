import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ParticleGame } from 'src/app/shared/ParticleGame';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss'],
  providers: [{ provide: Window, useValue: window }]
})
export class ParticleComponent implements AfterViewInit {
  private context: CanvasRenderingContext2D;
  private canvas: any;
  private canvasSize: number;
  private squareSize: number;
  private game: ParticleGame;

  constructor(private window: Window) {

  }

  @ViewChild('myCanvas')
  private myCanvas: ElementRef = {} as ElementRef;

  // @HostListener('window:resize', ['$event'])
  // public onWindowResize() {
  //   let width = window.innerWidth;
  //   let height = window.innerHeight;
  //   if (width > height) {
  //     width = height;
  //   } else if (height > width) {
  //     height = width;
  //   }
  //   for (let i = width; i > 256; i--) {
  //     if (i % 8 != 0) {
  //       continue;
  //     } else {
  //       width = i;
  //       height = i;
  //     }
  //   }
  //   this.canvasSize = width;
  //   this.squareSize = this.canvasSize / 8;
  // }

  public ngOnInit(): void {
    let width = this.window.innerWidth;
    let height = this.window.innerHeight;
    if (width > height) {
      width = height;
    } else if (height > width) {
      height = width;
    }
    for (let i = width; i > 256; i--) {
      if (i % 8 != 0) {
        continue;
      } else {
        width = i;
        height = i;
        break;
      }
    }
    this.canvasSize = width;
    this.squareSize = this.canvasSize / 8;
    console.log("Canvas size: " + this.canvasSize);
  }

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

  public restart(): void {
    this.init();
  }
}