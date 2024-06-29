import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDiscountVoucherComponent } from './goods-discount-voucher.component';

describe('GoodsDiscountVoucherComponent', () => {
  let component: GoodsDiscountVoucherComponent;
  let fixture: ComponentFixture<GoodsDiscountVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDiscountVoucherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsDiscountVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
