import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazescrollerComponent } from './mazescroller.component';

describe('MazescrollerComponent', () => {
  let component: MazescrollerComponent;
  let fixture: ComponentFixture<MazescrollerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MazescrollerComponent]
    });
    fixture = TestBed.createComponent(MazescrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
