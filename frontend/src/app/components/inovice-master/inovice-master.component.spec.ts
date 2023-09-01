import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InoviceMasterComponent } from './inovice-master.component';

describe('InoviceMasterComponent', () => {
  let component: InoviceMasterComponent;
  let fixture: ComponentFixture<InoviceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InoviceMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InoviceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
