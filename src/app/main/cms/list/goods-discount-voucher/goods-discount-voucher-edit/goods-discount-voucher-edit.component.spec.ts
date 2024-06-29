import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDiscountVoucherEditComponent } from './goods-discount-voucher-edit.component';

describe('GoodsDiscountVoucherEditComponent', () => {
  let component: GoodsDiscountVoucherEditComponent;
  let fixture: ComponentFixture<GoodsDiscountVoucherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDiscountVoucherEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsDiscountVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
