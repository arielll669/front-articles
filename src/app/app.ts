import { Component } from '@angular/core';
import { ArticleTable } from './components/article-table/article-table';

@Component({
  selector: 'app-root',
  imports: [ArticleTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'plos-articles';
}