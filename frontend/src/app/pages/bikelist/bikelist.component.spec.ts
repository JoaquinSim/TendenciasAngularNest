import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikelistComponent } from './bikelist.component';

describe('BikelistComponent', () => {
  let component: BikelistComponent;
  let fixture: ComponentFixture<BikelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
