import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeliveryReportComponent } from './card-delivery-report.component';

describe('CardDeliveryReportComponent', () => {
  let component: CardDeliveryReportComponent;
  let fixture: ComponentFixture<CardDeliveryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDeliveryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeliveryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
