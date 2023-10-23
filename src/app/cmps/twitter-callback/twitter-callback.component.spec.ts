import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterCallbackComponent } from './twitter-callback.component';

describe('TwitterCallbackComponent', () => {
  let component: TwitterCallbackComponent;
  let fixture: ComponentFixture<TwitterCallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterCallbackComponent]
    });
    fixture = TestBed.createComponent(TwitterCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
