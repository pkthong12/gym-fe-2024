import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsEquipmentEditComponent } from './goods-equipment-edit.component';

describe('GoodsEquipmentEditComponent', () => {
  let component: GoodsEquipmentEditComponent;
  let fixture: ComponentFixture<GoodsEquipmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsEquipmentEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsEquipmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
