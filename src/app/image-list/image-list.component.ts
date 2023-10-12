import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService } from '../image.service';
import {faker} from '@faker-js/faker'

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})

export class ImageListComponent implements OnInit {
  images: any[] = [];
  currentPage = 0;
  pageSize = 10;
  loading = false;
  favorites: any[] = [];
  filteredImages: any[] = [];
  filterCriteria: { id?: number, author?: string, text?: string } = {};

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {

    this.loadMoreImages();
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.filteredImages = this.images.map(image => ({ ...image, isFavorite: this.isFavorite(image.id) }));
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filterCriteria.id || this.filterCriteria.author || this.filterCriteria.text) {
      this.filteredImages = this.images.filter((image) => {
        const idMatch = !this.filterCriteria.id || image.id === this.filterCriteria.id;
        const authorMatch = !this.filterCriteria.author ||
          image.author.toLowerCase().includes(this.filterCriteria.author.toLowerCase());
        const textMatch = !this.filterCriteria.text ||
          image.text.toLowerCase().includes(this.filterCriteria.text.toLowerCase());
        return idMatch && authorMatch && textMatch;
      });
    } else {
      this.filteredImages = this.images;
    }
  }

  clearFilter(): void {
    this.filterCriteria = {};
    this.applyFilter();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (!this.loading) {
      const windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body,
        html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.loadMoreImages();
      }
    }
  }

  loadMoreImages(): void {
    this.loading = true;
    for (
      let i = 0;
      i < 10 && this.currentPage * this.pageSize + i < 4000;
      i++
    ) {
      const id = Math.floor(Math.random() * 1084);
      this.imageService.getImageInfo(id).subscribe({
        next: (data) => {
          const randomText = this.generateRandomText();
          this.images.push({
            id: id,
            photo: this.imageService.getImageUrl(id, 500, 500),
            author: data.author,
            text: randomText,
          });
        },
        error: (error) => {
          console.error('Failed to load image info:', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }

    this.currentPage++;
  }

  toggleFavorite(id: number, author: string, text: string): void {
    if (this.isFavorite(id)) {
      this.imageService.removeFromFavorites(id);
      this.favorites = this.favorites.filter(item => item.id !== id);
    } else {
      this.imageService.addToFavorites(id, author, text);
      this.favorites.push({ id, author, text });
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(id: number): boolean {
    return this.imageService.isFavorite(id);
  }

  generateRandomText(): string {

    const randomText = faker.lorem.sentence();

    return randomText;
  }
}

