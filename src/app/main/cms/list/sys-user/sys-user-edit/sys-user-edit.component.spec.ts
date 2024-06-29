import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysUserEditComponent } from './sys-user-edit.component';

describe('SysUserEditComponent', () => {
  let component: SysUserEditComponent;
  let fixture: ComponentFixture<SysUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysUserEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
