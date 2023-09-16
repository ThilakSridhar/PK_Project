import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageexpenseComponent } from './manageexpense.component';

describe('ManageexpenseComponent', () => {
  let component: ManageexpenseComponent;
  let fixture: ComponentFixture<ManageexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageexpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
