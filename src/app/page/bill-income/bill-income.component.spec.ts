import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillIncomeComponent } from './bill-income.component';

describe('BillIncomeComponent', () => {
  let component: BillIncomeComponent;
  let fixture: ComponentFixture<BillIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
