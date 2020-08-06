import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBackupComponent } from './get-backup.component';

describe('GetBackupComponent', () => {
  let component: GetBackupComponent;
  let fixture: ComponentFixture<GetBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
