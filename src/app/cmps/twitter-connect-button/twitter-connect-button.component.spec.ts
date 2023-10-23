import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterConnectButtonComponent } from './twitter-connect-button.component';

describe('TwitterConnectButtonComponent', () => {
  let component: TwitterConnectButtonComponent;
  let fixture: ComponentFixture<TwitterConnectButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterConnectButtonComponent]
    });
    fixture = TestBed.createComponent(TwitterConnectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
