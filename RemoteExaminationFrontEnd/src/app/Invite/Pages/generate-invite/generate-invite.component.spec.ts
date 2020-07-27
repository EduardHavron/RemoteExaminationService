import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GenerateInviteComponent} from './generate-invite.component';

describe('GenerateInviteComponent', () => {
  let component: GenerateInviteComponent;
  let fixture: ComponentFixture<GenerateInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateInviteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
