import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProductUnitComponent } from './post-product-unit.component';

describe('PostProductUnitComponent', () => {
  let component: PostProductUnitComponent;
  let fixture: ComponentFixture<PostProductUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostProductUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostProductUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
