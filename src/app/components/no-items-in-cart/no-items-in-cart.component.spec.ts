import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemsInCartComponent } from './no-items-in-cart.component';

describe('NoItemsInCartComponent', () => {
  let component: NoItemsInCartComponent;
  let fixture: ComponentFixture<NoItemsInCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoItemsInCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoItemsInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
