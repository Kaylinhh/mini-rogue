import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampComponent } from './camp.component';

describe('CampComponent', () => {
  let component: CampComponent;
  let fixture: ComponentFixture<CampComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampComponent]
    });
    fixture = TestBed.createComponent(CampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
