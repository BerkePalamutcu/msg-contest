import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecyclingDialogComponent } from './add-recycling-dialog.component';

describe('AddRecyclingDialogComponent', () => {
  let component: AddRecyclingDialogComponent;
  let fixture: ComponentFixture<AddRecyclingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecyclingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRecyclingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
