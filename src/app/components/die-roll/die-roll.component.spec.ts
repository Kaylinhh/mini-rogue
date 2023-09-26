import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieRollComponent } from './die-roll.component';

describe('DieRollComponent', () => {
  let component: DieRollComponent;
  let fixture: ComponentFixture<DieRollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DieRollComponent]
    });
    fixture = TestBed.createComponent(DieRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
