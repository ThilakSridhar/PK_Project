import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankledgerComponent } from './bankledger.component';

describe('BankledgerComponent', () => {
  let component: BankledgerComponent;
  let fixture: ComponentFixture<BankledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankledgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
