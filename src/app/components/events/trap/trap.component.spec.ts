import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapComponent } from './trap.component';

describe('TrapComponent', () => {
  let component: TrapComponent;
  let fixture: ComponentFixture<TrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrapComponent]
    });
    fixture = TestBed.createComponent(TrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
