import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDatabaseComponent } from './manage-database.component';

describe('ManageDatabaseComponent', () => {
  let component: ManageDatabaseComponent;
  let fixture: ComponentFixture<ManageDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
