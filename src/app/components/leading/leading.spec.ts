import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leading } from './leading';

describe('Leading', () => {
  let component: Leading;
  let fixture: ComponentFixture<Leading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
