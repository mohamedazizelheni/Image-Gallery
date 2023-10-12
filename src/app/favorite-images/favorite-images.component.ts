import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-favorite-images',
  templateUrl: './favorite-images.component.html',
  styleUrls: ['./favorite-images.component.css'],
})
export class FavoriteImagesComponent implements OnInit {
  favoriteImageIds: any[] = [];
  favoriteImages: any[] = [];
  filteredImages: any[] = [];
  filterCriteria: { id?: number, author?: string, text?: string } = {};

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoriteImageIds = JSON.parse(storedFavorites);
    }
    this.loadFavoriteImages();
    this.applyFilter();
  }
  loadFavoriteImages(): void {
    this.favoriteImages = this.favoriteImageIds.map((favorite) => ({
      id: favorite.id,
      author: favorite.author,
      text: favorite.text,
      photo: this.imageService.getImageUrl(favorite.id, 500, 500),
    }));
  }
  removeFromFavorites(id: number): void {
    this.imageService.removeFromFavorites(id);
    this.favoriteImages = this.favoriteImages.filter((favImage) => favImage.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteImages));
    this.ngOnInit()
    this.loadFavoriteImages();
  }
  applyFilter(): void {
    this.filteredImages = this.favoriteImages.filter((image) => {
      const idMatch = !this.filterCriteria.id || image.id === this.filterCriteria.id;
      const authorMatch = !this.filterCriteria.author ||
        image.author.toLowerCase().includes(this.filterCriteria.author.toLowerCase());
      const textMatch = !this.filterCriteria.text ||
        image.text.toLowerCase().includes(this.filterCriteria.text.toLowerCase());
      return idMatch && authorMatch && textMatch;
    });
  }
  clearFilter(): void {
    this.filterCriteria = {};
    this.applyFilter();
  }

}
