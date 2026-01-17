import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlosService } from '../../services/plos';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-table',
  imports: [CommonModule],
  templateUrl: './article-table.html',
  styleUrl: './article-table.css',
})
export class ArticleTable implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;

  constructor(
    private plosService: PlosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.plosService.getArticles().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.articles = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar artículos:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}