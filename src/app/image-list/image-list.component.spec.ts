import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageListComponent } from './image-list.component';
import { ImageService } from '../image.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ImageListComponent', () => {
  let component: ImageListComponent;
  let fixture: ComponentFixture<ImageListComponent>;
  let imageService: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageListComponent],
      providers: [ImageService],
      imports: [HttpClientModule,FormsModule],
    });
    fixture = TestBed.createComponent(ImageListComponent);
    component = fixture.componentInstance;
    imageService = TestBed.inject(ImageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially load more images', () => {
    spyOn(component, 'loadMoreImages');
    component.ngOnInit();
    expect(component.loadMoreImages).toHaveBeenCalled();
  });

  it('should clear the filter correctly', () => {
    component.clearFilter();
    expect(component.filteredImages).toEqual(component.images);
  });

  it('should toggle favorite and add to favorites', () => {
    const imageId = 1;
    const author = 'John Doe';
    const text = 'Sample text';

    spyOn(imageService, 'isFavorite').and.returnValue(false);
    spyOn(imageService, 'addToFavorites');

    component.toggleFavorite(imageId, author, text);

    expect(imageService.addToFavorites).toHaveBeenCalledWith(imageId, author, text);
  });


});
