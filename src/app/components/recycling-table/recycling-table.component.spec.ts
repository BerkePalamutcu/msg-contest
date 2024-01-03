import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingTableComponent } from './recycling-table.component';

describe('RecyclingTableComponent', () => {
  let component: RecyclingTableComponent;
  let fixture: ComponentFixture<RecyclingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecyclingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecyclingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
