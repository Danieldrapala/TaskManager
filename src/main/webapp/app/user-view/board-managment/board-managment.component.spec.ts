import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardManagmentComponent } from './board-managment.component';

describe('BoardManagmentComponent', () => {
  let component: BoardManagmentComponent;
  let fixture: ComponentFixture<BoardManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
