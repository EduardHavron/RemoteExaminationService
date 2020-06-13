import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendInviteComponent } from './append-invite.component';

describe('AppendInviteComponent', () => {
  let component: AppendInviteComponent;
  let fixture: ComponentFixture<AppendInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
