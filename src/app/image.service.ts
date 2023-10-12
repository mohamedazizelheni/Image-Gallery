import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private favorites: any[] = [];

  constructor(private http: HttpClient) {const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    this.favorites = JSON.parse(storedFavorites);
  }}

  getImageInfo(id: number): Observable<any> {
    return this.http.get(`https://picsum.photos/id/${id}/info`);
  }

  getImageUrl(id: number, width: number, height: number): string {
    return `https://picsum.photos/id/${id}/${width}/${height}.jpg`;
  }

addToFavorites(id: number, author: string, text: string) {
  if (!this.isFavorite(id)) {
    this.favorites.push({ id, author, text });
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  localStorage.setItem('favorites', JSON.stringify(this.favorites));
}

removeFromFavorites(id: number) {
  const index = this.favorites.findIndex((item) => item.id === id);
  if (index !== -1) {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
isFavorite(id: number): boolean {
  return this.favorites.some((item) => item.id === id);
}
getFavoriteIds(): number[] {
  return this.favorites;
}



}

