import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteImagesComponent } from './favorite-images.component';
import { ImageService } from '../image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('FavoriteImagesComponent', () => {
  let component: FavoriteImagesComponent;
  let fixture: ComponentFixture<FavoriteImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteImagesComponent],
      providers: [ImageService],
      imports: [HttpClientTestingModule, HttpClientModule,FormsModule], 
    });

    fixture = TestBed.createComponent(FavoriteImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
