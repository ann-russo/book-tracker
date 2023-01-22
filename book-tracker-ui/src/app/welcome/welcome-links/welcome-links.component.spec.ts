import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLinksComponent } from './welcome-links.component';

describe('WelcomeLinksComponent', () => {
  let component: WelcomeLinksComponent;
  let fixture: ComponentFixture<WelcomeLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
