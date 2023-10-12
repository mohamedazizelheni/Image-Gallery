import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService],
    });

    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve image information via GET', () => {
    const mockImageInfo = { id: 1, author: 'John Doe', text: 'A beautiful image' };
    const id = 1;

    service.getImageInfo(id).subscribe((imageInfo) => {
      expect(imageInfo).toEqual(mockImageInfo);
    });

    const req = httpTestingController.expectOne(`https://picsum.photos/id/${id}/info`);
    expect(req.request.method).toBe('GET');

    req.flush(mockImageInfo);
  });


  it('should remove an image from favorites', () => {
    const id = 1;
    const author = 'John Doe';
    const text = 'A beautiful image';

    service.addToFavorites(id, author, text);
    expect(service.isFavorite(id)).toBe(true);

    service.removeFromFavorites(id);
    const favoriteImages = service.getFavoriteIds();

    expect(favoriteImages).not.toContain(id);
  });
});
