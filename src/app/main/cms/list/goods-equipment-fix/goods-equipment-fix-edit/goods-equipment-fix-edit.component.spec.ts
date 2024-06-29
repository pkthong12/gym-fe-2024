import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsEquipmentFixEditComponent } from './goods-equipment-fix-edit.component';

describe('GoodsEquipmentFixEditComponent', () => {
  let component: GoodsEquipmentFixEditComponent;
  let fixture: ComponentFixture<GoodsEquipmentFixEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsEquipmentFixEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsEquipmentFixEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
