import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatbots } from './chatbots';

describe('Chatbots', () => {
  let component: Chatbots;
  let fixture: ComponentFixture<Chatbots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chatbots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chatbots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
