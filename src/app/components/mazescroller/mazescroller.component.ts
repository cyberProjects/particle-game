import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Game } from 'src/app/shared/Game';

@Component({
  selector: 'app-mazescroller',
  templateUrl: './mazescroller.component.html',
  styleUrls: ['./mazescroller.component.scss'],
  providers: [{ provide: Window, useValue: window }]
})
export class MazescrollerComponent implements OnInit, AfterViewInit {
  private ctx: CanvasRenderingContext2D;
  private game: Game;
  @ViewChild('canvas')
  canvasEl: ElementRef;

  constructor(private window: Window) { }

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    this.game.setWindow(this.window.innerWidth, this.window.innerHeight);
  }

  public ngOnInit(): void {
    console.log("Doing nothing in ngOnInit()")
  }

  public ngAfterViewInit(): void {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
    this.game = new Game(this.ctx);
    this.game.setWindow(this.window.innerWidth, this.window.innerHeight);
    this.game.start();
  }

  public handleClick(event: MouseEvent): void {
    this.game.handleClick(event);
  }
}
