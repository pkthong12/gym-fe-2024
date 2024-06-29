import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOtherListEditComponent } from './sys-other-list-edit.component';

describe('SysOtherListEditComponent', () => {
  let component: SysOtherListEditComponent;
  let fixture: ComponentFixture<SysOtherListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysOtherListEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysOtherListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
