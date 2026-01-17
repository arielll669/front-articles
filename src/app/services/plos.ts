import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class PlosService {
  private apiUrl = 'https://api.plos.org/search';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    const params = {
      q: 'title:university',
      wt: 'json',
      fl: 'id,title_display,journal,publication_date',
    };

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => response.response.docs)
    );
  }
}